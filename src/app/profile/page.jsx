'use client'

import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import styles from './profile.module.scss'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <h1>My Profile</h1>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
          </div>
          <div className={styles.details}>
            <h2>{user?.displayName || 'User'}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  )
}
