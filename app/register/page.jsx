import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Register - TaskEase",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#FEF9F0]">
      <div className="text-center mb-8">
        <p className="text-sm text-[#14B8A6] font-large tracking-wide">
          Join our task management platform
        </p>
        <h1 className="text-4xl font-extrabold text-[#111827] mt-3 leading-snug">
          Create Your Account
        </h1>
        <div className="w-16 h-16 mx-auto mt-5 rounded-full bg-[#14B8A6] flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">TM</span>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
}
