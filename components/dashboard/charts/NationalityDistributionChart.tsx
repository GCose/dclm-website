import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Loader2 } from "lucide-react";
import axios from "axios";
import useNationalityDistribution from "@/hooks/dashboard/use-nationality-distribution";

const COLORS = [
  "#2980b9",
  "#c0392b",
  "#27ae60",
  "#f39c12",
  "#8e44ad",
  "#16a085",
  "#d35400",
  "#2c3e50",
];

interface Retreat {
  year: number;
  type: string;
}

const NationalityDistributionChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [years, setYears] = useState<number[]>([]);

  const { distribution, loading, error } = useNationalityDistribution({
    year: selectedYear,
    type: selectedType,
  });

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("/api/retreats");
        const retreats: Retreat[] = response.data.retreats || [];
        const uniqueYears = [
          ...new Set<number>(retreats.map((r: Retreat) => r.year)),
        ].sort((a: number, b: number) => b - a);
        setYears(uniqueYears);
      } catch (err) {
        console.error("Error fetching years:", err);
      }
    };

    fetchYears();
  }, []);

  const chartData = distribution.map((item) => ({
    name: item.nationality,
    value: item.count,
  }));

  if (loading) {
    return (
      <div className="bg-white dark:bg-navy/50 hover:bg-gray-100 hover:dark:bg-white/5 hover:border-none transition-all duration-300 border border-black/10 dark:border-white/10 rounded-lg p-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
          Nationality Distribution
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
      <div className="bg-white dark:bg-navy/50 hover:bg-gray-100 hover:dark:bg-white/5 hover:border-none transition-all duration-300 border border-black/10 dark:border-white/10 rounded-lg p-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white mb-6">
          Nationality Distribution
        </h3>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-black/60 dark:text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-navy/50 hover:bg-gray-100 hover:dark:bg-white/5 hover:border-none transition-all duration-300 border border-black/10 dark:border-white/10 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase text-navy dark:text-white">
          Nationality Distribution
        </h3>

        <div className="flex gap-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer text-sm"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white rounded focus:outline-none focus:border-navy dark:focus:border-white cursor-pointer text-sm"
          >
            <option value="">All Types</option>
            <option value="Easter">Easter</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-black/60 dark:text-white/60">
            No nationality data available
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NationalityDistributionChart;
