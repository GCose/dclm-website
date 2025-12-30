import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import {
  Category,
  AttendanceSession,
  AttendanceRecord,
  SessionsAndAttendanceTabProps,
  CategorySessionTemplate,
} from "@/types/interface/dashboard";
import DaySelector from "./DaySelector";
import CategoryTabs from "./CategoryTabs";
import { calculateDayDate } from "@/utils/retreats/helpers";
import EditSessionModal from "../../modals/EditSessionModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import CategoryAttendanceTable from "../../tables/CategoryAttendanceTable";
import SessionCountsStep from "./SessionCountsStep";
import CategorySessionDefineStep from "./CategorySessionDefineStep";

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

  const [setupStep, setSetupStep] = useState<"counts" | "define">("counts");
  const [editMode, setEditMode] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [sessionCounts, setSessionCounts] = useState<Record<Category, number>>({
    Adult: 7,
    Campus: 8,
    Youth: 6,
    Children: 7,
  });

  const [categoryTemplates, setCategoryTemplates] = useState<
    Record<Category, CategorySessionTemplate[]>
  >({
    Adult: [],
    Campus: [],
    Youth: [],
    Children: [],
  });

  const retreatSessions = sessions.filter((s) => s.retreatId === retreat._id);
  const setupMode = retreatSessions.length === 0;

  useEffect(() => {
    if (setupMode) {
      const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];
      const emptyTemplates: Record<Category, CategorySessionTemplate[]> = {
        Adult: [],
        Campus: [],
        Youth: [],
        Children: [],
      };

      categories.forEach((category) => {
        const count = sessionCounts[category];
        emptyTemplates[category] = Array.from({ length: count }, (_, i) => ({
          sessionNumber: i + 1,
          startTime: "",
          endTime: "",
          name: "",
        }));
      });

      setCategoryTemplates(emptyTemplates);
    }
  }, [setupMode, sessionCounts]);

  const extractExistingData = () => {
    const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];
    const counts: Record<Category, number> = {
      Adult: 0,
      Campus: 0,
      Youth: 0,
      Children: 0,
    };
    const templates: Record<Category, CategorySessionTemplate[]> = {
      Adult: [],
      Campus: [],
      Youth: [],
      Children: [],
    };

    categories.forEach((category) => {
      const categorySessions = retreatSessions
        .filter((s) => s.category === category)
        .sort((a, b) => a.sessionNumber - b.sessionNumber);

      const uniqueSessions = Array.from(
        new Set(categorySessions.map((s) => s.sessionNumber))
      ).sort((a, b) => a - b);

      counts[category] = uniqueSessions.length;

      templates[category] = uniqueSessions.map((sessionNum) => {
        const session = categorySessions.find(
          (s) => s.sessionNumber === sessionNum
        );
        if (!session) {
          return {
            sessionNumber: sessionNum,
            startTime: "",
            endTime: "",
            name: "",
          };
        }

        const [start, end] = session.sessionTime.split(" - ");
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
          name: session.sessionName,
        };
      });
    });

    setSessionCounts(counts);
    setCategoryTemplates(templates);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleCountsNext = () => {
    const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];
    const newTemplates: Record<Category, CategorySessionTemplate[]> = {
      Adult: [],
      Campus: [],
      Youth: [],
      Children: [],
    };

    categories.forEach((category) => {
      const count = sessionCounts[category];
      const existing = categoryTemplates[category] || [];
      newTemplates[category] = Array.from({ length: count }, (_, i) => {
        if (existing[i]) return existing[i];
        return {
          sessionNumber: i + 1,
          startTime: "",
          endTime: "",
          name: "",
        };
      });
    });

    setCategoryTemplates(newTemplates);
    setSetupStep("define");
  };

  const handleTemplatesChange = (
    category: Category,
    templates: CategorySessionTemplate[]
  ) => {
    setCategoryTemplates({
      ...categoryTemplates,
      [category]: templates,
    });
    setSessionCounts({
      ...sessionCounts,
      [category]: templates.length,
    });
  };

  const handleGenerateSessions = async () => {
    setGenerating(true);
    try {
      const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];
      const sessionsToCreate: Omit<
        AttendanceSession,
        "_id" | "createdAt" | "updatedAt"
      >[] = [];

      for (let day = 1; day <= retreat.totalDays; day++) {
        const dayDate = calculateDayDate(retreat, day);

        categories.forEach((category) => {
          const templates = categoryTemplates[category];

          templates.forEach((template, index) => {
            const sessionNumber = template.sessionNumber;
            const isFirstDay = day === 1;
            const isLastDay = day === retreat.totalDays;
            const isLastSession = index === templates.length - 1;
            const isFirstSession = index === 0;

            if (isFirstDay && !isLastSession) return;
            if (isLastDay && !isFirstSession) return;

            const isGSMessage =
              sessionNumber === 1 ||
              sessionNumber === 3 ||
              sessionNumber === templates.length;

            const sessionTime = `${formatTime(
              template.startTime
            )} - ${formatTime(template.endTime)}`;

            sessionsToCreate.push({
              retreatId: retreat._id,
              category,
              sessionNumber,
              day,
              date: dayDate,
              sessionName: template.name,
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

      toast.success(
        `Generated ${sessionsToCreate.length} sessions successfully`
      );
      setEditMode(false);
      await onRefresh();
    } catch (error: unknown) {
      console.error("Error generating sessions:", error);
      toast.error("Failed to generate sessions");
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdateSessions = async () => {
    setGenerating(true);
    try {
      await Promise.all(
        retreatSessions.map((session) =>
          axios.delete(`/api/attendance-sessions/${session._id}`)
        )
      );

      await handleGenerateSessions();
    } catch (error: unknown) {
      console.error("Error updating sessions:", error);
      toast.error("Failed to update sessions");
      setGenerating(false);
    }
  };

  const handleEditSessions = () => {
    extractExistingData();
    setEditMode(true);
    setSetupStep("define");
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

  if (setupMode || editMode) {
    if (setupMode && setupStep === "counts") {
      return (
        <SessionCountsStep
          counts={sessionCounts}
          onCountsChange={setSessionCounts}
          onNext={handleCountsNext}
        />
      );
    }

    return (
      <CategorySessionDefineStep
        counts={sessionCounts}
        categoryTemplates={categoryTemplates}
        onTemplatesChange={handleTemplatesChange}
        onGenerate={editMode ? handleUpdateSessions : handleGenerateSessions}
        onBack={() => {
          if (editMode) {
            setEditMode(false);
          } else {
            setSetupStep("counts");
          }
        }}
        generating={generating}
        editMode={editMode}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div>
            <h2 className="text-[clamp(1.1rem,3vw,1.4rem)] font-bold uppercase text-navy dark:text-white">
              Sessions & Attendance
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEditSessions}
              className="flex items-center gap-2 px-4 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white text-sm uppercase tracking-wider hover:border-navy dark:hover:border-white transition-colors rounded cursor-pointer"
            >
              <Settings size={16} />
              Edit Sessions
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
