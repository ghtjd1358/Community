
import styles from './page.module.scss'
import EditForm from './EditForm'

export default function Edit(props) {
  const { id } = props.params

  return (
    <>
      <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}>글수정</span>
        <div className={styles.container__onBoarding__steps}>
           <EditForm id={id}/>
        </div>
      </div>
    </div>
    </>
  )
}

 