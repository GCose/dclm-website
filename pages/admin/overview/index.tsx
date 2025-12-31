import { Toaster } from "sonner";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import StatCard from "@/components/dashboard/StatsCard";
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
            subtitle="All time"
            loading={loading}
          />
          <StatCard
            title="Avg Registrations"
            value={stats?.avgRegistrationsPerRetreat ?? 0}
            subtitle="Per retreat"
            loading={loading}
          />
          <StatCard
            title="Avg Attendance"
            value={stats?.avgAttendancePerRetreat ?? 0}
            subtitle="Per retreat"
            loading={loading}
          />
          <StatCard
            title="Highest Attended"
            value={
              stats?.highestAttended.count
                ? `${stats.highestAttended.count}`
                : "N/A"
            }
            subtitle={
              stats?.highestAttended.year
                ? `${stats.highestAttended.year} ${stats.highestAttended.type}`
                : ""
            }
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
