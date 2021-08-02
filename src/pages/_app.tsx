// dependencies
import { AppProps } from "next/app"
// styles
import '../../styles/global.scss'
// shared components
import { Header } from '../components/Header'

function MyApp ( { Component, pageProps }: AppProps ) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

//TODO: Pass all images to next/images