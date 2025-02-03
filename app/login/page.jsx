import styles from "./page.module.scss"
import LoginForm from "./LoginForm"

function Login() {
  return (
    <div className={styles.container}>
    <div className={styles.container__onBoarding}>
      <div className={styles.container__onBoarding__steps}>
        <LoginForm/>
      </div>
    </div>
  </div>
  )
}

export default Login