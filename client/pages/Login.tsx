import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../utilities/Authenticated'

function Login() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const buttonStyle =
    'fixed right-4 top-4 border px-2 py-1 bg-black text-white rounded'

  return (
    <>
      <div className="app">
        <h1>Login Page</h1>
      </div>
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
      <ul>
        <Link to="/game">
          <li>Start Game</li>
        </Link>
        <Link to="/gamelog">
          <li>Game Log</li>
        </Link>
      </ul>
    </>
  )
}

export default Login
