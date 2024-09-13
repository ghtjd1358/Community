import styles from "./page.module.scss";
import ForumList from '@/components/common/forum_list/ForumList';

export default function Home() {
  

  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <div className={styles.container__onBoarding__steps}>
          <ForumList/>
        </div>
      </div>
    </div>
  );
}
