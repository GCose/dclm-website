import { useState } from "react";
import StatsCard from "./StatsCard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Church, Clipboard, Calendar, Users } from "lucide-react";

const Overview = () => {
  const [stats] = useState({
    totalRetreats: 0,
    totalRegistrations: 0,
    thisYearRegistrations: 0,
    totalAdmins: 0,
  });
  const [loading] = useState(false);

  const statCards = [
    {
      id: "total-retreats",
      label: "Total Retreats",
      value: stats.totalRetreats,
      description: "All retreats in system",
      icon: Church,
    },
    {
      id: "total-registrations",
      label: "Total Registrations",
      value: stats.totalRegistrations,
      description: "All-time participant count",
      icon: Clipboard,
    },
    {
      id: "year-registrations",
      label: "This Year's Registrations",
      value: stats.thisYearRegistrations,
      description: "2025 participants",
      icon: Calendar,
    },
    {
      id: "total-admins",
      label: "Total Admins",
      value: stats.totalAdmins,
      description: "System administrators",
      icon: Users,
    },
  ];

  return (
    <DashboardLayout title="Overview">
      <div>
        <div className="mb-12">
          <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
            Dashboard Overview
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card) => (
            <StatsCard
              key={card.id}
              icon={card.icon}
              loading={loading}
              value={card.value}
              label={card.label}
              description={card.description}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold uppercase text-navy dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider cursor-pointer hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded">
                Create New Retreat
              </button>
              <button className="w-full px-6 py-3 border border-navy dark:border-white text-navy dark:text-white text-sm uppercase tracking-wider cursor-pointer hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-colors rounded">
                View All Retreats
              </button>
            </div>
          </div>

          <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold uppercase text-navy dark:text-white mb-4">
              Recent Activity
            </h2>
            <p className="text-black/60 dark:text-white/60">
              No recent activity to display
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
