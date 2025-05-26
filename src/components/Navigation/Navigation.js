"use client"

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo}>
        <Link href="/">Ice Water</Link>
      </div>

      <button 
        className={`${styles.burger} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
        <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginButton} onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link href="/register" className={styles.registerButton} onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
} 