import LoginButton from '../LoginButton'
import Link from 'next/link'
import styles from './SideNavigation.module.scss'
import WriteButton from './WriteButton'


export default function SideNavigation() {
    return (
        <div className={styles.container}>
            <Link href={'/'} className={styles.container__logo}>개발 일지</Link>
            <div className={styles.container__authBox}>
                <LoginButton/>
            </div>     
            <div className={styles.container__buttonBox}>
                <WriteButton/>
            </div>
            <div className={styles.container__todos}>
                <span className={styles.container__todos__lable}></span>
            </div>
        </div>
    )
}
