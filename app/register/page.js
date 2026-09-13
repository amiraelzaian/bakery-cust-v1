import BrandPanel from "@/components/auth/BrandPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[44%_56%]">
        <BrandPanel />

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}