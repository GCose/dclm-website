import { useState } from "react";
import {
  Registration,
  RegistrationsTableProps,
} from "@/types/interface/dashboard";
import Table from "@/components/dashboard/tables/Table";
import { Plus, Trash2, Edit, RefreshCw, Search, X } from "lucide-react";
import RegistrationsDetailsModal from "@/components/dashboard/modals/RegistrationsDetailsModal";

const RegistrationsTab = ({
  registrations,
  total,
  loading,
  filters,
  pagination,
  onFiltersChange,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
  totalDays,
}: RegistrationsTableProps) => {
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const columns = [
    { key: "name", label: "Name" },
    { key: "gender", label: "Gender" },
    { key: "age", label: "Age" },
    { key: "category", label: "Category" },
    { key: "nationality", label: "Nationality" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
    { key: "invitedBy", label: "Type" },
    {
      key: "dayRegistered",
      label: "Day Registered",
      render: (value: unknown) => `Day ${value as number}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Registration) => (
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

  const nationalities = [
    "Gambian",
    "Senegalese",
    "Nigerian",
    "Ghanaian",
    "Sierra Leonean",
    "Liberian",
    "Guinean",
    "Other",
  ];

  const hasActiveFilters =
    filters.gender ||
    filters.category ||
    filters.nationality ||
    filters.invitedBy ||
    filters.dayRegistered;

  const clearFilters = () => {
    onFiltersChange({
      search: filters.search,
      gender: "",
      category: "",
      nationality: "",
      invitedBy: "",
      dayRegistered: "",
    });
  };

  const handleRowClick = (registration: Registration) => {
    setSelectedRegistration(registration);
    setShowDetailsModal(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6 md:gap-0">
        <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold uppercase text-navy dark:text-white">
          Retreat Registrations
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white text-sm uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
          >
            <Plus size={16} />
            Add Registration
          </button>
        </div>
      </div>

      <div className="my-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="w-full pl-12 pr-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-navy dark:focus:border-white rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-[clamp(0.8rem,2vw,0.9rem)] uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Gender
            </label>
            <select
              value={filters.gender}
              onChange={(e) =>
                onFiltersChange({ ...filters, gender: e.target.value })
              }
              className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-[clamp(0.8rem,2vw,0.9rem)] uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                onFiltersChange({ ...filters, category: e.target.value })
              }
              className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
            >
              <option value="">All</option>
              <option value="Adult">Adult</option>
              <option value="Campus">Campus</option>
              <option value="Youth">Youth</option>
              <option value="Children">Children</option>
            </select>
          </div>

          <div>
            <label className="block text-[clamp(0.8rem,2vw,0.9rem)] uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Nationality
            </label>
            <select
              value={filters.nationality}
              onChange={(e) =>
                onFiltersChange({ ...filters, nationality: e.target.value })
              }
              className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
            >
              <option value="">All</option>
              {nationalities.map((nat) => (
                <option key={nat} value={nat}>
                  {nat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[clamp(0.8rem,2vw,0.9rem)] uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Type
            </label>
            <select
              value={filters.invitedBy}
              onChange={(e) =>
                onFiltersChange({ ...filters, invitedBy: e.target.value })
              }
              className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
            >
              <option value="">All</option>
              <option value="Invited">Invited</option>
              <option value="Member">Member</option>
              <option value="Worker">Worker</option>
            </select>
          </div>

          <div>
            <label className="block text-[clamp(0.8rem,2vw,0.9rem)] uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Day Registered
            </label>
            <select
              value={filters.dayRegistered}
              onChange={(e) =>
                onFiltersChange({ ...filters, dayRegistered: e.target.value })
              }
              className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
            >
              <option value="">All</option>
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full flex items-center border justify-center gap-2 px-4 py-2 text-sm text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <X size={16} />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={registrations}
        loading={loading}
        onRowClick={handleRowClick}
        pagination={{
          ...pagination,
          total,
        }}
        emptyMessage="No registrations found"
      />

      <RegistrationsDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        registration={selectedRegistration}
      />
    </div>
  );
};

export default RegistrationsTab;
