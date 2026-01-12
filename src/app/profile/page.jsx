'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/config'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc, getDocFromCache } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { 
  FaUser, FaEnvelope, FaSignOutAlt, FaUserCircle,
  FaCalendarAlt, FaShieldAlt, FaCheckCircle, FaEdit,
  FaSave, FaTimes, FaPhone, FaMapMarkerAlt, FaInfoCircle
} from 'react-icons/fa'
import styles from './profile.module.scss'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Set user immediately to show page faster
          setUser(user)
          setDisplayName(user.displayName || '')
          
          // Set loading to false immediately after getting user
          if (isMounted) {
            setLoading(false)
          }
          
          // Load additional profile data from Firestore in background
          // This doesn't block the page from showing
          try {
            const userDocRef = doc(db, 'users', user.uid)
            let userDoc
            
            try {
              // Try to get from server first
              userDoc = await getDoc(userDocRef)
            } catch (networkError) {
              // If offline, try to get from cache
              if (networkError.code === 'unavailable' || networkError.message?.includes('offline')) {
                console.log('Offline detected, trying cache...')
                try {
                  userDoc = await getDocFromCache(userDocRef)
                  console.log('Got data from cache')
                } catch (cacheError) {
                  console.log('No cache available, using empty values')
                  userDoc = null
                }
              } else {
                throw networkError
              }
            }
            
            if (isMounted) {
              if (userDoc && userDoc.exists()) {
                const data = userDoc.data()
                setPhoneNumber(data.phoneNumber || '')
                setAddress(data.address || '')
                setBio(data.bio || '')
              } else {
                // Initialize empty values if document doesn't exist
                setPhoneNumber('')
                setAddress('')
                setBio('')
              }
            }
          } catch (error) {
            console.error('Error loading user data:', error)
            // Initialize empty values on error
            if (isMounted) {
              setPhoneNumber('')
              setAddress('')
              setBio('')
            }
          }
        } else {
          if (isMounted) {
            setLoading(false)
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('Error in auth state change:', error)
        if (isMounted) {
          setLoading(false)
          if (!user) {
            router.push('/login')
          }
        }
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [router])

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
    }
  }, [user])

  const handleEdit = async () => {
    setIsEditing(true)
    setDisplayName(user?.displayName || '')
    setError('')
    setSuccess('')
    
    // Load current Firestore data if not already loaded
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid)
        let userDoc
        
        try {
          userDoc = await getDoc(userDocRef)
        } catch (networkError) {
          // If offline, try to get from cache
          if (networkError.code === 'unavailable' || networkError.message?.includes('offline')) {
            try {
              userDoc = await getDocFromCache(userDocRef)
            } catch (cacheError) {
              userDoc = null
            }
          } else {
            throw networkError
          }
        }
        
        if (userDoc && userDoc.exists()) {
          const data = userDoc.data()
          setPhoneNumber(data.phoneNumber || '')
          setAddress(data.address || '')
          setBio(data.bio || '')
        } else {
          // Initialize empty values if document doesn't exist
          setPhoneNumber('')
          setAddress('')
          setBio('')
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        // Initialize empty values on error
        setPhoneNumber('')
        setAddress('')
        setBio('')
      }
    }
  }

  const handleCancel = async () => {
    setIsEditing(false)
    setDisplayName(user?.displayName || '')
    setError('')
    setSuccess('')
    
    // Reset to saved values
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid)
        let userDoc
        
        try {
          userDoc = await getDoc(userDocRef)
        } catch (networkError) {
          // If offline, try to get from cache
          if (networkError.code === 'unavailable' || networkError.message?.includes('offline')) {
            try {
              userDoc = await getDocFromCache(userDocRef)
            } catch (cacheError) {
              userDoc = null
            }
          } else {
            throw networkError
          }
        }
        
        if (userDoc && userDoc.exists()) {
          const data = userDoc.data()
          setPhoneNumber(data.phoneNumber || '')
          setAddress(data.address || '')
          setBio(data.bio || '')
        } else {
          setPhoneNumber('')
          setAddress('')
          setBio('')
        }
      } catch (error) {
        console.error('Error loading user data on cancel:', error)
        setPhoneNumber('')
        setAddress('')
        setBio('')
      }
    }
  }

  const handleSave = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    console.log('=== handleSave called ===')
    console.log('Current values:', { displayName, phoneNumber, address, bio })
    console.log('User:', user?.uid)
    console.log('Auth current user:', auth.currentUser?.uid)
    
    if (!displayName.trim()) {
      setError('Display name cannot be empty')
      console.log('Validation failed: display name is empty')
      return
    }

    if (!auth.currentUser) {
      setError('User not authenticated. Please log in again.')
      console.log('Validation failed: user not authenticated')
      return
    }

    console.log('Starting save process...')
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      console.log('Step 1: Updating Firebase Auth profile...')
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim()
      })
      console.log('✓ Firebase Auth profile updated')
      
      console.log('Step 2: Updating Firestore...')
      // Update Firestore with additional profile data
      const userDocRef = doc(db, 'users', auth.currentUser.uid)
      const dataToSave = {
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        bio: bio.trim(),
        updatedAt: new Date().toISOString()
      }
      console.log('Data to save:', dataToSave)
      
      // Save to Firestore with timeout - don't block on this
      let firestoreSuccess = false
      try {
        const savePromise = setDoc(userDocRef, dataToSave, { merge: true })
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firestore save timeout')), 8000)
        )
        
        await Promise.race([savePromise, timeoutPromise])
        firestoreSuccess = true
        console.log('✓ Firestore updated')
      } catch (firestoreError) {
        console.warn('⚠ Firestore save warning:', firestoreError)
        // If offline or timeout, Firestore will queue the write
        // Don't block the UI - continue with local updates
        if (firestoreError.code === 'unavailable' || 
            firestoreError.message?.includes('offline') ||
            firestoreError.message?.includes('timeout')) {
          console.log('⚠ Offline/timeout: Changes will be synced when online')
        } else {
          console.warn('Firestore error (non-critical):', firestoreError)
        }
        // Continue anyway - local state will be updated
      }
      
      console.log('Step 3: Reloading user data...')
      // Reload user data to get updated displayName
      try {
        await auth.currentUser.reload()
        console.log('✓ User data reloaded')
      } catch (reloadError) {
        console.warn('User reload warning (non-critical):', reloadError)
        // Continue anyway
      }
      
      console.log('Step 4: Updating local state...')
      // Update local user state with fresh data
      const updatedUser = auth.currentUser
      setUser(updatedUser)
      setDisplayName(updatedUser.displayName || displayName.trim())
      
      // Update local state with saved values
      setPhoneNumber(phoneNumber.trim())
      setAddress(address.trim())
      setBio(bio.trim())
      
      console.log('✓ All updates completed successfully!')
      if (firestoreSuccess) {
        setSuccess('Profile updated successfully!')
      } else {
        setSuccess('Profile updated! (Syncing to server...)')
      }
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('❌ ERROR updating profile:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Full error:', JSON.stringify(error, null, 2))
      
      let errorMessage = 'Failed to update profile. Please try again.'
      
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please log out and log in again to update your profile.'
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firestore rules.'
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again later.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
      alert(`Error: ${errorMessage}\n\nCheck console for details.`)
    } finally {
      setSaving(false)
      console.log('=== handleSave finished ===')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.charAt(0).toUpperCase() || 'U'
  }

  const getAccountAge = () => {
    if (user?.metadata?.creationTime) {
      const created = new Date(user.metadata.creationTime)
      const now = new Date()
      const diffTime = Math.abs(now - created)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>My Profile</h1>
          <p className={styles.heroSubtitle}>Manage your account settings and preferences</p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.profileGrid}>
          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {getInitials()}
                </div>
                <div className={styles.avatarBadge}>
                  <FaCheckCircle />
                </div>
              </div>
              <div className={styles.userDetails}>
                <h2>{user?.displayName || 'User'}</h2>
                <p className={styles.userEmail}>
                  <FaEnvelope />
                  {user?.email}
                </p>
                {user?.emailVerified && (
                  <span className={styles.verifiedBadge}>
                    <FaShieldAlt />
                    Verified Account
                  </span>
                )}
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FaCalendarAlt />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statValue}>{getAccountAge()}</p>
                  <p className={styles.statLabel}>Days Active</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FaUserCircle />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statValue}>Member</p>
                  <p className={styles.statLabel}>Account Type</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeaderActions}>
              <h3>
                <FaUser />
                Account Information
              </h3>
              {!isEditing && (
                <button onClick={handleEdit} className={styles.editButton}>
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>
            
            {error && (
              <div className={styles.alertError}>
                {error}
              </div>
            )}
            
            {success && (
              <div className={styles.alertSuccess}>
                {success}
              </div>
            )}

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <FaUser />
                  Display Name
                </span>
                {isEditing ? (
                  <div className={styles.editInputWrapper}>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={styles.editInput}
                      placeholder="Enter your name"
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <span className={styles.infoValue}>
                    {user?.displayName || 'Not set'}
                  </span>
                )}
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <FaEnvelope />
                  Email Address
                </span>
                <span className={styles.infoValue}>{user?.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <FaPhone />
                  Phone Number
                </span>
                {isEditing ? (
                  <div className={styles.editInputWrapper}>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={styles.editInput}
                      placeholder="+998 (99) 123-45-67"
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <span className={styles.infoValue}>
                    {phoneNumber || 'Not set'}
                  </span>
                )}
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <FaMapMarkerAlt />
                  Address
                </span>
                {isEditing ? (
                  <div className={styles.editInputWrapper}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={styles.editInput}
                      placeholder="Enter your address"
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <span className={styles.infoValue}>
                    {address || 'Not set'}
                  </span>
                )}
              </div>
              <div className={`${styles.infoItem} ${styles.bioItem}`}>
                <span className={styles.infoLabel}>
                  <FaInfoCircle />
                  Bio / About
                </span>
                {isEditing ? (
                  <div className={styles.editInputWrapper}>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className={styles.editTextarea}
                      placeholder="Tell us about yourself..."
                      disabled={saving}
                      rows={4}
                    />
                  </div>
                ) : (
                  <span className={styles.infoValue}>
                    {bio || 'Not set'}
                  </span>
                )}
              </div>
            </div>

            {isEditing && (
              <div className={styles.editActions}>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSave(e)
                  }}
                  className={styles.saveButton}
                  disabled={saving}
                >
                  <FaSave />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleCancel()
                  }}
                  className={styles.cancelButton}
                  disabled={saving}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
