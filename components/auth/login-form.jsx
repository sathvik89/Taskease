"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const validate = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!emailRef.current?.value.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!passwordRef.current?.value.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      if (result?.error) {
        setApiError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-7 bg-white shadow-xl rounded-2xl border border-[#E5E7EB]">
      <h2 className="text-2xl font-bold text-[#111827] mb-3 text-center">
        Welcome back
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Keep all your credentials safe.
      </p>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="relative flex items-center">
            <FiMail className="absolute left-3 text-[#14B8A6]" size={20} />
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="email@example.com"
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm text-[#111827] bg-white ${
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-[#6EE7B7]"
              } focus:outline-none focus:ring-2`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <div className="relative flex items-center">
            <FiLock className="absolute left-3 text-[#14B8A6]" size={20} />
            <input
              ref={passwordRef}
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm text-[#111827] bg-white ${
                errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-[#6EE7B7]"
              } focus:outline-none focus:ring-2`}
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-3 hover:cursor-pointer text-sm text-[#14B8A6] font-medium focus:outline-none hover:text-teal-700 transition-colors duration-200"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="text-right mt-2">
          <span
            onClick={() => {
              // Add your custom logic here (e.g. open modal or navigate)
              console.log("Forgot password clicked");
            }}
            className="text-sm text-[#14B8A6] hover:text-teal-700 font-medium cursor-pointer transition-colors duration-200"
          >
            Forgot Password?
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-[#14B8A6] hover:bg-teal-600 font-semibold rounded-lg shadow-md transition-colors duration-200 transform hover:scale-[1.01] text-white"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#14B8A6] hover:text-teal-700 font-medium"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
