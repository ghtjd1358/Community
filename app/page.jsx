import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";
import ForumList from '@/components/common/forum_list/ForumList';

export default function Home() {
  

  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}>개발 일지</span>
        <div className={styles.container__onBoarding__steps}>
          <ForumList/>
        </div>
      </div>
    </div>
  );
}
