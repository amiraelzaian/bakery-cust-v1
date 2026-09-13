import LoginForm from "@/components/auth/LoginForm";
import BrandPanel from "@/components/auth/BrandPanel";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FBF7F1]">
      <BrandPanel />
      <div className="flex items-center justify-center p-6 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
}