import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Settings } from "lucide-react";
import {
  Category,
  AttendanceSession,
  AttendanceRecord,
  SessionTemplate,
  SessionsAndAttendanceTabProps,
} from "@/types/interface/dashboard";
import DaySelector from "./DaySelector";
import CategoryTabs from "./CategoryTabs";
import { calculateDayDate } from "@/utils/retreats/helpers";
import SessionSetupForm from "../../forms/SessionSetupForm";
import EditSessionModal from "../../modals/EditSessionModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import CategoryAttendanceTable from "../../tables/CategoryAttendanceTable";

const SessionsAndAttendanceTab = ({
  retreat,
  sessions,
  attendanceRecords,
  onRefresh,
}: SessionsAndAttendanceTabProps) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Adult");
  const [editingSession, setEditingSession] =
    useState<AttendanceSession | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGlobalEditModal, setShowGlobalEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const retreatSessions = sessions.filter((s) => s.retreatId === retreat._id);
  const setupMode = retreatSessions.length === 0;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleGenerateSessions = async (templates: SessionTemplate[]) => {
    try {
      const sessionsToCreate: Omit<
        AttendanceSession,
        "_id" | "createdAt" | "updatedAt"
      >[] = [];

      for (let day = 1; day <= retreat.totalDays; day++) {
        const dayDate = calculateDayDate(retreat, day);

        templates.forEach((template) => {
          const sessionNumber = template.sessionNumber;

          const isGSMessage =
            sessionNumber === 1 ||
            sessionNumber === 3 ||
            sessionNumber === templates.length;

          const categories: Category[] = [
            "Adult",
            "Youth",
            "Campus",
            "Children",
          ];
          const categoryNames = {
            Adult: template.adultName,
            Youth: template.youthName,
            Campus: template.campusName,
            Children: template.childrenName,
          };

          const sessionTime = `${formatTime(template.startTime)} - ${formatTime(
            template.endTime
          )}`;

          categories.forEach((category) => {
            if (day === 1 && sessionNumber !== templates.length) return;

            if (day === retreat.totalDays && sessionNumber !== 1) return;

            sessionsToCreate.push({
              retreatId: retreat._id,
              category,
              sessionNumber,
              day,
              date: dayDate,
              sessionName: categoryNames[category],
              sessionTime,
              isGSMessage,
            });
          });
        });
      }

      console.log(`Creating ${sessionsToCreate.length} sessions...`);

      await Promise.all(
        sessionsToCreate.map((session) =>
          axios.post("/api/attendance-sessions", session)
        )
      );

      toast.success(
        `Generated ${sessionsToCreate.length} sessions successfully`
      );
      setShowGlobalEditModal(false);
      await onRefresh();
    } catch (error: unknown) {
      console.error("Error generating sessions:", error);
      toast.error("Failed to generate sessions");
    }
  };

  const handleDeleteAllAndRegenerate = async (templates: SessionTemplate[]) => {
    try {
      await Promise.all(
        retreatSessions.map((session) =>
          axios.delete(`/api/attendance-sessions/${session._id}`)
        )
      );

      toast.success("Deleted all existing sessions");

      await handleGenerateSessions(templates);
    } catch (error: unknown) {
      console.error("Error deleting/regenerating sessions:", error);
      toast.error("Failed to regenerate sessions");
    }
  };

  const handleSaveAttendance = async (records: Partial<AttendanceRecord>[]) => {
    try {
      await Promise.all(
        records.map((record) => axios.post("/api/attendance-records", record))
      );
      toast.success("Attendance saved successfully");
      await onRefresh();
    } catch (error: unknown) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance");
    }
  };

  const handleEditSession = (session: AttendanceSession) => {
    setEditingSession(session);
    setShowEditModal(true);
  };

  const handleSaveSession = async (
    sessionId: string,
    updates: Partial<AttendanceSession>
  ) => {
    try {
      await axios.patch(`/api/attendance-sessions/${sessionId}`, updates);
      toast.success("Session updated successfully");
      await onRefresh();
    } catch (error: unknown) {
      console.error("Error updating session:", error);
      toast.error("Failed to update session");
    }
  };

  const handleDeleteClick = (sessionId: string) => {
    setDeleteConfirm({ isOpen: true, id: sessionId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;

    try {
      await axios.delete(`/api/attendance-sessions/${deleteConfirm.id}`);
      toast.success("Session deleted successfully");
      setDeleteConfirm({ isOpen: false, id: null });
      await onRefresh();
    } catch (error: unknown) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
  };

  const getExistingTemplates = (): SessionTemplate[] => {
    const uniqueSessionNumbers = [
      ...new Set(retreatSessions.map((s) => s.sessionNumber)),
    ].sort((a, b) => a - b);

    return uniqueSessionNumbers.map((sessionNum) => {
      const sessionsForThisNumber = retreatSessions.filter(
        (s) => s.sessionNumber === sessionNum
      );

      const adultSession = sessionsForThisNumber.find(
        (s) => s.category === "Adult"
      );
      const youthSession = sessionsForThisNumber.find(
        (s) => s.category === "Youth"
      );
      const campusSession = sessionsForThisNumber.find(
        (s) => s.category === "Campus"
      );
      const childrenSession = sessionsForThisNumber.find(
        (s) => s.category === "Children"
      );

      const timeStr = adultSession?.sessionTime || "";
      const [start, end] = timeStr.split(" - ");

      const convertTo24Hour = (time12: string) => {
        if (!time12) return "";
        const [time, period] = time12.split(" ");
        const [hours, minutes] = time.split(":");
        let hour = parseInt(hours);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        return `${hour.toString().padStart(2, "0")}:${minutes}`;
      };

      return {
        sessionNumber: sessionNum,
        startTime: convertTo24Hour(start),
        endTime: convertTo24Hour(end),
        adultName: adultSession?.sessionName || "",
        youthName: youthSession?.sessionName || "",
        campusName: campusSession?.sessionName || "",
        childrenName: childrenSession?.sessionName || "",
      };
    });
  };

  if (setupMode) {
    return (
      <SessionSetupForm
        totalDays={retreat.totalDays}
        onGenerate={handleGenerateSessions}
      />
    );
  }

  if (showGlobalEditModal) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase text-navy dark:text-white">
            Edit All Sessions
          </h3>
          <button
            onClick={() => setShowGlobalEditModal(false)}
            className="px-4 py-2 text-sm uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="bg-terracotta/10 border border-terracotta/20 p-4 rounded">
          <p className="text-sm text-terracotta">
            <strong>Warning:</strong> Saving will delete all existing sessions
            and create new ones. All attendance records will be deleted.
          </p>
        </div>

        <SessionSetupForm
          totalDays={retreat.totalDays}
          onGenerate={handleDeleteAllAndRegenerate}
          existingTemplates={getExistingTemplates()}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold uppercase text-navy dark:text-white">
              Sessions & Attendance
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">
              {retreat.year} {retreat.type} Retreat - {retreat.totalDays} Days -{" "}
              {retreatSessions.length} Sessions
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowGlobalEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white text-sm uppercase tracking-wider hover:border-navy dark:hover:border-white transition-colors rounded cursor-pointer"
            >
              <Settings size={16} />
              Edit All Sessions
            </button>

            <DaySelector
              selectedDay={selectedDay}
              totalDays={retreat.totalDays}
              onDayChange={setSelectedDay}
            />
          </div>
        </div>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <CategoryAttendanceTable
          category={selectedCategory}
          day={selectedDay}
          sessions={retreatSessions}
          attendanceRecords={attendanceRecords}
          onSaveAttendance={handleSaveAttendance}
          onEditSession={handleEditSession}
          onDeleteClick={handleDeleteClick}
        />

        <EditSessionModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingSession(null);
          }}
          session={editingSession}
          onSave={handleSaveSession}
        />
      </div>

      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Session"
        message="Are you sure you want to delete this session? This will also delete any attendance records for this session."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default SessionsAndAttendanceTab;
