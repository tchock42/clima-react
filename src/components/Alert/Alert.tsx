import { ReactNode } from "react"
import styles from './Alert.module.css'

type Children = {
    children: ReactNode
}


const Alert = ({children}: Children) => {
    return (
        <div className={styles.alert}>
            {children}
        </div>
    )
}

export default Alert
