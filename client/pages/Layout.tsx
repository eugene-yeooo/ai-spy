import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#805151] to-[#417474] text-white">
      <header className="bg-white/10 p-4 text-center shadow-md">
        <Link
          to="/"
          className="text-3xl font-bold tracking-widest hover:underline"
        >
          AI SPY
        </Link>
      </header>

      <main className="flex flex-grow items-center justify-center p-4">
        <Outlet />
      </main>

      <footer className="bg-white/10 py-3 text-center text-sm">AI SPY</footer>
    </div>
  )
}
