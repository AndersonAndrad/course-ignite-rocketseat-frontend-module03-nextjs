// auth
import { signIn, signOut, useSession } from 'next-auth/client'
// icons
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
// style
import styles from './styles.module.scss'

export function SingInButton () {
  const [session] = useSession()

  return session ? (
    <button type='button' className={styles.singInButton} onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color='#737380' className={styles.logOutIcon} />
    </button>
  ) : (
    <button type='button' className={styles.singInButton} onClick={() => signIn( 'github' )}>
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  )
}