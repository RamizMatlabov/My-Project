'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../styles/Footer.module.scss'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.png"
                alt="Ice Water Logo"
                width={50}
                height={50}
                className={styles.logoImage}
              />
              <span className={styles.logoText}>Ice Water</span>
            </Link>
            <p className={styles.text}>
              We provide the purest water sourced from natural springs, ensuring quality and sustainability.
            </p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.list}>
              <li>
                <Link href="/products" className={styles.link}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Contact</h3>
            <ul className={styles.list}>
              <li>Email: info@icewater.com</li>
              <li>Phone: (33) 433-44-04</li>
              <li>Address: 123 Water Street, Spring City</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Ice Water. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 