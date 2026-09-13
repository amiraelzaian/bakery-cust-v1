// app/login/page.js
import RegisterForm from "@/components/auth/RegisterForm";
import BrandPanel from "@/components/auth/BrandPanel";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FBF7F1]">
      <BrandPanel />
      <div className="flex items-center justify-center p-6 lg:p-12">
        <RegisterForm />
      </div>
    </div>
  );
}