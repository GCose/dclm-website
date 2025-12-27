import { Save } from "lucide-react";
import { useState } from "react";

interface AttendanceSession {
  _id: string;
  retreatId: string;
  day: number;
  date: string;
  sessionName: string;
  sessionTime: string;
}

interface AttendanceRecord {
  _id?: string;
  sessionId: string;
  adultsMale: number;
  adultsFemale: number;
  youthMale: number;
  youthFemale: number;
  childrenMale: number;
  childrenFemale: number;
  total: number;
}

interface SessionTemplate {
  sessionName: string;
  sessionTime: string;
}

interface SessionFormProps {
  totalDays: number;
  retreatDateFrom: string;
  retreatId: string;
  sessions: AttendanceSession[];
  attendanceRecords: AttendanceRecord[];
  onGenerateSessions: (
    sessionsPerFullDay: number,
    templates: SessionTemplate[]
  ) => Promise<void>;
  onSaveAttendance: (records: AttendanceRecord[]) => void;
}

const SessionForm = ({
  totalDays,
  sessions,
  attendanceRecords,
  onGenerateSessions,
  onSaveAttendance,
}: SessionFormProps) => {
  const [setupMode, setSetupMode] = useState(sessions.length === 0);
  const [sessionsPerFullDay, setSessionsPerFullDay] = useState(6);
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>([
    { sessionName: "", sessionTime: "" },
  ]);

  const [selectedDay, setSelectedDay] = useState(1);
  const [localAttendance, setLocalAttendance] = useState<
    Record<string, Partial<AttendanceRecord>>
  >({});

  const updateTemplate = (
    index: number,
    field: keyof SessionTemplate,
    value: string
  ) => {
    const updated = [...sessionTemplates];
    updated[index][field] = value;
    setSessionTemplates(updated);
  };

  const handleSessionsPerFullDayChange = (count: number) => {
    setSessionsPerFullDay(count);
    const newTemplates: SessionTemplate[] = Array.from(
      { length: count },
      (_, i) => sessionTemplates[i] || { sessionName: "", sessionTime: "" }
    );
    setSessionTemplates(newTemplates);
  };

  const handleGenerateSessions = async () => {
    await onGenerateSessions(sessionsPerFullDay, sessionTemplates);
    setSetupMode(false);
  };

  const daySessions = sessions.filter((s) => s.day === selectedDay);

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
      adultsMale: 0,
      adultsFemale: 0,
      youthMale: 0,
      youthFemale: 0,
      childrenMale: 0,
      childrenFemale: 0,
      total: 0,
    };
  };

  const updateAttendance = (
    sessionId: string,
    field: keyof AttendanceRecord,
    value: number
  ) => {
    const current = getAttendanceForSession(sessionId);
    const updated = { ...current, [field]: value };

    const total =
      (updated.adultsMale || 0) +
      (updated.adultsFemale || 0) +
      (updated.youthMale || 0) +
      (updated.youthFemale || 0) +
      (updated.childrenMale || 0) +
      (updated.childrenFemale || 0);

    updated.total = total;

    setLocalAttendance({
      ...localAttendance,
      [sessionId]: updated,
    });
  };

  const handleSaveAttendance = () => {
    const recordsToSave = daySessions.map((session) => {
      const attendance = getAttendanceForSession(session._id);
      return {
        ...attendance,
        sessionId: session._id,
      } as AttendanceRecord;
    });

    onSaveAttendance(recordsToSave);
  };

  if (setupMode) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
          <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-6">
            Set Up Sessions
          </h3>

          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
              How many sessions for full days? *
            </label>
            <input
              type="number"
              required
              min="1"
              value={sessionsPerFullDay}
              onChange={(e) =>
                handleSessionsPerFullDayChange(parseInt(e.target.value) || 1)
              }
              className="w-full px-2 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
            />
            <p className="text-xs text-black/60 dark:text-white/60 mt-1">
              First and last days will have 1 session each. Full days (Day 2 to
              Day {totalDays - 1}) will have {sessionsPerFullDay} sessions each.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-4">
              Define Session Template (for full days)
            </label>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                      Session #
                    </th>
                    <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                      Session Name *
                    </th>
                    <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                      Session Time *
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionTemplates.map((template, index) => (
                    <tr
                      key={index}
                      className="border-b border-black/10 dark:border-white/10"
                    >
                      <td className="py-3 px-4 text-black/70 dark:text-white/70">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          required
                          value={template.sessionName}
                          onChange={(e) =>
                            updateTemplate(index, "sessionName", e.target.value)
                          }
                          placeholder="e.g., Morning Prayer"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          required
                          value={template.sessionTime}
                          onChange={(e) =>
                            updateTemplate(index, "sessionTime", e.target.value)
                          }
                          placeholder="e.g., 6:00 AM - 8:00 AM"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={handleGenerateSessions}
            className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
          >
            Generate Sessions Schedule
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-6 rounded-lg">
        <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-4">
          Select Day
        </label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                selectedDay === day
                  ? "bg-navy dark:bg-white text-white dark:text-navy font-bold"
                  : "bg-white dark:bg-navy/50 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:border-navy dark:hover:border-white"
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      {daySessions.length > 0 && (
        <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold uppercase text-navy dark:text-white">
              Attendance for Day {selectedDay}
            </h3>
            <button
              onClick={handleSaveAttendance}
              className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
            >
              <Save size={16} />
              Save Attendance
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Session
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Adults Male
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Adults Female
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Youth Male
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Youth Female
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Children Male
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Children Female
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-burgundy font-bold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {daySessions.map((session) => {
                  const attendance = getAttendanceForSession(session._id);
                  return (
                    <tr
                      key={session._id}
                      className="border-b border-black/10 dark:border-white/10"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-bold text-navy dark:text-white text-sm">
                            {session.sessionName}
                          </div>
                          <div className="text-xs text-black/60 dark:text-white/60">
                            {session.sessionTime}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.adultsMale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "adultsMale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.adultsFemale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "adultsFemale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.youthMale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "youthMale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.youthFemale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "youthFemale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.childrenMale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "childrenMale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={attendance.childrenFemale || 0}
                          onChange={(e) =>
                            updateAttendance(
                              session._id,
                              "childrenFemale",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-burgundy"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-navy dark:text-white">
                          {attendance.total || 0}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionForm;
