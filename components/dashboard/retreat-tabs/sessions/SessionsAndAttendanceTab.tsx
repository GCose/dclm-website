import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
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
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const setupMode = sessions.length === 0;

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
            (day === 1 && sessionNumber === templates.length) ||
            (day === retreat.totalDays && sessionNumber === 1) ||
            sessionNumber === 3;

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

      await Promise.all(
        sessionsToCreate.map((session) =>
          axios.post("/api/attendance-sessions", session)
        )
      );

      toast.success("Sessions generated successfully");
      onRefresh();
    } catch (error: unknown) {
      console.error("Error generating sessions:", error);
      toast.error("Failed to generate sessions");
    }
  };

  const handleSaveAttendance = async (records: Partial<AttendanceRecord>[]) => {
    try {
      await Promise.all(
        records.map((record) => axios.post("/api/attendance-records", record))
      );
      toast.success("Attendance saved successfully");
      onRefresh();
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
      onRefresh();
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
      onRefresh();
    } catch (error: unknown) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
  };

  if (setupMode) {
    return (
      <SessionSetupForm
        totalDays={retreat.totalDays}
        onGenerate={handleGenerateSessions}
      />
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
              {retreat.year} {retreat.type} Retreat - {retreat.totalDays} Days
            </p>
          </div>

          <DaySelector
            selectedDay={selectedDay}
            totalDays={retreat.totalDays}
            onDayChange={setSelectedDay}
          />
        </div>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <CategoryAttendanceTable
          category={selectedCategory}
          day={selectedDay}
          sessions={sessions}
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
