import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login - TaskEase",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#FEF9F0]">
      <div className="text-center mb-16 mt-10">
        <p className="text-sm text-[#14B8A6] font-medium tracking-wide">
          Manage all your tasks in one place!
        </p>
        <h1 className="text-5xl font-extrabold text-[#111827] mt-2 leading-snug">
          Task Manager App
        </h1>
        <div className="w-24 h-24 mx-auto mt-5 rounded-full bg-[#14B8A6] flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
          <span className="text-white font-bold text-3xl">TM</span>
        </div>
      </div>
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[#14B8A6] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
