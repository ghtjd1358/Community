import LoginButton from '../LoginButton'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import styles from './SideNavigation.module.scss'

export default function SideNavigation() {
    return (
        <div className={styles.container}>
            <Link href={'/'} className={styles.container__logo}>개발 일지</Link>
            <div className={styles.container__authBox}>
                <LoginButton/>
            </div>

            <form action="/search" method="GET" className={styles.container__searchBox}>
                <Input type="text" name="query" placeholder="검색어를 입력해주세요." className="focus-visible:ring-0" />
                <Button variant={"outline"} size="icon" type="submit">
                    <Search className='w-4 h-4' />
                </Button>
            </form>

            <div className={styles.container__buttonBox}>
                <Link href={'/write'} className='w-full'>
                    <Button variant={"outline"} className="w-full text-orange-500 border-orange-400 hover:bg-orange-100 hover:text-orange-600">
                        글작성
                    </Button>
                </Link>
            </div>

            <div className={styles.container__todos}>
                <span className={styles.container__todos__lable}></span>
            </div>
        </div>
    )
}
