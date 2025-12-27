import { Plus, Trash2 } from "lucide-react";

interface Registration {
  _id: string;
  retreatId: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
  nationality: string;
  invitedBy: string;
  age: number;
  dayRegistered: number;
  createdAt: string;
}

interface RegistrationsTableProps {
  registrations: Registration[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

const RegistrationsTable = ({
  registrations,
  onAdd,
  onDelete,
}: RegistrationsTableProps) => {
  return (
    <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
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

      {registrations.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">No registrations yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Gender
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Age
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Day Registered
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr
                  key={reg._id}
                  className="border-b border-black/10 dark:border-white/10"
                >
                  <td className="py-3 px-4 text-black/70 dark:text-white/70">
                    {reg.name}
                  </td>
                  <td className="py-3 px-4 text-black/70 dark:text-white/70">
                    {reg.gender}
                  </td>
                  <td className="py-3 px-4 text-black/70 dark:text-white/70">
                    {reg.age}
                  </td>
                  <td className="py-3 px-4 text-black/70 dark:text-white/70">
                    {reg.phone}
                  </td>
                  <td className="py-3 px-4 text-black/70 dark:text-white/70">
                    Day {reg.dayRegistered}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onDelete(reg._id)}
                      className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationsTable;
