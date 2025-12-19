"use client"

import styles from './products.module.scss'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'

const formatPrice = (product) => {
  if (product.currency === 'USD') return `$${product.price}`
  if (product.currency === 'UZS') return `${product.price} сум`
  return String(product.price)
}

const products = [
  {
    id: 1,
    name: 'Питьевая вода 5л',
    price: 7000,
    currency: 'UZS',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=60',
    description: 'Питьевая вода для дома и офиса в удобной таре 5 литров.',
    features: ['Чистая питьевая вода', 'Подходит для ежедневного употребления', 'Удобно хранить и использовать']
  },
  {
    id: 2,
    name: 'Питьевая вода 10л',
    price: 13000,
    currency: 'UZS',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60',
    description: 'Оптимальный объём для семьи — 10 литров питьевой воды.',
    features: ['Чистая питьевая вода', 'Выгодный объём', 'Подходит для дома и офиса']
  },
  {
    id: 3,
    name: 'Питьевая вода 19л',
    price: 20000,
    currency: 'UZS',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60',
    description: 'Большой объём 19 литров — удобно для кулеров и офиса.',
    features: ['Чистая питьевая вода', 'Идеально для кулера', 'Подходит для офиса и дома']
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
              <Image 
                src={product.image}
                alt={product.name}
                width={500}
                height={300}
                priority
              />
            </div>
            <div className={styles.content}>
              <h2>{product.name}</h2>
              {product.size ? <p className={styles.size}>{product.size}</p> : null}
              <p className={styles.price}>{formatPrice(product)}</p>
              <p className={styles.description}>{product.description}</p>
              <ul className={styles.features}>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <span className={styles.checkIcon}><FaCheck /></span>
                    {feature}
                  </li>
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
