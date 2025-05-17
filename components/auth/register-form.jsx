"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const router = useRouter();

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!nameRef.current?.value.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!emailRef.current?.value.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!passwordRef.current?.value.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (passwordRef.current.value.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // Register the user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      if (result?.error) {
        setApiError(result.error);
      } else {
        console.log("Registration successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-7 bg-white shadow-xl rounded-2xl border border-[#E5E7EB]">
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#14B8A6]">👤</span>
            <input
              ref={nameRef}
              type="text"
              id="name"
              placeholder="Your full name"
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm text-[#111827] bg-white ${
                errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-[#6EE7B7]"
              } focus:outline-none focus:ring-2`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#14B8A6]">📧</span>
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
            <span className="absolute left-3 text-[#14B8A6]">🔒</span>
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

        <div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#14B8A6]">🔒</span>
            <input
              ref={confirmPasswordRef}
              type={showPass ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm password"
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm text-[#111827] bg-white ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-[#6EE7B7]"
              } focus:outline-none focus:ring-2`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-[#14B8A6] hover:bg-teal-600 font-semibold rounded-lg shadow-md transition-colors duration-200 transform hover:scale-[1.01] text-white"
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#14B8A6] hover:text-teal-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
