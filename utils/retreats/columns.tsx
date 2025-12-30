import { Edit, Trash2 } from "lucide-react";
import { Retreat } from "@/types/interface/dashboard";

export const getRetreatsColumns = (
  formatDate: (date: string) => string,
  onEdit: (retreat: Retreat) => void,
  onDelete: (id: string) => void
) => [
  {
    key: "year",
    label: "Year",
    render: (value: unknown) => (
      <span className="font-medium">{value as number}</span>
    ),
  },
  { key: "type", label: "Type" },
  { key: "venue", label: "Venue" },
  {
    key: "dates",
    label: "Dates",
    render: (_: unknown, row: Retreat) =>
      `${formatDate(row.dateFrom)} - ${formatDate(row.dateTo)}`,
  },
  {
    key: "totalDays",
    label: "Duration",
    render: (value: unknown) => `${value as number} days`,
  },
  {
    key: "status",
    label: "Status",
    render: (value: unknown) => (
      <span
        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${
          value === "ongoing"
            ? "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400"
            : "bg-gray-200 text-gray-700 "
        }`}
      >
        {value as string}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (_: unknown, row: Retreat) => (
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }}
          className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row._id);
          }}
          className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
