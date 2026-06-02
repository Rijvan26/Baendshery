import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react'
import useAuth from "../hooks/useAuth"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {handleLogin} =  useAuth()

    const submitForm = async (e) => {
        e.preventDefault()
        await handleLogin(email,password)

        navigate("/")
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-200 text-center mb-8">
          Login to continue
        </p>

        <form onSubmit={submitForm}
        className="space-y-5">
          <div>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"

            className="w-full py-3 rounded-xl bg-white text-purple-600 font-semibold hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-200 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;