import styles from "./page.module.scss"
import RegisterForm from "./RegisterForm"


function Register() {
  return (
    <div className={styles.container}>
    <div className={styles.container__onBoarding}>
      <div className={styles.container__onBoarding__steps}>
        <RegisterForm/>
      </div>
    </div>
  </div>
  )
}

export default Register