import ForumContainerList from "@/components/common/forum_list/ForumContainerList";
import styles from "./page.module.scss";


export default function Home() {
  

  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <div className={styles.container__onBoarding__steps}>
          <ForumContainerList/>
        </div>
      </div>
    </div>
  );
}
