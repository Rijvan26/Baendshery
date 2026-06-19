import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await handleLogin(
      email,
      password
    );

    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] relative overflow-hidden flex items-center justify-center">
      {/* Cursor Glow */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#baf600 1px, transparent 1px),
            linear-gradient(90deg,#baf600 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl flex">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-1 items-center px-16">
  <div>
    {/* Logo */}
    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 rounded-2xl bg-[#baf600] flex items-center justify-center shadow-[0_0_20px_rgba(186,246,0,0.3)]">
        <span className="font-bold text-black text-xl">
          XI
        </span>
      </div>

      <h1 className="text-4xl font-bold text-white">
        Intellexx AI
      </h1>
    </div>

    {/* Hero Title */}
    <h2 className="text-6xl font-bold text-white leading-tight">
      Think Faster.
      <span className="block text-[#baf600]">
        Build Smarter.
      </span>
    </h2>

    {/* Hero Description */}
    <p className="text-gray-400 mt-8 text-lg max-w-xl leading-relaxed">
      Your personal AI assistant for coding,
      learning, writing, research, and solving
      complex problems in seconds.
    </p>

    {/* Features */}
    <div className="mt-10 space-y-5">
      <div className="flex items-center gap-3 text-gray-300">
        <span className="text-[#baf600]">✓</span>
        Instant AI Responses
      </div>

      <div className="flex items-center gap-3 text-gray-300">
        <span className="text-[#baf600]">✓</span>
        Smart Context Awareness
      </div>

      <div className="flex items-center gap-3 text-gray-300">
        <span className="text-[#baf600]">✓</span>
        Conversation History
      </div>

      <div className="flex items-center gap-3 text-gray-300">
        <span className="text-[#baf600]">✓</span>
        Secure Authentication
      </div>
    </div>

    {/* Small Quote */}
    <div className="mt-12 border-l-2 border-[#baf600] pl-4">
      <p className="text-gray-500 italic">
        "Ask anything. Learn faster. Build smarter."
      </p>
    </div>
  </div>
</div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 justify-center items-center p-4">
          <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-[#424845] shadow-[0_0_40px_rgba(186,246,0,0.08)]">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold text-center text-white">
                Welcome Back
              </h1>

              <p className="text-center text-gray-400 mt-2 mb-8">
               Ask questions. Generate ideas. Solve problems.
              </p>

              <form
                onSubmit={submitForm}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label className={`text-white`}>Email</Label>

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full rounded-xl bg-[#1c1b1b]/80 border border-[#424845] px-4 py-3 text-[#e5e2e1] placeholder:text-[#71867c] outline-none transition-all duration-300  focus:border-[#baf600] focus:shadow-[0_0_15px_rgba(186,246,0,0.3)]]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-white`}>Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                      className="w-full rounded-xl bg-[#1c1b1b]/80 border border-[#424845] px-4 py-3 text-[#e5e2e1] placeholder:text-[#71867c] outline-none transition-all duration-300  focus:border-[#baf600] focus:shadow-[0_0_15px_rgba(186,246,0,0.3)]]"

                  />
                </div>

                

                <Button
                  type="submit"
                  className="w-full h-11 bg-[#baf600] text-black hover:bg-[#cfff2d] shadow-[0_0_20px_rgba(186,246,0,0.25)]"
                >
                  Login
                </Button>
              </form>

              <div className="relative my-6">
                <Separator />

                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131313] px-3 text-xs text-gray-500">
                  OR
                </span>
              </div>

              <p className="text-center text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#baf600] font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;