"use client";
import { useEffect, useState } from "react";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { FaSpinner, FaBuilding, FaUsers, FaClock } from "react-icons/fa";
import Image from "next/image";
import remarkLogo from "@/app/public/images/remark.png";
import { useAuthContext } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";
import { APP_NAME, TAGLINE } from "@/app/utils/constants";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, isError, user } = useAuthContext();
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    await login(form);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FFEF] via-white to-[#C3FFE5] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative min-h-screen flex">
        {/* Left Side - BNP Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#006A4E] to-[#004C38] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-200/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <div className="mb-8">
              <Image
                src={remarkLogo}
                alt="Logo"
                width={120}
                height={120}
                className="mx-auto mb-6 drop-shadow-2xl"
                priority
              />
              <h1 className="text-4xl font-bold mb-4">{APP_NAME}</h1>
              <p className="text-xl text-green-100 mb-8">
                {TAGLINE}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaClock className="text-2xl text-green-200" />
                <div className="text-left">
                  <h3 className="font-semibold">Candidate & Campaign Control</h3>
                  {/* <p className="text-sm text-green-100">
                    Real-time monitoring made simple
                  </p> */}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaUsers className="text-2xl text-green-200" />
                <div className="text-left">
                  <h3 className="font-semibold">Voter Insights & Area Mapping</h3>
                  {/* <p className="text-sm text-green-100">
                    Manage your workforce effortlessly
                  </p> */}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <FaBuilding className="text-2xl text-green-200" />
                <div className="text-left">
                  <h3 className="font-semibold">Event & Field Activity Manage</h3>
                  {/* <p className="text-sm text-green-100">
                    Multi-location ready
                  </p> */}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Image
                src={remarkLogo}
                alt="Logo"
                width={80}
                height={80}
                className="mx-auto mb-4"
                priority
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {APP_NAME}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {TAGLINE}
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-green-200 dark:border-green-900">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign in to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email / Employee ID
                  </label>
                  <div className="relative">
                    <input
                      value={"super_admin@gmail.com"}
                      name="email"
                      type="text"
                      required
                      placeholder="Enter your Email/ID"
                      className="w-full px-4 py-3 pl-12 pr-4 border border-green-300 dark:border-green-700 rounded-lg bg-green-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                    <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-300 w-5 h-5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      value={"super_123_admin"}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pl-12 pr-12 border border-green-300 dark:border-green-700 rounded-lg bg-green-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-300 w-5 h-5" />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100 transition"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="w-5 h-5" />
                      ) : (
                        <MdVisibility className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {isError && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {isError}
                    </p>
                  </div>
                )}

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 bg-gray-100 border-green-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      Remember me
                    </span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium transition"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#006A4E] to-[#004C38] hover:from-[#007d59] hover:to-[#005542] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin w-4 h-4" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need access? Contact support
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} QP. All rights reserved.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
