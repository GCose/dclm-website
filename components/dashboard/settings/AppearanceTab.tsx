import { toast } from "sonner";
import { Theme } from "@/types";
import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const AppearanceTab = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || "system";
    }
    return "system";
  });

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-2">
        Theme Preference
      </h3>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Choose how the app looks to you. Select a single theme, or sync with
        your device settings.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => handleThemeChange("light")}
          className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
            theme === "light"
              ? "bg-navy/5 dark:bg-white/5"
              : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              theme === "light"
                ? "bg-navy dark:bg-white text-white dark:text-navy"
                : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60"
            }`}
          >
            <Sun size={24} />
          </div>
          <div className="text-left">
            <p className="font-bold text-navy dark:text-white">Light</p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Always use light theme
            </p>
          </div>
          {theme === "light" && (
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-navy dark:border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-navy dark:bg-white" />
              </div>
            </div>
          )}
        </button>

        <button
          onClick={() => handleThemeChange("dark")}
          className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-navy/5 dark:bg-white/5"
              : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              theme === "dark"
                ? "bg-navy dark:bg-white text-white dark:text-navy"
                : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60"
            }`}
          >
            <Moon size={24} />
          </div>
          <div className="text-left">
            <p className="font-bold text-navy dark:text-white">Dark</p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Always use dark theme
            </p>
          </div>
          {theme === "dark" && (
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-navy dark:border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-navy dark:bg-white" />
              </div>
            </div>
          )}
        </button>

        <button
          onClick={() => handleThemeChange("system")}
          className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
            theme === "system"
              ? "bg-navy/5 dark:bg-white/5"
              : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              theme === "system"
                ? "bg-navy dark:bg-white text-white dark:text-navy"
                : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60"
            }`}
          >
            <Monitor size={24} />
          </div>
          <div className="text-left">
            <p className="font-bold text-navy dark:text-white">System</p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Use device theme settings
            </p>
          </div>
          {theme === "system" && (
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-navy dark:border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-navy dark:bg-white" />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AppearanceTab;