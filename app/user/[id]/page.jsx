"use client"

import Link from 'next/link';
import styles from './page.module.scss';
import { useSession } from 'next-auth/react';


export default function MyProfile() {
  const {data : session} = useSession()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__onBoarding}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}>
              <img src="profileImage.jpg" alt="프로필 이미지" />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileInfo__account}>
                <h2>이메일</h2>
                <h2>이름</h2>
              </div>
              <div className={styles.profileInfo__follow}>
                <p>게시물 수</p>
                <p>팔로워 수</p>
                <p>팔로잉 수</p>
            </div>  
            </div>
          </div>
          <div className={styles.container__editButton}>
          <Link href={`/user/${session?.user?.name}/profile`} className={styles.editProfile}>프로필 편집</Link>
          <button className={styles.editProfile}>로그아웃</button>
          </div>
          <div className={styles.container__posts}>
            <div className={styles.post}>
              <img src="postImage1.jpg" alt="게시물 이미지 1" />
            </div>
            <div className={styles.post}>
              <img src="postImage2.jpg" alt="게시물 이미지 2" />
            </div>
            <div className={styles.post}>
              <img src="postImage3.jpg" alt="게시물 이미지 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
