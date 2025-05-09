import styles from '@/styles/About.module.scss'

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
            <div className={styles.sectionIcon}>💧</div>
            <h2>Our Mission</h2>
            <p>We are passionate about providing the best quality ice water to our customers. Our mission is to deliver refreshing and pure ice water that meets the highest standards of quality and safety.</p>
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
            <div className={styles.sectionIcon}>⚡</div>
            <h2>Our Process</h2>
            <p>Every drop of Ice Water goes through a rigorous purification process while maintaining its natural mineral balance. We source our water from protected mountain springs and use sustainable practices throughout our production.</p>
            <ul className={styles.processList}>
              <li><span className={styles.processIcon}>🌊</span> Natural Spring Sourcing</li>
              <li><span className={styles.processIcon}>🔍</span> Advanced Filtration</li>
              <li><span className={styles.processIcon}>⚖️</span> Mineral Balance Control</li>
              <li><span className={styles.processIcon}>♻️</span> Sustainable Packaging</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberIcon}>👨‍💼</div>
              <h3>John Smith</h3>
              <p>Founder & CEO</p>
              <div className={styles.memberBio}>
                <p>With over 20 years of experience in the water industry, John leads our company with vision and dedication to quality.</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberIcon}>👩‍🔬</div>
              <h3>Sarah Johnson</h3>
              <p>Quality Control Director</p>
              <div className={styles.memberBio}>
                <p>Sarah ensures that every bottle of Ice Water meets our rigorous quality standards through her expertise in water chemistry.</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberIcon}>👨‍🏭</div>
              <h3>Michael Brown</h3>
              <p>Production Manager</p>
              <div className={styles.memberBio}>
                <p>Michael oversees our sustainable production processes, ensuring efficiency while maintaining our environmental commitments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💎</div>
              <h3>Quality</h3>
              <p>We never compromise on the quality of our water, ensuring purity in every drop.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌍</div>
              <h3>Sustainability</h3>
              <p>We're committed to protecting our planet through eco-friendly practices.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Integrity</h3>
              <p>We maintain transparency and honesty in all our business practices.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
} 