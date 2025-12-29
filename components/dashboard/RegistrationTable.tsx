import {
  Registration,
  RegistrationsTableProps,
} from "@/types/interface/dashboard";
import { Plus, Trash2 } from "lucide-react";
import Table from "@/components/dashboard/Table";

const RegistrationsTable = ({
  registrations,
  onAdd,
  onDelete,
}: RegistrationsTableProps) => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "gender", label: "Gender" },
    { key: "age", label: "Age" },
    { key: "category", label: "Category" },
    { key: "nationality", label: "Nationality" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row._id);
          }}
          className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold uppercase text-navy dark:text-white">
          Registrations
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
        >
          <Plus size={16} />
          Add Registration
        </button>
      </div>

      <Table
        columns={columns}
        data={registrations}
        emptyMessage="No registrations yet"
      />
    </div>
  );
};

export default RegistrationsTable;
