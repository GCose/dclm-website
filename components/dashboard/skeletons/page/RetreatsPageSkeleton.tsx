const RetreatsPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white dark:bg-navy/50 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-white/5 px-6 py-4">
          <div className="grid grid-cols-7 gap-4">
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
          </div>
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border-b border-black/10 dark:border-white/10 px-6 py-4"
          >
            <div className="grid grid-cols-7 gap-4 items-center">
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-24"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-white/10 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-40"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 dark:bg-white/10 rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-white/10 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default RetreatsPageSkeleton;
