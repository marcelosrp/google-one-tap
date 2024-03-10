'use client'
import Image from 'next/image'
import { useGoogleOneTap } from '../providers/GoogleOneTapProvider'

export default function GoogleOneTapLogin() {
  const { userData } = useGoogleOneTap()

  if (!userData) return null

  return (
    <section className="flex gap-2 items-center">
      <div className="relative h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={userData.picture}
          alt={userData.name}
          width={64}
          height={64}
        />
      </div>
      <h1>Bem vindo: {userData.name}</h1>
    </section>
  )
}
