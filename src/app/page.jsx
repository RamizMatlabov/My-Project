'use client'

import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Pure Water, Pure Life</h1>
          <p className={styles.subtitle}>
            Experience the refreshing taste of premium water delivered right to your doorstep
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/products" className={styles.primaryButton}>
              Explore Products
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Contact Us
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.waterDrop}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💧</div>
            <h3>Pure & Natural</h3>
            <p>Sourced from natural springs and purified to perfection</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚚</div>
            <h3>Fast Delivery</h3>
            <p>Regular deliveries to your home or office</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>♻️</div>
            <h3>Eco-Friendly</h3>
            <p>Sustainable packaging and recycling programs</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⭐</div>
            <h3>Premium Quality</h3>
            <p>Rigorous quality control and testing</p>
          </div>
        </div>
      </section>
    </div>
  )
}
