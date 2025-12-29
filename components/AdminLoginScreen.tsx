import Image from "next/image";
import { AdminLoginScreenProps } from "@/types";

const AdminLoginScreen = ({
  onLogin,
  title = "Admin Login",
}: AdminLoginScreenProps) => {
  return (
    <div className="relative min-h-screen bg-cream flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute -left-32 top-1/4 opacity-10">
        <div className="relative w-64 h-64 rotate-90">
          <Image
            fill
            src="/images/logo.png"
            alt=""
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute -right-32 top-1/3 opacity-10">
        <div className="relative w-64 h-64 -rotate-90">
          <Image
            fill
            src="/images/logo.png"
            alt=""
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 opacity-10">
        <div className="relative w-64 h-64">
          <Image
            fill
            src="/images/logo.png"
            alt=""
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] uppercase font-bold text-center mb-12">
          {title}
        </h1>
        <form onSubmit={onLogin} className="space-y-8 bg-white p-10">
          <div>
            <label className="block text-lg uppercase tracking-relaxed text-black/60">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
            />
          </div>
          <div>
            <label className="block text-lg uppercase tracking-relaxed text-black/60">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-navy text-white py-4 text-sm uppercase cursor-pointer tracking-widest hover:bg-navy/90 transition-colors mt-8"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
