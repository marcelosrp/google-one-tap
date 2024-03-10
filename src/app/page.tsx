import GoogleOneTapLogin from '../components/GoogleOneTapLogin'

export default function Home() {
  return (
    <>
      <GoogleOneTapLogin />
      <main className="flex min-h-screen flex-col items-center justify-between p-6"></main>
    </>
  )
}
