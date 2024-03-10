'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const GoogleOneTapContext = createContext({ userData: null })

GoogleOneTapContext.displayName = 'GoogleOneTapContext'

const useGoogleOneTap = () => useContext(GoogleOneTapContext)

const GoogleOneTapProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // will show popup after two secs
    const timeout = setTimeout(() => oneTap(), 2000)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This function will call exm api
  const googleOneTapLogin = data => jwtDecode(data.token)

  const oneTap = () => {
    const { google } = window

    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async response => {
          // Here we call our Provider with the token provided by google
          call(response.credential)
        },
      })

      // Here we just console.log some error situations and reason why the google one tap
      // is not displayed. You may want to handle it depending on your application

      // google.accounts.id.prompt() // without listening to notification
      google.accounts.id.prompt(notification => {
        console.log('🚀 ~ oneTap ~ notification:', notification)
        if (notification.isNotDisplayed()) {
          console.log(
            'getNotDisplayedReason ::',
            notification.getNotDisplayedReason(),
          )
          return
        }

        if (notification.isSkippedMoment()) {
          console.log('getSkippedReason  ::', notification.getSkippedReason())
          return
        }

        if (notification.isDismissedMoment()) {
          console.log(
            'getDismissedReason ::',
            notification.getDismissedReason(),
          )
          return
        }
      })
    }
  }

  const call = async token => {
    try {
      const response = await googleOneTapLogin({
        token,
      })

      setUserData(response)
    } catch (error) {
      console.error('🚀 ~ call ~ error:', error)
    }
  }

  return (
    <GoogleOneTapContext.Provider value={{ userData }}>
      {children}
    </GoogleOneTapContext.Provider>
  )
}

export default GoogleOneTapProvider

export { useGoogleOneTap }
