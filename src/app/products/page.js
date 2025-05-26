"use client"

import styles from './products.module.scss'

const products = [
  {
    id: 1,
    name: 'Spring Water Bottle',
    size: '500ml',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60',
    description: 'Pure spring water in a convenient 500ml bottle. Perfect for on-the-go hydration.',
    features: [
      'Natural spring water',
      'BPA-free bottle',
      'Recyclable packaging',
      'Perfect for daily use'
    ]
  },
  {
    id: 2,
    name: 'Mineral Water Jug',
    size: '5L',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60',
    description: 'Rich mineral water in a family-sized jug. Ideal for home and office use.',
    features: [
      'High mineral content',
      'Durable container',
      'Easy to pour',
      'Great value'
    ]
  },
  {
    id: 3,
    name: 'Purified Water Pack',
    size: '12 x 1L',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60',
    description: 'Bulk pack of purified water bottles. Perfect for families and small businesses.',
    features: [
      'Ultra-purified water',
      'Bulk savings',
      'Easy storage',
      'Long shelf life'
    ]
  }
]

export default function Products() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Our Products</h1>
        <p>Discover our range of premium water products, designed to meet your hydration needs.</p>
      </div>

      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2>{product.name}</h2>
              <p className={styles.size}>{product.size}</p>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.description}>{product.description}</p>
              <ul className={styles.features}>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className={styles.orderButton}>Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 