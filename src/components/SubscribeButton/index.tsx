// styles
import styles from './styles.module.scss'
// types
type SubscribeProps = {
  priceId: string
}

export function SubscribeButton ( { priceId }: SubscribeProps ) {
  return (
    <button type='button' className={styles.subscribeButton}>
      Subscribe now
    </button>
  )
}