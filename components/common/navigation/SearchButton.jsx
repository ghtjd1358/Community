"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import styles from './SideNavigation.module.scss'
import { debounce } from 'lodash'
import { useFetchSearchQuery } from '@/redux/features/searchSlice'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function SearchButton() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchType, setSearchType] = useState('title');

    const debounceSearch = debounce((query) => {
        setDebouncedQuery(query);
    }, 1000);

    useEffect(() => {
        debounceSearch(searchQuery);
        return () => {
            debounceSearch.cancel();
        };
    }, [searchQuery, debounceSearch]);

    const { data: results, error, isLoading } = useFetchSearchQuery(
        { query: debouncedQuery, type: searchType }, 
        {
            skip: debouncedQuery === ''
        }
    );

    useEffect(() => {
        if (isLoading) {
            console.log("Loading...");
        }
        if (error) {
            console.error("Error occurred:", error);
        }
        if (results) {
            console.log(results);
        }
    }, [results, error, isLoading]);

    return (
        <form className={styles.container__searchBox} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.container__searchBox__Input}>
            
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="query"
                placeholder="검색어를 입력해주세요."
                className="focus-visible:ring-0 w-[100%]"
            />
            <Search className='w-[20%]'/>
            </div>
            
             <Select onValueChange={setSearchType} defaultValue={searchType}>
                <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Search Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                </SelectContent>
            </Select>
        </form>
    )
}
