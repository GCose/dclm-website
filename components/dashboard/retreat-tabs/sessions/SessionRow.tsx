import { Edit, Trash2 } from "lucide-react";
import { SessionRowProps } from "@/types/interface/dashboard";

const SessionRow = ({
  session,
  attendance,
  onAttendanceChange,
  onEditSession,
  onDeleteSession,
}: SessionRowProps) => {
  const male = attendance.male || 0;
  const female = attendance.female || 0;
  const total = male + female;

  return (
    <tr className="border-b border-black/10 dark:border-white/10">
      <td className="py-4 px-4">
        <div>
          <div className="font-bold text-navy dark:text-white text-sm flex items-center gap-2">
            {session.sessionName}
            {session.isGSMessage && (
              <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta text-[10px] uppercase tracking-wider font-bold rounded">
                GS Message
              </span>
            )}
          </div>
          <div className="text-xs text-black/60 dark:text-white/60">
            {session.sessionTime}
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <input
          type="number"
          min="0"
          value={male}
          onChange={(e) =>
            onAttendanceChange("male", parseInt(e.target.value) || 0)
          }
          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
        />
      </td>
      <td className="py-4 px-4">
        <input
          type="number"
          min="0"
          value={female}
          onChange={(e) =>
            onAttendanceChange("female", parseInt(e.target.value) || 0)
          }
          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
        />
      </td>
      <td className="py-4 px-4">
        <span className="font-bold text-navy dark:text-white">{total}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEditSession(session)}
            className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDeleteSession(session._id)}
            className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;
