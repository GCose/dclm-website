import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DashboardLayoutProps } from "@/types/interface/dashboard";
import { LayoutDashboard, Church, Users, Settings, LogOut } from "lucide-react";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        setUserEmail(response.data.email || "");
      } catch (error: unknown) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSignOutClick = () => {
    setUserDropdownOpen(false);
    setShowSignOutConfirm(true);
  };

  const confirmSignOut = async () => {
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
    { path: "/admin/overview", label: "Dashboard", icon: LayoutDashboard },
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

      <div className="min-h-screen bg-white dark:bg-navy transition-colors duration-300">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-navy/50 border-r border-black/0 dark:border-white/10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
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
                    DCLM Admin
                  </h1>
                </div>
              </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

        <div className="lg:pl-64 flex flex-col min-h-screen">
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
                  target="_blank"
                  className="text-sm uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-burgundy dark:hover:text-burgundy transition-colors"
                >
                  View Website
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8">
                    <Image
                      fill
                      src="/images/logo.png"
                      alt="User"
                      className="object-contain"
                    />
                  </div>
                  {userEmail && (
                    <span className="text-sm text-black/70 dark:text-white/70">
                      {userEmail}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-navy dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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
                          {userEmail && (
                            <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                              {userEmail}
                            </p>
                          )}
                        </div>
                        <div className="p-2">
                          <button
                            onClick={handleSignOutClick}
                            className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-left text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
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

      <ConfirmationModal
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={confirmSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
};

export default DashboardLayout;
