import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useState, useEffect } from "react";

const ProfileTab = () => {
  const { user, loading, refreshUser } = useUser();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      setSaving(true);
      await axios.put("/api/auth/profile", {
        name: profile.name,
        email: profile.email,
      });
      toast.success("Profile updated successfully");
      await refreshUser();
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setSaving(true);
      await axios.put("/api/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("Error changing password:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-navy dark:text-white" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-2xl">
      <div>
        <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-6">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
              placeholder="your.email@example.com"
            />
          </div>

          <button
            onClick={handleProfileUpdate}
            disabled={saving}
            className="px-6 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase font-medium rounded hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-6">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white"
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={
              saving ||
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.confirmPassword
            }
            className="px-6 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase font-medium rounded hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
