"use client"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDelete, fetchRead } from '@/redux/features/forumSlice'
import Image from 'next/image'
import myImage from '../../../public/images/2.jpg'
import myImages from '../../../public/images/1.png'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import styles from "./list.module.scss"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Send, BookmarkIcon, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'

export default function ForumList() {
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const router = useRouter()
    const { lists, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchRead())
    }, [dispatch])

    const deleteHandler = async (id) => {
        const findPost = lists.find(item => item._id === id)
        const postAuthorEmail = findPost ? findPost.author : null
    
        if (!session) {
            Swal.fire({
                title: '로그인 필요',
                text: '로그인 후 삭제할 수 있습니다.',
                icon: 'warning',
                confirmButtonText: '로그인 페이지로 이동',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/')
                }
            })
            return
        }
    
        if (postAuthorEmail !== session?.user?.email) {
            Swal.fire({
                title: '권한 부족',
                text: '이 게시물을 삭제할 권한이 없습니다.',
                icon: 'warning',
                confirmButtonText: '확인'
            })
            return
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
                        })
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: '삭제 실패!',
                            text: `게시물 삭제에 실패했습니다. 나중에 다시 시도해 주세요. ${error.message}`,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '확인'
                        })
                    })
            }
        })
    }
    

    if (loading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>
    }

    const renderImages = () => (
        <>
            <CarouselItem className="relative w-full h-full">
                <Image
                    src={myImages}
                    alt="사진"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0"
                    priority
                />
            </CarouselItem>
            <CarouselItem className="relative w-full h-full">
                <Image
                    src={myImage}
                    alt="사진"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0"
                    priority
                />
            </CarouselItem>
            <CarouselItem className="relative w-full h-full">
                <Image
                    src={myImages}
                    alt="사진"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0"
                    priority
                />
            </CarouselItem>
        </>
    )

    return (
        <>
            {lists.length === 0 ? (
                <div>데이터가 없습니다...</div>
            ) : (
                lists.map((item) => (
                    <Card key={item._id} className="w-[510px] h-[700px]">
                        <CardHeader>
                            <CardTitle className="h-[60px] flex items-center justify-between p-2">
                                <div className={styles.cardtitle__avatar}>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <span className={styles.cardtitle__avatar__name}>{item.author}</span>
                                </div>
                                <Button variant="outline" className=" flex bg-gray-300 p-3-5 font-extrabold text-black hover:bg-slate-200">팔로우</Button>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="relative w-full h-[350px]">
                            <Carousel className="relative w-full h-full">
                                <CarouselContent className="h-[350px] w-full">
                                    {renderImages()}
                                </CarouselContent>
                                <CarouselNext className="absolute top-[50%] right-3 transform -translate-y-1/2" />
                                <CarouselPrevious className="absolute top-[50%] left-3 transform -translate-y-1/2" />
                            </Carousel>
                        </CardContent>

                        <CardFooter className="w-full h-[250px] flex flex-col">
                            <div className={styles.cardfooter__top}>
                                <div className={styles.cardfooter__top__iconbox}>
                                    <div className={styles.cardfooter__top__iconbox__icons}>
                                        <Heart className="w-6 h-6" />
                                        <MessageCircle className="w-6 h-6" />
                                        <Send className="w-6 h-6" />
                                    </div>
                                    <BookmarkIcon className="w-6 h-6" />
                                </div>
                                <p className={styles.cardfooter__top__like}>좋아요 9,511개</p>
                                <div className={styles.cardfooter__top__chat}>
                                    <span className={styles.cardtitle__avatar__name}>hojjang18@naver.com</span>
                                    <Edit onClick={() => router.push(`/edit/${item._id}`)} className="cursor-pointer w-6 h-6" />
                                    <span className={styles.cardfooter__top__chat__content}>{item.content}</span>
                                </div>
                                <CardDescription className="cursor-pointer">...더보기</CardDescription>
                            </div>
                            <div className={styles.cardfooter__bottom}>
                                <span className={styles.cardfooter__bottom__data}>1일 전</span>
                                <span onClick={() => deleteHandler(item._id)} className={styles.cardfooter__bottom__detail}>삭제</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            )}
        </>
    )
}
