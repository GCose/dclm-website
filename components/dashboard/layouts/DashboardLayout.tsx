import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Church,
  Users,
  Settings,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode === "true";
    }
    return false;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleSignOut = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/admin/login");
    } catch (error: unknown) {
      console.error("Logout error:", error);
    }
  };

  const siteTitle = title ? `DCLM Admin | ${title}` : "DCLM Admin | Dashboard";

  const isActive = (path: string) => router.pathname === path;

  const navLinks = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/retreats", label: "Retreats", icon: Church },
    { path: "/admin/admins", label: "Admins", icon: Users },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="DCLM Brikama Admin Dashboard - Manage retreats, registrations, and attendance"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className="min-h-screen flex bg-white dark:bg-navy transition-colors duration-300">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-warm-gray dark:bg-navy/50 border-r border-black/10 dark:border-white/10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-black/10 dark:border-white/10">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    fill
                    src="/images/logo.png"
                    alt="DCLM Logo"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold uppercase text-navy dark:text-white">
                    DCLM
                  </h1>
                  <p className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
                    Admin
                  </p>
                </div>
              </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-navy dark:bg-white text-white dark:text-navy font-bold"
                        : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm uppercase tracking-wider">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 bg-white dark:bg-navy border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-navy dark:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <Link
                  href="/"
                  className="text-sm uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-burgundy dark:hover:text-burgundy transition-colors"
                >
                  View Website
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        fill
                        src="/images/logo.png"
                        alt="User"
                        className="object-contain"
                      />
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy border border-black/10 dark:border-white/10 rounded-lg shadow-lg z-20">
                        <div className="p-4 border-b border-black/10 dark:border-white/10">
                          <p className="text-sm font-bold uppercase text-navy dark:text-white">
                            DCLM
                          </p>
                          <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                            admin@dclm.org
                          </p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <LogOut size={18} />
                            <span className="text-sm uppercase tracking-wider">
                              Sign Out
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8 bg-white dark:bg-navy transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
