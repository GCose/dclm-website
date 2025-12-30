import { useState } from "react";
import { Save, Edit, Trash2 } from "lucide-react";
import Table from "@/components/dashboard/tables/Table";
import {
  AttendanceSession,
  AttendanceRecord,
  CategoryAttendanceTableProps,
} from "@/types/interface/dashboard";

const CategoryAttendanceTable = ({
  category,
  day,
  sessions,
  attendanceRecords,
  onSaveAttendance,
  onEditSession,
  onDeleteClick,
}: CategoryAttendanceTableProps) => {
  const [localAttendance, setLocalAttendance] = useState<
    Record<string, Partial<AttendanceRecord>>
  >({});
  const [saving, setSaving] = useState(false);

  const categorySessions = sessions
    .filter((s) => s.category === category && s.day === day)
    .sort((a, b) => a.sessionNumber - b.sessionNumber);

  const getAttendanceForSession = (
    sessionId: string
  ): Partial<AttendanceRecord> => {
    if (localAttendance[sessionId]) {
      return localAttendance[sessionId];
    }

    const existing = attendanceRecords.find((r) => r.sessionId === sessionId);
    if (existing) {
      return existing;
    }

    return {
      sessionId,
      male: 0,
      female: 0,
      total: 0,
    };
  };

  const updateAttendance = (
    sessionId: string,
    field: "male" | "female",
    value: number
  ) => {
    const current = getAttendanceForSession(sessionId);
    const updated = { ...current, [field]: value };
    updated.total = (updated.male || 0) + (updated.female || 0);

    setLocalAttendance({
      ...localAttendance,
      [sessionId]: updated,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const recordsToSave = categorySessions.map((session) => {
        const attendance = getAttendanceForSession(session._id);
        return {
          sessionId: session._id,
          male: attendance.male || 0,
          female: attendance.female || 0,
          total: (attendance.male || 0) + (attendance.female || 0),
        };
      });

      await onSaveAttendance(recordsToSave);
    } finally {
      setSaving(false);
    }
  };

  const dayTotals = categorySessions.reduce(
    (acc, session) => {
      const attendance = getAttendanceForSession(session._id);
      return {
        male: acc.male + (attendance.male || 0),
        female: acc.female + (attendance.female || 0),
        total: acc.total + (attendance.total || 0),
      };
    },
    { male: 0, female: 0, total: 0 }
  );

  const columns = [
    {
      key: "sessionName",
      label: "Session",
      render: (_: unknown, row: AttendanceSession) => (
        <div>
          <div className="font-bold text-navy dark:text-white text-sm flex items-center gap-2">
            {row.sessionName}
            {row.isGSMessage && (
              <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta text-[10px] uppercase tracking-wider font-bold rounded">
                GS Message
              </span>
            )}
          </div>
          <div className="text-xs text-black/60 dark:text-white/60">
            {row.sessionTime}
          </div>
        </div>
      ),
    },
    {
      key: "male",
      label: "Male",
      render: (_: unknown, row: AttendanceSession) => {
        const attendance = getAttendanceForSession(row._id);
        return (
          <input
            type="number"
            min="0"
            value={attendance.male || 0}
            onChange={(e) =>
              updateAttendance(row._id, "male", parseInt(e.target.value) || 0)
            }
            className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
          />
        );
      },
    },
    {
      key: "female",
      label: "Female",
      render: (_: unknown, row: AttendanceSession) => {
        const attendance = getAttendanceForSession(row._id);
        return (
          <input
            type="number"
            min="0"
            value={attendance.female || 0}
            onChange={(e) =>
              updateAttendance(row._id, "female", parseInt(e.target.value) || 0)
            }
            className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
          />
        );
      },
    },
    {
      key: "total",
      label: "Total",
      render: (_: unknown, row: AttendanceSession) => {
        const attendance = getAttendanceForSession(row._id);
        const total = (attendance.male || 0) + (attendance.female || 0);
        return (
          <span className="font-bold text-navy dark:text-white">{total}</span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: AttendanceSession) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditSession(row);
            }}
            className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(row._id);
            }}
            className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (categorySessions.length === 0) {
    return (
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg text-center py-12 text-black/60 dark:text-white/60">
        No sessions scheduled for {category} Church on Day {day}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        <Table
          columns={columns}
          data={categorySessions}
          emptyMessage={`No sessions for ${category} Church on Day ${day}`}
        />

        <div className="border-t-2 border-navy dark:border-white bg-navy/5 dark:bg-white/5">
          <div className="flex items-center px-4 py-4">
            <div className="flex-1">
              <span className="font-bold uppercase text-navy dark:text-white text-sm">
                Day {day} Total
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-20 text-center">
                <span className="font-bold text-navy dark:text-white">
                  {dayTotals.male}
                </span>
              </div>
              <div className="w-20 text-center">
                <span className="font-bold text-navy dark:text-white">
                  {dayTotals.female}
                </span>
              </div>
              <div className="w-20 text-center">
                <span className="font-bold text-navy dark:text-white text-lg">
                  {dayTotals.total}
                </span>
              </div>
              <div className="w-[88px]">{/* Spacer for actions column */}</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded disabled:opacity-50 cursor-pointer"
      >
        <Save size={20} />
        {saving ? "Saving..." : `Save Attendance for Day ${day}`}
      </button>
    </div>
  );
};

export default CategoryAttendanceTable;
