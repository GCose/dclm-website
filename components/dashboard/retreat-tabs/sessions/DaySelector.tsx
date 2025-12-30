import { DaySelectorProps } from "@/types/interface/dashboard";

const DaySelector = ({
  selectedDay,
  totalDays,
  onDayChange,
}: DaySelectorProps) => {
  return (
    <div>
      <select
        value={selectedDay}
        onChange={(e) => onDayChange(parseInt(e.target.value))}
        className="w-full md:w-64 px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
      >
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            Day {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DaySelector;
