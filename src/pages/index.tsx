// dependencies
import Head from 'next/head'
// styles
import styles from '../../styles/home.module.scss'
// shared components
import { SubscribeButton } from '../components/SubscribeButton'

export default function Home () {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publication <br /> <span>for $9.90 month</span></p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}
