import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import styles from '../styles/Auth.module.scss'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/') // Redirect to home page after successful login
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/auth') // Redirect to auth page after logout
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h1>Authentication</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  )
} 