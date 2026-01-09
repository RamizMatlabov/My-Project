"use client"

import styles from '@/styles/Contact.module.scss'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaFacebook, FaInstagram, FaTwitter, 
  FaClock, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa'

export default function Contact() {
  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.sendForm(
        'service_qorrope', 
        'template_otc69hd', 
        formRef.current, 
        '5d_FVNKGmUFzETuCP'
      )
      setSubmitStatus('success')
      e.target.reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>
          Have a question or want to work together? We&apos;d love to hear from you.
          Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Contact Information Cards */}
          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <FaEnvelope />
                </div>
                <h3 className={styles.cardTitle}>Email</h3>
                <p className={styles.cardText}>ramizmatlabov923@gmail.com</p>
                <a 
                  href="mailto:ramizmatlabov923@gmail.com" 
                  className={styles.cardLink}
                >
                  Send Email <FaPaperPlane />
                </a>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <FaPhone />
                </div>
                <h3 className={styles.cardTitle}>Phone</h3>
                <p className={styles.cardText}>+998 (33) 433-44-04</p>
                <a 
                  href="tel:+998334334404" 
                  className={styles.cardLink}
                >
                  Call Now <FaPhone />
                </a>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <FaMapMarkerAlt />
                </div>
                <h3 className={styles.cardTitle}>Address</h3>
                <p className={styles.cardText}>123 Ice Street, Water City, WC 12345</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.cardLink}
                >
                  Get Directions <FaMapMarkerAlt />
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Follow Us</h3>
              <div className={styles.socialLinks}>
                <a 
                  href="#" 
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://www.instagram.com/ramiz_matlabov/" 
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form ref={formRef} onSubmit={submit} className={styles.form}>
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={styles.input}
                    placeholder=" "
                    required 
                  />
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                </div>

                <div className={styles.formGroup}>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={styles.input}
                    placeholder=" "
                    required 
                  />
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                </div>

                <div className={styles.formGroup}>
                  <textarea 
                    id="message" 
                    name="message" 
                    className={styles.textarea}
                    placeholder=" "
                    rows="6"
                    required
                  ></textarea>
                  <label htmlFor="message" className={styles.label}>Your Message</label>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <FaCheckCircle /> Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>

            {/* Business Hours */}
            <div className={styles.hoursSection}>
              <h3 className={styles.hoursTitle}>
                <FaClock /> Business Hours
              </h3>
              <div className={styles.hoursList}>
                <div className={styles.hoursItem}>
                  <span className={styles.hoursDay}>Monday - Friday</span>
                  <span className={styles.hoursTime}>9:00 AM - 6:00 PM</span>
                </div>
                <div className={styles.hoursItem}>
                  <span className={styles.hoursDay}>Saturday</span>
                  <span className={styles.hoursTime}>10:00 AM - 4:00 PM</span>
                </div>
                <div className={styles.hoursItem}>
                  <span className={styles.hoursDay}>Sunday</span>
                  <span className={styles.hoursTime}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

