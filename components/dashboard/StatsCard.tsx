import { Loader2 } from "lucide-react";
import { StatCardProps } from "@/types/interface/dashboard";

const StatCard = ({ title, value, subtitle, loading }: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-6">
      <h3 className="text-sm uppercase tracking-wider text-black/60 dark:text-white/60 mb-2">
        {title}
      </h3>
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2
            className="animate-spin text-navy dark:text-white"
            size={32}
          />
        </div>
      ) : (
        <>
          <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-navy dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">
              {subtitle}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;
