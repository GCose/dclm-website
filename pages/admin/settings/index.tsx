import { useState } from "react";
import { Toaster } from "sonner";
import { SettingsTab } from "@/types";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { User, Palette } from "lucide-react";
import ProfileTab from "@/components/dashboard/settings/ProfileTab";
import AppearanceTab from "@/components/dashboard/settings/AppearanceTab";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <DashboardLayout title="Settings">
      <Toaster position="top-right" richColors />
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
            Settings
          </h1>
        </div>

        <div className="md:hidden border-b border-black/10 dark:border-white/10">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === "profile"
                  ? "border-navy dark:border-white text-navy dark:text-white font-bold"
                  : "border-transparent text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
              }`}
            >
              <User size={18} />
              <span className="text-sm uppercase tracking-wider">Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === "appearance"
                  ? "border-navy dark:border-white text-navy dark:text-white font-bold"
                  : "border-transparent text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
              }`}
            >
              <Palette size={18} />
              <span className="text-sm uppercase tracking-wider">
                Appearance
              </span>
            </button>
          </div>
        </div>

        <div className="md:flex gap-8">
          <div className="hidden md:block w-48 space-y-2 border-r dark:border-white/40 pr-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center rounded-sm gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 text-left transition-colors cursor-pointer ${
                activeTab === "profile"
                  ? "text-navy dark:text-white font-bold bg-gray-100 dark:bg-white/5"
                  : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
              }`}
            >
              <User size={18} />
              <span className="text-sm uppercase tracking-wider">Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`w-full flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/3 px-4 py-3 text-left transition-colors ${
                activeTab === "appearance"
                  ? "text-navy dark:text-white font-bold bg-gray-100 dark:bg-white/5"
                  : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
              }`}
            >
              <Palette size={18} />
              <span className="text-sm uppercase tracking-wider">
                Appearance
              </span>
            </button>
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "appearance" && <AppearanceTab />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
