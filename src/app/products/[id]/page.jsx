"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheck, FaArrowLeft } from 'react-icons/fa'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import Modal from '@/components/Modal'
import { products } from '@/data/products'
import styles from './product-details.module.scss'

const formatPrice = (product) => {
  if (product.currency === 'USD') return `$${product.price}`
  if (product.currency === 'UZS') return `${product.price} сум`
  return String(product.price)
}

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (params.id) {
      const foundProduct = products.find(p => p.id === parseInt(params.id))
      setProduct(foundProduct)
    }
  }, [params.id])

  const handleOrderClick = () => {
    if (user) {
      router.push(`/order?productId=${product.id}`)
    } else {
      setShowModal(true)
    }
  }

  if (!product) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backLink}>
        <FaArrowLeft /> Back to Products
      </Link>

      <div className={styles.productWrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            className={styles.image}
          />
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>{product.name}</h1>
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
            onClick={handleOrderClick}
          >
            Order Now
          </button>
        </div>
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
