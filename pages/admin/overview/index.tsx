import { useState } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Church, Clipboard, Calendar, Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";

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
        <div className="mb-4">
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
      </div>
    </DashboardLayout>
  );
};

export default Overview;
