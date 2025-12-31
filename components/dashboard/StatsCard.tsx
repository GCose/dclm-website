import { StatCardProps } from "@/types/interface/dashboard";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  loading,
}: StatCardProps) => {
  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-navy/50 p-6 rounded-lg h-40 animate-pulse" />
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-lg hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <Icon size={32} className="text-navy dark:text-white" />
        <div className="text-right">
          <p className="text-[clamp(2rem,4vw,3rem)] font-bold text-navy dark:text-white">
            {value}
          </p>
        </div>
      </div>
      <h3 className="text-[clamp(0.9rem,4vw,1.1rem)] uppercase tracking-wider font-bold text-navy dark:text-white mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[clamp(0.8rem,4vw,1rem)] text-black/60 dark:text-white/60">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;
