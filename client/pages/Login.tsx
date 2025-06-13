import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="w-80 rounded-2xl bg-white/5 p-10 text-center shadow-xl">
      <h1 className="mb-6 text-2xl font-bold text-white">Login Page</h1>

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
