"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './order.module.scss'
import { FaShoppingCart, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck, FaPlus, FaTrash } from 'react-icons/fa'

const products = [
  {
    id: 1,
    name: 'Питьевая вода 5л',
    price: 7000,
    currency: 'UZS',
    image: '/5L_water.png',
    description: 'Питьевая вода для дома и офиса в удобной таре 5 литров.',
  },
  {
    id: 2,
    name: 'Питьевая вода 10л',
    price: 13000,
    currency: 'UZS',
    image: '/10L_water.png',
    description: 'Оптимальный объём для семьи — 10 литров питьевой воды.',
  },
  {
    id: 3,
    name: 'Питьевая вода 19л',
    price: 20000,
    currency: 'UZS',
    image: '/19L_water.png',
    description: 'Большой объём 19 литров — удобно для кулеров и офиса.',
  },
  {
    id: 4,
    name: 'Механическая помпа',
    price: 45000,
    currency: 'UZS',
    image: '/3.png',
    description: 'Механическая помпа для розлива воды из бутыли.',
  },
  {
    id: 5,
    name: 'Электрическая помпа',
    price: 120000,
    currency: 'UZS',
    image: '/4.png',
    description: 'Электрическая помпа для удобного розлива воды.',
  },
  {
    id: 6,
    name: 'Настольный кулер',
    price: 420000,
    currency: 'UZS',
    image: '/5.png',
    description: 'Компактный настольный кулер для дома и офиса.',
  },
  {
    id: 7,
    name: 'Напольный кулер с нагревом и охлаждением',
    price: 920000,
    currency: 'UZS',
    image: '/6.png',
    description: 'Напольный кулер с горячей и охлаждённой водой.',
  },
  {
    id: 8,
    name: 'Подставка для бутыли',
    price: 30000,
    currency: 'UZS',
    image: '/7.png',
    description: 'Подставка для удобного размещения бутыли с водой.',
  },
  {
    id: 9,
    name: 'Держатель стаканов',
    price: 7000,
    currency: 'UZS',
    image: '/8.png',
    description: 'Держатель для одноразовых стаканов рядом с кулером.',
  }
]

const formatPrice = (product, quantity = 1) => {
  const total = product.price * quantity
  if (product.currency === 'USD') return `$${total}`
  if (product.currency === 'UZS') return `${total.toLocaleString()} сум`
  return String(total)
}

const formatTotalPrice = (total, currency = 'UZS') => {
  if (currency === 'USD') return `$${total.toLocaleString()}`
  if (currency === 'UZS') return `${total.toLocaleString()} сум`
  return String(total)
}

const formatPhoneNumber = (value) => {
  // Удаляем все нецифровые символы
  const numbers = value.replace(/\D/g, '')
  
  // Если пусто, возвращаем пустую строку
  if (numbers.length === 0) return ''
  
  // Если номер начинается с 998, используем его как есть
  // Если начинается с другого, добавляем 998 в начало
  let phoneNumbers = numbers
  if (!phoneNumbers.startsWith('998')) {
    phoneNumbers = '998' + phoneNumbers
  }
  
  // Ограничиваем до 12 цифр (998 + 9 цифр)
  const limited = phoneNumbers.slice(0, 12)
  
  // Форматируем: +998 (XX) XXX-XX-XX
  if (limited.length <= 3) return `+${limited}`
  if (limited.length <= 5) return `+998 (${limited.slice(3)}`
  if (limited.length <= 8) return `+998 (${limited.slice(3, 5)}) ${limited.slice(5)}`
  if (limited.length <= 10) return `+998 (${limited.slice(3, 5)}) ${limited.slice(5, 8)}-${limited.slice(8)}`
  return `+998 (${limited.slice(3, 5)}) ${limited.slice(5, 8)}-${limited.slice(8, 10)}-${limited.slice(10)}`
}

function OrderContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productIdParam = searchParams.get('productId')
  const productId = productIdParam ? parseInt(productIdParam) : 1
  
  const [cartItems, setCartItems] = useState([]) // Массив товаров в корзине: [{productId, quantity}]
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId)
    if (foundProduct) {
      // Добавляем начальный товар в корзину, если его там еще нет
      setCartItems(prev => {
        const exists = prev.find(item => item.productId === productId)
        if (!exists) {
          return [...prev, { productId, quantity: 1 }]
        }
        return prev
      })
      setIsLoading(false)
    } else if (productId) {
      // Если продукт не найден, перенаправляем на страницу продуктов
      router.push('/products')
    } else {
      setIsLoading(false)
    }
  }, [productId, router])

  // Перенаправление на страницу продуктов, если корзина стала пустой (после загрузки)
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      const timer = setTimeout(() => {
        router.push('/products')
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [cartItems.length, isLoading, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Для телефона форматируем номер
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value)
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleQuantityChange = (productId, delta) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const handleAddProduct = (productId) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.productId === productId)
      if (exists) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  const handleRemoveProduct = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId))
  }

  const getProductById = (id) => products.find(p => p.id === id)
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Здесь можно добавить отправку данных на сервер
    // Например, через API или email service
    
    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }, 1000)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    router.push('/products')
  }

  // Показываем загрузку только во время инициализации
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  // Если корзина пуста после загрузки, показываем загрузку (будет перенаправление)
  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1><FaShoppingCart /> Оформление заказа</h1>
        <p>Заполните форму ниже, чтобы оформить заказ</p>
      </div>

      <div className={styles.content}>
        {/* Cart Items */}
        <div className={styles.productSection}>
          <h2>Товары в заказе</h2>
          
          {/* Список товаров в корзине */}
          <div className={styles.cartItems}>
            {cartItems.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              
              return (
                <div key={item.productId} className={styles.cartItem}>
                  <div className={styles.cartItemImage}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={100}
                    />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <h4>{product.name}</h4>
                    <p className={styles.cartItemPrice}>{formatPrice(product, 1)}</p>
                    <div className={styles.cartItemControls}>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        className={styles.quantityButton}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        className={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.cartItemTotal}>
                    <span className={styles.itemTotalPrice}>{formatPrice(product, item.quantity)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(item.productId)}
                      className={styles.removeButton}
                      title="Удалить товар"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Добавить другие товары */}
          <div className={styles.addProductsSection}>
            <h3>Добавить другие товары</h3>
            <div className={styles.otherProducts}>
              {products.map((prod) => {
                const inCart = cartItems.some(item => item.productId === prod.id)
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleAddProduct(prod.id)}
                    className={styles.addProductButton}
                    disabled={inCart}
                  >
                    <FaPlus />
                    <span>{prod.name}</span>
                    <span className={styles.addProductPrice}>{formatPrice(prod, 1)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h3>Итого:</h3>
            {cartItems.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              return (
                <div key={item.productId} className={styles.summaryRow}>
                  <span>{product.name} × {item.quantity}</span>
                  <span>{formatPrice(product, item.quantity)}</span>
                </div>
              )
            })}
            <div className={styles.summaryTotal}>
              <span>Общая сумма:</span>
              <span className={styles.totalPrice}>
                {cartItems.length > 0 && getProductById(cartItems[0].productId)
                  ? formatTotalPrice(getTotalPrice(), getProductById(cartItems[0].productId).currency)
                  : '0 сум'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className={styles.orderForm}>
          <h2>Контактная информация</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <FaUser /> Имя и фамилия *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Введите ваше имя"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">
              <FaPhone data-phone-icon /> Телефон *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+998 (__) ___-__-__"
              maxLength={19}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">
              <FaMapMarkerAlt /> Адрес доставки *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Введите адрес доставки"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Дополнительные комментарии</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Любые дополнительные пожелания или комментарии к заказу"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.successIcon}>
              <FaCheck />
            </div>
            <h2 className={styles.modalTitle}>Заказ успешно оформлен!</h2>
            <p className={styles.modalText}>
              Спасибо за ваш заказ! Мы получили вашу заявку и свяжемся с вами в ближайшее время для подтверждения деталей доставки.
            </p>
            <div className={styles.modalDetails}>
              {cartItems.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null
                return (
                  <p key={item.productId}>
                    <strong>{product.name}:</strong> {item.quantity} шт. - {formatPrice(product, item.quantity)}
                  </p>
                )
              })}
              <p className={styles.modalTotal}>
                <strong>Общая сумма:</strong> {cartItems.length > 0 && getProductById(cartItems[0].productId)
                  ? formatTotalPrice(getTotalPrice(), getProductById(cartItems[0].productId).currency)
                  : '0 сум'}
              </p>
            </div>
            <button className={styles.modalButton} onClick={handleCloseModal}>
              Вернуться к товарам
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Order() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  )
}

