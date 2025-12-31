"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../../features/auth/LoginForm";
import useAuth from "../../features/auth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const handleLogin = async ({ email, password }) => {
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg w-[360px] shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <LoginForm onLogin={handleLogin} />

        {loading && (
          <p className="text-sm text-center mt-3 text-gray-500">
            Menghubungkan...
          </p>
        )}
      </div>
    </div>
  );
}
