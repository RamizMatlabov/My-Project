"use client"

import { useState, useEffect } from 'react'
import styles from './products.module.scss'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import Modal from '@/components/Modal'
import Link from 'next/link'

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
    image: '/5L_water.png',
    description: 'Питьевая вода для дома и офиса в удобной таре 5 литров.',
    features: ['Чистая питьевая вода', 'Подходит для ежедневного употребления', 'Удобно хранить и использовать']
  },
  {
    id: 2,
    name: 'Питьевая вода 10л',
    price: 13000,
    currency: 'UZS',
    image: '/10L_water.png',
    description: 'Оптимальный объём для семьи — 10 литров питьевой воды.',
    features: ['Чистая питьевая вода', 'Выгодный объём', 'Подходит для дома и офиса']
  },
  {
    id: 3,
    name: 'Питьевая вода 19л',
    price: 20000,
    currency: 'UZS',
    image: '/19L_water.png',
    description: 'Большой объём 19 литров — удобно для кулеров и офиса.',
    features: ['Чистая питьевая вода', 'Идеально для кулера', 'Подходит для офиса и дома']
  }
]

export default function Products() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleOrderClick = (productId) => {
    if (user) {
      router.push(`/order?productId=${productId}`)
    } else {
      setShowModal(true)
    }
  }

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
                width={365}
                height={450}
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
              <button 
                className={styles.orderButton}
                onClick={() => handleOrderClick(product.id)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Требуется регистрация"
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            Для оформления заказа необходимо войти в систему или зарегистрироваться.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/login" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'background-color 0.3s',
                display: 'inline-block'
              }}
              onClick={() => setShowModal(false)}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-dark)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary)'}
            >
              Войти
            </Link>
            <Link 
              href="/register" 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                border: '2px solid var(--primary)',
                transition: 'all 0.3s',
                display: 'inline-block'
              }}
              onClick={() => setShowModal(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--primary)'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'var(--primary)'
              }}
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
} 
