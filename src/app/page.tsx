import GoogleOneTapLogin from '../components/GoogleOneTapLogin'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <GoogleOneTapLogin />
    </main>
  )
}
