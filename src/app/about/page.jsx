"use client"

import styles from '@/styles/About.module.scss'
import { 
  FaTint, FaBolt, FaWater, FaSearch, FaBalanceScale, FaRecycle, 
  FaUserTie, FaFlask, FaHardHat, FaGem, FaGlobe, FaHandshake 
} from 'react-icons/fa'

export default function About() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Ice Water</h1>
          <p className={styles.heroSubtitle}>Our Story of Purity and Excellence</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <div className={styles.contentText}>
            <div className={styles.sectionIcon}>
              <FaTint />
            </div>
            <h2>Our Mission</h2>
            <p>We&apos;re dedicated to providing the purest water for your health and well-being. Our mission is to deliver premium quality water that promotes health and sustainability while maintaining the highest standards of purity and service.</p>
            <div className={styles.missionStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Natural</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Sources</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Quality Control</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.contentText}>
            <div className={styles.sectionIcon}>
              <FaBolt />
            </div>
            <h2>Our Process</h2>
            <p>Every drop of Ice Water goes through a rigorous purification process while maintaining its natural mineral balance. We source our water from protected mountain springs and use sustainable practices throughout our production.</p>
            <ul className={styles.processList}>
              <li><span className={styles.processIcon}><FaWater /></span> Natural Spring Sourcing</li>
              <li><span className={styles.processIcon}><FaSearch /></span> Advanced Filtration</li>
              <li><span className={styles.processIcon}><FaBalanceScale /></span> Mineral Balance Control</li>
              <li><span className={styles.processIcon}><FaRecycle /></span> Sustainable Packaging</li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaGem />
              </div>
              <h3>Quality</h3>
              <p>We never compromise on the quality of our water, ensuring purity in every drop.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaGlobe />
              </div>
              <h3>Sustainability</h3>
              <p>We&apos;re committed to protecting our planet through eco-friendly practices.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaHandshake />
              </div>
              <h3>Integrity</h3>
              <p>We maintain transparency and honesty in all our business practices.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
} 