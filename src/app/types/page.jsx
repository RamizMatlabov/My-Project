"use client"

import styles from '@/styles/Types.module.scss'
import Image from 'next/image'
import { useState } from 'react'

export default function Types() {
  const [activeTab, setActiveTab] = useState('still')

  const waterTypes = {
    still: {
      title: 'Still Water',
      description: 'Still water is water that has no carbonation. It comes from various sources and can be naturally filtered through rocks and soil.',
      types: [
        {
          id: 1,
          name: 'Spring Water',
          description: 'Naturally filtered through layers of rock and soil, spring water is collected at its source. It contains natural minerals and has a fresh, clean taste.',
          image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60',
          benefits: [
            'Natural mineral content',
            'Fresh taste',
            'No artificial treatment',
            'Environmentally friendly'
          ]
        },
        {
          id: 2,
          name: 'Mineral Water',
          description: 'Rich in essential minerals like calcium, magnesium, and potassium. Our mineral water is sourced from protected underground sources.',
          image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60',
          benefits: [
            'High mineral content',
            'Supports bone health',
            'Natural electrolytes',
            'Great for daily hydration'
          ]
        },
        {
          id: 3,
          name: 'Purified Water',
          description: 'Our purified water goes through a rigorous filtration process to remove impurities while maintaining essential minerals for taste and health benefits.',
          image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60',
          benefits: [
            'Ultra-clean',
            'Consistent quality',
            'Perfect for sensitive uses',
            'Removes contaminants'
          ]
        }
      ]
    },
    sparkling: {
      title: 'Sparkling Water',
      description: 'Sparkling water contains carbon dioxide gas, which creates bubbles and a fizzy sensation. It can be naturally carbonated or artificially carbonated.',
      types: [
        {
          name: 'Naturally Sparkling',
          image: '/images/natural-sparkling.jpg',
          description: 'Naturally carbonated from underground sources. Contains natural minerals and has a crisp, refreshing taste.',
          benefits: ['Natural carbonation', 'Mineral-rich', 'Refreshing taste', 'No additives']
        },
        {
          name: 'Carbonated Water',
          image: '/images/carbonated.jpg',
          description: 'Water that has been artificially carbonated. Often used as a base for flavored sparkling waters.',
          benefits: ['Consistent bubbles', 'Clean taste', 'Versatile base', 'Refreshing']
        },
        {
          name: 'Seltzer Water',
          image: '/images/seltzer.jpg',
          description: 'Plain carbonated water with no added minerals or flavors. Perfect for mixing or drinking plain.',
          benefits: ['Pure carbonation', 'No additives', 'Mixer-friendly', 'Clean taste']
        }
      ]
    },
    flavored: {
      title: 'Flavored Water',
      description: 'Water that has been enhanced with natural flavors, fruits, or herbs. Can be still or sparkling.',
      types: [
        {
          name: 'Fruit-Infused Water',
          image: '/images/fruit-infused.jpg',
          description: 'Water infused with fresh fruits, providing natural flavors and subtle sweetness.',
          benefits: ['Natural flavors', 'No added sugar', 'Vitamin-rich', 'Refreshing']
        },
        {
          name: 'Herb-Infused Water',
          image: '/images/herb-infused.jpg',
          description: 'Water infused with fresh herbs, offering unique flavors and potential health benefits.',
          benefits: ['Natural herbs', 'Unique flavors', 'Health benefits', 'Aromatic']
        },
        {
          name: 'Flavored Sparkling',
          image: '/images/flavored-sparkling.jpg',
          description: 'Sparkling water with natural fruit flavors, offering a refreshing and flavorful experience.',
          benefits: ['Natural flavors', 'Bubbly texture', 'Low calories', 'Refreshing']
        }
      ]
    }
  }

  return (
    <main className={styles.typesPage}>
      <section className={styles.hero}>
        <h1>Types of Water</h1>
        <p>Discover the different types of water and their unique characteristics</p>
      </section>

      <section className={styles.tabs}>
        <div className={styles.tabButtons}>
          {Object.keys(waterTypes).map(type => (
            <button
              key={type}
              className={`${styles.tabButton} ${activeTab === type ? styles.active : ''}`}
              onClick={() => setActiveTab(type)}
            >
              {waterTypes[type].title}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.typeInfo}>
          <h2>{waterTypes[activeTab].title}</h2>
          <p className={styles.description}>{waterTypes[activeTab].description}</p>
        </div>

        <div className={styles.typesGrid}>
          {waterTypes[activeTab].types.map((waterType, index) => (
            <div key={index} className={styles.typeCard}>
              <div className={styles.typeImage}>
                <Image
                  src={waterType.image}
                  alt={waterType.name}
                  width={300}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.typeContent}>
                <h3>{waterType.name}</h3>
                <p className={styles.typeDescription}>{waterType.description}</p>
                <ul className={styles.benefits}>
                  {waterType.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.comparison}>
        <h2>Water Type Comparison</h2>
        <div className={styles.comparisonTable}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Carbonation</th>
                <th>Minerals</th>
                <th>Flavor</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Still Water</td>
                <td>No</td>
                <td>Varies</td>
                <td>Clean, neutral</td>
                <td>Daily hydration</td>
              </tr>
              <tr>
                <td>Sparkling Water</td>
                <td>Yes</td>
                <td>Varies</td>
                <td>Crisp, refreshing</td>
                <td>Special occasions</td>
              </tr>
              <tr>
                <td>Flavored Water</td>
                <td>Optional</td>
                <td>Varies</td>
                <td>Fruity, herbal</td>
                <td>Flavor variety</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
} 