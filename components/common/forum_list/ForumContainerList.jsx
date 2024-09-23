"use client"

import ForumList from "./ForumList"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchDelete, fetchRead } from '@/redux/features/forumSlice'
import { useFetchSearchQuery } from "@/redux/features/searchSlice"
import SearchButton from "../navigation/SearchButton"

export default function ForumContainerList() {
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const router = useRouter()
    const { lists, loading, error } = useSelector((state) => state.posts)
    
    // 검색 상태
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('title');

    const { data: results } = useFetchSearchQuery(
        { query: searchQuery, type: searchType },
        { skip: !searchQuery }
    );

    // 검색
    useEffect(() => {
        if (!searchQuery) {
            dispatch(fetchRead());
        }
    }, [searchQuery, dispatch]);

    const deleteHandler = async (id) => {
        const findPost = lists.find(item => item._id === id);
        const postAuthorEmail = findPost ? findPost.author : null;
    
        if (!session) {
            Swal.fire({
                title: '로그인 필요',
                text: '로그인 후 삭제할 수 있습니다.',
                icon: 'warning',
                confirmButtonText: '로그인 페이지로 이동',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
                }
            });
            return;
        }
    
        if (postAuthorEmail !== session?.user?.email) {
            Swal.fire({
                title: '권한 부족',
                text: '이 게시물을 삭제할 권한이 없습니다.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            return;
        }
    
        Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "이 작업은 되돌릴 수 없습니다!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDelete(id))
                    .then(() => {
                        Swal.fire({
                            title: '삭제되었습니다!',
                            text: '게시물이 성공적으로 삭제되었습니다.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '확인'
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: '삭제 실패!',
                            text: `게시물 삭제에 실패했습니다. 나중에 다시 시도해 주세요. ${error.message}`,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '확인'
                        });
                    });
            }
        });
    }

    return (
        <>
            <SearchButton 
                setSearchQuery={setSearchQuery} 
                setSearchType={setSearchType} 
            />

            <ForumList
                lists={searchQuery ? (results?.length ? results : []) : lists} // 검색어가 없을 때 lists 보여주기
                error={error}
                loading={loading}
                deleteHandler={deleteHandler}
            />    
        </>
    );
}
