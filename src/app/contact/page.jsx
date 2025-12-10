"use client"

import styles from '@/styles/Contact.module.scss'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { 
  FaEnvelope, FaMobileAlt, FaPhone, FaMapMarkerAlt, 
  FaMapMarkedAlt, FaFacebook, FaInstagram, FaTwitter, FaClock 
} from 'react-icons/fa'

export default function Contact() {
  const from = useRef()
  function submit(e) {
    e.preventDefault()

    emailjs.sendForm('service_qorrope', 'template_otc69hd', from.current, '5d_FVNKGmUFzETuCP')
      .then((result) => {
        alert("message sent" + result.text)
      }, (error) => {
        alert("An error occurred, Please try again" + error.text)
      })

    e.target.reset()
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Contact Us</h1>
          <p className={styles.heroSubtitle}>We&apos;d love to hear from you</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.contactIcon}><FaEnvelope /></span>
              </div>
              <h3 className={styles.cardTitle}>Email</h3>
              <p className={styles.cardText}>info@icewater.com</p>
              <a href="mailto:info@icewater.com" className={styles.contactLink}>
                <span className={styles.linkIcon}><FaEnvelope /></span>
                Send us a message
              </a>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.contactIcon}><FaMobileAlt /></span>
              </div>
              <h3 className={styles.cardTitle}>Phone</h3>
              <p className={styles.cardText}>+1 (555) 123-4567</p>
              <a href="tel:+15551234567" className={styles.contactLink}>
                <span className={styles.linkIcon}><FaPhone /></span>
                Call us now
              </a>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.contactIcon}><FaMapMarkerAlt /></span>
              </div>
              <h3 className={styles.cardTitle}>Address</h3>
              <p className={styles.cardText}>123 Ice Street, Water City, WC 12345</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span className={styles.linkIcon}><FaMapMarkedAlt /></span>
                Get directions
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={from} onSubmit={submit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>

        {/* Social Media */}
        <div className={styles.socialSection}>
          <h2 className={styles.sectionTitle}>Follow Us</h2>
          <div className={styles.socialGrid}>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}><FaFacebook /></span>
              <span className={styles.socialLabel}>Facebook</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}><FaInstagram /></span>
              <span className={styles.socialLabel}>Instagram</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}><FaTwitter /></span>
              <span className={styles.socialLabel}>Twitter</span>
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className={styles.hoursSection}>
          <h2 className={styles.sectionTitle}>Business Hours</h2>
          <div className={styles.hoursGrid}>
            <div className={styles.hoursCard}>
              <span className={styles.hoursIcon}><FaClock /></span>
              <div className={styles.hoursContent}>
                <h3 className={styles.cardTitle}>Monday - Friday</h3>
                <p className={styles.cardText}>9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className={styles.hoursCard}>
              <span className={styles.hoursIcon}><FaClock /></span>
              <div className={styles.hoursContent}>
                <h3 className={styles.cardTitle}>Saturday</h3>
                <p className={styles.cardText}>10:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div className={styles.hoursCard}>
              <span className={styles.hoursIcon}><FaClock /></span>
              <div className={styles.hoursContent}>
                <h3 className={styles.cardTitle}>Sunday</h3>
                <p className={styles.cardText}>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 