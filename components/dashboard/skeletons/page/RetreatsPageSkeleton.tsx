const RetreatsPageSkeleton = () => {
  return (
    <div className="bg-white dark:bg-navy/50 p-6 rounded-lg border border-black/10 dark:border-white/10">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-100 dark:bg-white/10 rounded"></div>
        <div className="h-10 bg-gray-100 dark:bg-white/10 rounded"></div>
        <div className="h-10 bg-gray-100 dark:bg-white/10 rounded"></div>
      </div>
    </div>
  );
};

export default RetreatsPageSkeleton;
