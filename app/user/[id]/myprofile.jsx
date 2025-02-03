import styles from "./page.module.scss"
import ProfileForm from "./ProfileForm"


function Profile() {
  return (
    <div className={styles.container}>
    <div className={styles.container__onBoarding}>
      <div className={styles.container__onBoarding__steps}>
        <ProfileForm/>
      </div>
    </div>
  </div>
  )
}

export default Profile