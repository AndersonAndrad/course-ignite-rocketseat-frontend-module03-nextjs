// auth
import { Provider as NextAuthProvider } from 'next-auth/client'
// dependencies
import { AppProps } from "next/app"
// styles
import '../../styles/global.scss'
// shared components
import { Header } from '../components/Header'

function MyApp ( { Component, pageProps }: AppProps ) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp

//TODO: Pass all images to next/images