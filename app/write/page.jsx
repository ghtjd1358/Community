
import styles from './page.module.scss'
import WriteForm from './WriteForm'

function Write() {
  
  return (
    <>
      <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}>글 작성</span>
        <div className={styles.container__onBoarding__steps}>
           <WriteForm/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Write