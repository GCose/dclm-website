import axios from "axios";
import jwt from "jsonwebtoken";
import { FormEvent } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Layout from "@/components/website/layout/Layout";
import AdminLoginScreen from "@/components/AdminLoginScreen";

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const loginToast = toast.loading("Logging in...");

    try {
      await axios.post("/api/auth/signin", { email, password });
      toast.success("Logged in successfully", { id: loginToast });
      router.push("/admin");
    } catch (error: unknown) {
      toast.error("Invalid credentials", { id: loginToast });
      console.error("Login error:", error);
    }
  };

  return (
    <Layout title="Admin Login">
      <Toaster position="top-right" richColors />
      <AdminLoginScreen onLogin={handleLogin} title="Admin Portal" />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.dclm_admin_token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);

      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    } catch (error: unknown) {
      console.error("Token verification error:", error);
    }
  }

  return {
    props: {},
  };
};
