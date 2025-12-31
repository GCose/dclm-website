import { Toaster } from "sonner";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import StatCard from "@/components/dashboard/StatsCard";
import { Church, Calendar, Trophy, Users } from "lucide-react";
import useDashboardStats from "@/hooks/dashboard/use-dashboard-stats";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import RegistrationTrendsChart from "@/components/dashboard/charts/RegistrationTrendsChart";
import NationalityDistributionChart from "@/components/dashboard/charts/NationalityDistributionChart";

const Dashboard = () => {
  const { stats, loading } = useDashboardStats();

  return (
    <DashboardLayout title="Dashboard">
      <Toaster position="top-right" richColors />
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Overview of retreat statistics and trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Retreats"
            value={stats?.totalRetreats ?? 0}
            subtitle="All retreats in system"
            icon={Church}
            loading={loading}
          />
          <StatCard
            title="Latest Retreat"
            value={stats?.latestRetreat?.count ?? 0}
            subtitle={
              stats?.latestRetreat
                ? `${stats.latestRetreat.type} ${stats.latestRetreat.year}`
                : "No retreats yet"
            }
            icon={Calendar}
            loading={loading}
          />
          <StatCard
            title="Best Performance"
            value={stats?.bestPerformance?.count ?? 0}
            subtitle={
              stats?.bestPerformance?.year
                ? `${stats.bestPerformance.type} ${stats.bestPerformance.year}`
                : "No data yet"
            }
            icon={Trophy}
            loading={loading}
          />
          <StatCard
            title={`${stats?.currentYear ?? new Date().getFullYear()} Total`}
            value={stats?.currentYearTotal ?? 0}
            subtitle="This year's registrations"
            icon={Users}
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegistrationTrendsChart />
          <NationalityDistributionChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
