import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

      const [username, setUsername] = useState("")
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
  
      const navigate = useNavigate()
  
      const {handleRegister} =  useAuth()
  
      const submitForm = async (e) => {
          e.preventDefault()
         const result =  await handleRegister(username,email,password)
           if (result) {
          navigate("/login")

           }
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-200 text-center mb-8">
          Join us and start your journey
        </p>

        <form onSubmit={submitForm} className="space-y-5">
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-blue-600 font-semibold hover:scale-105 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-200 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;