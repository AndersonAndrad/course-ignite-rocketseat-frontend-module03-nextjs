import { query } from 'faunadb'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// database
import { fauna } from '../../../services/fauna'

export default NextAuth( {
  providers: [
    Providers.GitHub( {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    } )
  ],
  jwt: {
    signingKey: process.env.SIGNING_KEY
  },
  callbacks: {
    async signIn ( user, account, profile ) {
      const { email } = user

      try {
        await fauna.query( query.Create( query.Collection( `users` ), { data: { email } } ) )
        return true // sign in successful

      } catch {
        return false // sign in failed
      }
    }
  }
} )