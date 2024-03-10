import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import GoogleOneTapProvider from '../providers/GoogleOneTapProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Google One Tap Login Example',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOneTapProvider>{children}</GoogleOneTapProvider>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
