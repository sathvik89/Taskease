import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login - TaskEase",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#FEF9F0]">
      <div className="text-center mb-10">
        <p className="text-sm text-[#14B8A6] font-large tracking-wide">
          Manage all your tasks in one place!
        </p>
        <h1 className="text-5xl font-extrabold text-[#111827] mt-3 leading-snug">
          Task Manager App
        </h1>
        <div className="w-16 h-16 mx-auto mt-5 rounded-full bg-[#14B8A6] flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">TM</span>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
