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
    <div className="w-80 rounded-2xl bg-white/5 p-10 text-center shadow-xl">
      <h1 className="mb-6 text-2xl font-bold text-white">Login Page</h1>
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
      <ul className="space-y-4">
        <li>
          <Link
            to="/game"
            className="block w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition-all hover:bg-green-600"
          >
            Start Game
          </Link>
        </li>
        <li>
          <Link
            to="/gamelog"
            className="block w-full rounded-xl bg-purple-500 py-3 font-semibold text-white transition-all hover:bg-purple-600"
          >
            Game Log
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Login
