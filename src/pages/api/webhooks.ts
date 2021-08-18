import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
// services
import { stripe } from '../../services/stripe'
import { saveSubscription } from './_lib/manage-subscription'

async function buffer ( readable: Readable ) {
  const chunks = []

  for await ( const chunk of readable ) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from( chunk ) : chunk
    )
  }

  return Buffer.concat( chunks )
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set( [
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
] )

// eslint-disable-next-line import/no-anonymous-default-export
export default async ( request: NextApiRequest, response: NextApiResponse ) => {
  if ( request.method === 'POST' ) {
    const buf = await buffer( request )
    const secret = request.headers['stripe-signature']

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent( buf, secret, process.env.STRIPE_API_WEBHOOK_SECRET )
    } catch ( error ) {
      return response.status( 400 ).send( `Webhook error: ${error.message}` )
    }

    const { type } = event

    if ( relevantEvents.has( type ) ) {
      try {
        switch ( type ) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription

            await saveSubscription( subscription.id, subscription.customer.toString(), false )


            break
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscription( checkoutSession.subscription.toString(), checkoutSession.customer.toString(), true )
            break
          default:
            throw new Error( `Unsupported event type: ${type}` )
        }
      } catch ( error ) {
        return response.status( 400 ).send( `Webhook handler failed` )
      }
    }

    return response.status( 200 ).json( { status: 'ok' } )

  } else {
    response.setHeader( 'allow', 'POST' )
    response.status( 405 ).end( 'Method not allowed' )
  }
}