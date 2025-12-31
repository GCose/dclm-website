import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useRegistrationTrends } from "@/hooks/dashboard/use-registration-trends";

const RegistrationTrendsChart = () => {
  const { trends, loading, error } = useRegistrationTrends();

  if (loading) {
    return (
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
          Registration Trends Over Years
        </h3>
        <div className="flex items-center justify-center h-[400px]">
          <Loader2
            className="animate-spin text-navy dark:text-white"
            size={40}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
          Registration Trends Over Years
        </h3>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-black/60 dark:text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
          Registration Trends Over Years
        </h3>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-black/60 dark:text-white/60">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-6">
      <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
        Registration Trends Over Years
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={trends}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis
            dataKey="year"
            stroke="currentColor"
            className="text-black/70 dark:text-white/70"
          />
          <YAxis
            stroke="currentColor"
            className="text-black/70 dark:text-white/70"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg, #fff)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Easter"
            stroke="#2980b9"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="December"
            stroke="#c0392b"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationTrendsChart;
