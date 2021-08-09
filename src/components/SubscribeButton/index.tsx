// dependencies
import { signIn, useSession } from 'next-auth/client'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
// styles
import styles from './styles.module.scss'
// types
type SubscribeProps = {
  priceId: string
}

export function SubscribeButton ( { priceId }: SubscribeProps ) {
  const [session] = useSession()

  async function handleSubscribe () {
    if ( !session ) {
      signIn( 'gitHub' )
      return
    }

    try {
      const response = await api.post( '/subscribe' )
      const { sessionId } = response.data

      const stripe = await getStripeJs()

      stripe.redirectToCheckout( { sessionId } )

    } catch ( error ) {
      alert( error.message )
    }
  }

  return (
    <button type='button' className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}