import axios from "axios";
import {
  Retreat,
  Registration,
  SessionTemplate,
  AttendanceRecord,
  RegistrationForm,
  AttendanceSession,
} from "@/types/interface/dashboard";
import { toast, Toaster } from "sonner";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Table from "@/components/dashboard/Table";
import { Plus, Edit, Trash2, X } from "lucide-react";
import SessionForm from "@/components/dashboard/forms/SessionForms";
import RegistrationsTable from "@/components/dashboard/RegistrationTable";
import EditRetreatForm from "@/components/dashboard/forms/EditRetreatForm";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import RegistrationModal from "@/components/dashboard/modals/RegistrationModal";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";
import CreateRetreatModal from "@/components/dashboard/modals/CreateRetreatModal";
import LoadingSkeleton from "@/components/dashboard/skeletons/page/RetreatsPageSkeleton";

const Retreats = () => {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "registrations" | "attendance"
  >("overview");

  const [retreatForm, setRetreatForm] = useState({
    year: new Date().getFullYear(),
    type: "Easter" as "Easter" | "December",
    status: "ongoing" as "ongoing" | "completed",
    totalDays: 1,
    dateFrom: "",
    dateTo: "",
    venue: "",
    theme: "",
  });

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState<RegistrationForm>({
    name: "",
    gender: "Male",
    address: "",
    phone: "",
    nationality: "",
    invitedBy: "Invited",
    category: "Adult",
    age: 18,
    dayRegistered: 1,
  });

  const [sessions, setSessions] = useState<AttendanceSession[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [deleteRetreatConfirm, setDeleteRetreatConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const [deleteRegistrationConfirm, setDeleteRegistrationConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  useEffect(() => {
    const fetchRetreats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/retreats");
        const retreatsData = Array.isArray(data) ? data : data.retreats || [];
        setRetreats(retreatsData);
      } catch (error: unknown) {
        console.error("Error fetching retreats:", error);
        toast.error("Failed to fetch retreats");
        setRetreats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRetreats();
  }, []);

  useEffect(() => {
    if (!selectedRetreat) return;

    const fetchRetreatData = async () => {
      try {
        const [regsRes, sessionsRes, recordsRes] = await Promise.all([
          axios.get(`/api/registrations?retreatId=${selectedRetreat._id}`),
          axios.get(
            `/api/attendance-sessions?retreatId=${selectedRetreat._id}`
          ),
          axios.get(`/api/attendance-records`),
        ]);

        const regsData = Array.isArray(regsRes.data)
          ? regsRes.data
          : regsRes.data.registrations || [];
        const sessionsData = Array.isArray(sessionsRes.data)
          ? sessionsRes.data
          : sessionsRes.data.sessions || [];
        const recordsData = Array.isArray(recordsRes.data)
          ? recordsRes.data
          : recordsRes.data.records || [];

        setRegistrations(regsData);
        setSessions(sessionsData);
        setAttendanceRecords(recordsData);
      } catch (error: unknown) {
        console.error("Error fetching retreat data:", error);
        toast.error("Failed to fetch retreat data");
      }
    };

    fetchRetreatData();
  }, [selectedRetreat]);

  const fetchRegistrations = async () => {
    if (!selectedRetreat) return;
    try {
      const { data } = await axios.get(
        `/api/registrations?retreatId=${selectedRetreat._id}`
      );
      const regsData = Array.isArray(data) ? data : data.registrations || [];
      setRegistrations(regsData);
    } catch (error: unknown) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to fetch registrations");
    }
  };

  const fetchSessions = async () => {
    if (!selectedRetreat) return;
    try {
      const { data } = await axios.get(
        `/api/attendance-sessions?retreatId=${selectedRetreat._id}`
      );
      const sessionsData = Array.isArray(data) ? data : data.sessions || [];
      setSessions(sessionsData);
    } catch (error: unknown) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    }
  };

  const fetchAttendanceRecords = async () => {
    if (!selectedRetreat) return;
    try {
      const { data } = await axios.get(`/api/attendance-records`);
      const recordsData = Array.isArray(data) ? data : data.records || [];
      setAttendanceRecords(recordsData);
    } catch (error: unknown) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const calculateDayDate = (dayNumber: number) => {
    if (!selectedRetreat) return new Date().toISOString().split("T")[0];
    const startDate = new Date(selectedRetreat.dateFrom);
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + (dayNumber - 1));
    return dayDate.toISOString().split("T")[0];
  };

  const handleGenerateSessions = async (
    sessionsPerFullDay: number,
    templates: SessionTemplate[]
  ) => {
    if (!selectedRetreat) return;

    try {
      const sessionsToCreate: Array<{
        retreatId: string;
        day: number;
        date: string;
        sessionName: string;
        sessionTime: string;
      }> = [];

      for (let day = 1; day <= selectedRetreat.totalDays; day++) {
        const dayDate = calculateDayDate(day);

        if (day === 1) {
          sessionsToCreate.push({
            retreatId: selectedRetreat._id,
            day: 1,
            date: dayDate,
            sessionName: "Evening Session",
            sessionTime: "6:00 PM - 8:00 PM",
          });
        } else if (day === selectedRetreat.totalDays) {
          sessionsToCreate.push({
            retreatId: selectedRetreat._id,
            day: selectedRetreat.totalDays,
            date: dayDate,
            sessionName: "Morning Session",
            sessionTime: "6:00 AM - 8:00 AM",
          });
        } else {
          templates.forEach((template) => {
            sessionsToCreate.push({
              retreatId: selectedRetreat._id,
              day,
              date: dayDate,
              sessionName: template.sessionName,
              sessionTime: template.sessionTime,
            });
          });
        }
      }

      await Promise.all(
        sessionsToCreate.map((session) =>
          axios.post("/api/attendance-sessions", session)
        )
      );

      toast.success("Sessions generated successfully");
      await fetchSessions();
    } catch (error: unknown) {
      console.error("Error generating sessions:", error);
      toast.error("Failed to generate sessions");
    }
  };

  const handleCreateRetreat = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/retreats", retreatForm);
      toast.success("Retreat created successfully");
      setShowCreateModal(false);
      resetRetreatForm();

      const { data } = await axios.get("/api/retreats");
      const retreatsData = Array.isArray(data) ? data : data.retreats || [];
      setRetreats(retreatsData);
    } catch (error: unknown) {
      console.error("Error creating retreat:", error);
      toast.error("Failed to create retreat");
    }
  };

  const handleUpdateRetreat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRetreat) return;
    try {
      await axios.patch(`/api/retreats/${selectedRetreat._id}`, retreatForm);
      toast.success("Retreat updated successfully");

      const [retreatsRes, retreatRes] = await Promise.all([
        axios.get("/api/retreats"),
        axios.get(`/api/retreats/${selectedRetreat._id}`),
      ]);

      const retreatsData = Array.isArray(retreatsRes.data)
        ? retreatsRes.data
        : retreatsRes.data.retreats || [];
      setRetreats(retreatsData);
      setSelectedRetreat(retreatRes.data);
    } catch (error: unknown) {
      console.error("Error updating retreat:", error);
      toast.error("Failed to update retreat");
    }
  };

  const confirmDeleteRetreat = async () => {
    if (!deleteRetreatConfirm.id) return;

    try {
      await axios.delete(`/api/retreats/${deleteRetreatConfirm.id}`);
      toast.success("Retreat deleted");

      const { data } = await axios.get("/api/retreats");
      const retreatsData = Array.isArray(data) ? data : data.retreats || [];
      setRetreats(retreatsData);

      if (selectedRetreat?._id === deleteRetreatConfirm.id) {
        setSelectedRetreat(null);
      }
    } catch (error: unknown) {
      console.error("Error deleting retreat:", error);
      toast.error("Failed to delete retreat");
    } finally {
      setDeleteRetreatConfirm({ isOpen: false, id: null });
    }
  };

  const handleCreateRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRetreat) return;
    try {
      await axios.post("/api/registrations", {
        ...regForm,
        retreatId: selectedRetreat._id,
      });
      toast.success("Registration added");
      setShowRegModal(false);
      resetRegForm();
      await fetchRegistrations();
    } catch (error: unknown) {
      console.error("Error creating registration:", error);
      toast.error("Failed to add registration");
    }
  };

  const confirmDeleteRegistration = async () => {
    if (!deleteRegistrationConfirm.id) return;

    try {
      await axios.delete(`/api/registrations/${deleteRegistrationConfirm.id}`);
      toast.success("Registration deleted");
      await fetchRegistrations();
    } catch (error: unknown) {
      console.error("Error deleting registration:", error);
      toast.error("Failed to delete registration");
    } finally {
      setDeleteRegistrationConfirm({ isOpen: false, id: null });
    }
  };

  const handleSaveAttendance = async (records: AttendanceRecord[]) => {
    try {
      await Promise.all(
        records.map((record) => axios.post("/api/attendance-records", record))
      );
      toast.success("Attendance saved successfully");
      await fetchAttendanceRecords();
    } catch (error: unknown) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance");
    }
  };

  const resetRetreatForm = () => {
    setRetreatForm({
      year: new Date().getFullYear(),
      type: "Easter",
      status: "ongoing",
      totalDays: 1,
      dateFrom: "",
      dateTo: "",
      venue: "",
      theme: "",
    });
  };

  const resetRegForm = () => {
    setRegForm({
      name: "",
      gender: "Male",
      address: "",
      phone: "",
      nationality: "",
      invitedBy: "Invited",
      category: "Adult",
      age: 18,
      dayRegistered: 1,
    });
  };

  const loadRetreatToForm = (retreat: Retreat) => {
    setRetreatForm({
      year: retreat.year,
      type: retreat.type,
      status: retreat.status,
      totalDays: retreat.totalDays,
      dateFrom: retreat.dateFrom.split("T")[0],
      dateTo: retreat.dateTo.split("T")[0],
      venue: retreat.venue,
      theme: retreat.theme || "",
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const retreatsColumns = [
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
              ? "bg-terracotta/20 text-terracotta"
              : "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400"
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
              setSelectedRetreat(row);
              loadRetreatToForm(row);
            }}
            className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteRetreatConfirm({
                isOpen: true,
                id: row._id,
              });
            }}
            className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Retreats">
      <Toaster position="top-right" richColors />
      <div>
        {!selectedRetreat ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
                  Retreats
                </h1>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {retreats.length} total retreats
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
              >
                <Plus size={20} />
                Create Retreat
              </button>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <Table
                columns={retreatsColumns}
                data={retreats}
                onRowClick={(retreat) => {
                  setSelectedRetreat(retreat);
                  loadRetreatToForm(retreat);
                }}
                emptyMessage="No retreats yet. Create your first retreat to get started."
              />
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold uppercase text-navy dark:text-white">
                {selectedRetreat.year} {selectedRetreat.type} Retreat
              </h1>
              <button
                onClick={() => {
                  setSelectedRetreat(null);
                  setActiveTab("overview");
                  resetRetreatForm();
                }}
                className="flex items-center gap-2 px-4 py-2 text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
                Close
              </button>
            </div>

            <div className="border-b border-black/10 dark:border-white/10 mb-8">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === "overview"
                      ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                      : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("registrations")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === "registrations"
                      ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                      : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  Registrations
                </button>
                <button
                  onClick={() => setActiveTab("attendance")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === "attendance"
                      ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                      : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  Sessions & Attendance
                </button>
              </div>
            </div>

            <div>
              {activeTab === "overview" && (
                <EditRetreatForm
                  onSubmit={handleUpdateRetreat}
                  form={retreatForm}
                  setForm={setRetreatForm}
                />
              )}

              {activeTab === "registrations" && (
                <RegistrationsTable
                  registrations={registrations}
                  onAdd={() => setShowRegModal(true)}
                  onDelete={(id) =>
                    setDeleteRegistrationConfirm({ isOpen: true, id })
                  }
                />
              )}

              {activeTab === "attendance" && (
                <SessionForm
                  totalDays={selectedRetreat.totalDays}
                  retreatDateFrom={selectedRetreat.dateFrom}
                  retreatId={selectedRetreat._id}
                  sessions={sessions}
                  attendanceRecords={attendanceRecords}
                  onGenerateSessions={handleGenerateSessions}
                  onSaveAttendance={handleSaveAttendance}
                />
              )}
            </div>
          </>
        )}

        <CreateRetreatModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            resetRetreatForm();
          }}
          onSubmit={handleCreateRetreat}
          form={retreatForm}
          setForm={setRetreatForm}
        />

        <RegistrationModal
          isOpen={showRegModal}
          onClose={() => {
            setShowRegModal(false);
            resetRegForm();
          }}
          onSubmit={handleCreateRegistration}
          form={regForm}
          setForm={setRegForm}
          totalDays={selectedRetreat?.totalDays || 1}
        />

        <ConfirmationModal
          isOpen={deleteRetreatConfirm.isOpen}
          onClose={() => setDeleteRetreatConfirm({ isOpen: false, id: null })}
          onConfirm={confirmDeleteRetreat}
          title="Delete Retreat"
          message="Are you sure you want to delete this retreat? This will also delete all registrations and sessions."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <ConfirmationModal
          isOpen={deleteRegistrationConfirm.isOpen}
          onClose={() =>
            setDeleteRegistrationConfirm({ isOpen: false, id: null })
          }
          onConfirm={confirmDeleteRegistration}
          title="Delete Registration"
          message="Are you sure you want to delete this registration?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </DashboardLayout>
  );
};

export default Retreats;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
