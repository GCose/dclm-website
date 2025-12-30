import { Category, SessionCountsStepProps } from "@/types/interface/dashboard";

const SessionCountsStep = ({
  counts,
  onCountsChange,
  onNext,
}: SessionCountsStepProps) => {
  const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];

  const handleCountChange = (category: Category, value: number) => {
    onCountsChange({
      ...counts,
      [category]: value,
    });
  };

  const handleContinue = () => {
    const allValid = categories.every((cat) => counts[cat] > 0);
    if (!allValid) {
      alert("Please enter session counts for all categories");
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white dark:bg-navy/50 ">
      <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-6">
        Set Up Sessions for Retreat
      </h3>

      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        Define how many sessions each category will have during the retreat.
      </p>

      <div className="space-y-6 mb-8">
        {categories.map((category) => (
          <div key={category}>
            <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              How many sessions for {category}{" "}
              {category === "Campus" ? "Fellowship" : "Church"}? *
            </label>
            <input
              type="number"
              required
              min="1"
              value={counts[category]}
              onChange={(e) =>
                handleCountChange(category, parseInt(e.target.value) || 0)
              }
              className="w-full md:w-64 px-4 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="m-auto px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
      >
        Continue to Define Sessions
      </button>
    </div>
  );
};

export default SessionCountsStep;
