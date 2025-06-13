import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../utilities/Authenticated'

export default function Layout() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const buttonStyle = 'fixed right-4 top-4 border px-2 bg-gray-200 rounded'

  return (
    <>
      <header>
        <h1>AI SPY</h1>

        <div>
          <IfAuthenticated>
            <div className="fixed right-4 top-2">
              <button onClick={handleSignOut} className={buttonStyle}>
                Sign out
              </button>
              {user && (
                <img
                  src={user?.picture}
                  alt={user?.given_name}
                  referrerPolicy="no-referrer"
                  className="h-30 w-30 rounded-full"
                />
              )}
              {user && <p>Signed in as: {user?.nickname}</p>}
            </div>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <button onClick={handleSignIn} className={buttonStyle}>
              Sign in
            </button>
          </IfNotAuthenticated>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
