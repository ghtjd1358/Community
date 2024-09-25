import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import styles from './SideNavigation.module.scss'
import { debounce } from 'lodash'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SearchButton({ setSearchQuery, setSearchType }) {
    const [localSearchQuery, setLocalSearchQuery] = useState('');

    const debounceSearch = debounce((query) => {
        setSearchQuery(query);
    }, 700);

    useEffect(() => {
        debounceSearch(localSearchQuery);
        return () => {
            debounceSearch.cancel();
        };
    }, [localSearchQuery]);

    return (
        <form className={styles.container__searchBox} onSubmit={(e) => e.preventDefault()}>
            <Select onValueChange={(value) => setSearchType(value)} defaultValue="title">
                <SelectTrigger className="w-[20%]">
                    <SelectValue placeholder="Search Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                </SelectContent>
            </Select>

            <div className={styles.container__searchBox__Input}>
                <Input
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    type="text"
                    name="query"
                    placeholder="검색어를 입력해주세요."
                    className="focus-visible:ring-0 w-full"
                />
                <Search className='w-[20%]' />
            </div>
        </form>
    )
}
