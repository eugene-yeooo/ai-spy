import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>AI SPY</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
