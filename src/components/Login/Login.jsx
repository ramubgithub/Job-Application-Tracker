import { useContext, useState } from "react"
import authContext from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../Context/ToastProvider"

function Login() {
  const { setUser } = useContext(authContext)
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const { showToasts } = useContext(ToastContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) return

    const user = { username }
    localStorage.setItem("auth_user", JSON.stringify(user))
    setUser(user)
    showToasts("Signed in successfully.")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            ApplyLog
          </h1>
          <p className="mt-4 text-base text-gray-600 max-w-md leading-relaxed">
            Track, organize, and manage your job applications with clarity and focus.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full p-8 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col gap-6"
        >
          <h1 className="text-xl font-semibold text-gray-900">
            Login
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-2.5 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login