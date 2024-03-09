'use client'
import { useEffect } from 'react'

const googleOneTapLogin = data => {
  console.log(
    '🚀 ~ file: GoogleOneTapLogin.js:4 ~ googleOneTapLogin ~ data:',
    data,
  )
}

export default function GoogleOneTapLogin() {
  useEffect(() => {
    // will show popup after two secs
    const timeout = setTimeout(() => oneTap(), 2000)
    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        console.log(notification)
        if (notification.isNotDisplayed()) {
          console.log(
            'getNotDisplayedReason ::',
            notification.getNotDisplayedReason(),
          )
        } else if (notification.isSkippedMoment()) {
          console.log('getSkippedReason  ::', notification.getSkippedReason())
        } else if (notification.isDismissedMoment()) {
          console.log(
            'getDismissedReason ::',
            notification.getDismissedReason(),
          )
        }
      })
    }
  }

  const call = async token => {
    try {
      const res = await googleOneTapLogin({
        token,
      })
      console.log('🚀 ~ call ~ res:', res)
      // add your logic to route to
      // redux dispatch
      //router.push('/user')
    } catch (error) {
      console.error('🚀 ~ call ~ error:', error)
      //router.push('/login')
    }
  }

  return <div />
}
