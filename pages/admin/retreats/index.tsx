import { Toaster } from "sonner";
import { useState } from "react";
import {
  Retreat,
  Registration,
  RegistrationForm,
  RegistrationFilters,
} from "@/types/interface/dashboard";
import { Plus, X } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Table from "@/components/dashboard/Table";
import { useDebounce } from "@/hooks/usedebounce";
import { formatDate } from "@/utils/retreats/helpers";
import useRetreat from "@/hooks/retreats/use-retreat";
import useSession from "@/hooks/retreats/use-sessions";
import { useRegistrations } from "@/hooks/use-registrations";
import { getRetreatsColumns } from "@/utils/retreats/columns";
import SessionForm from "@/components/dashboard/forms/SessionForms";
import { useRetreatsData } from "@/hooks/retreats/use-retreats-data";
import EditRetreatForm from "@/components/dashboard/forms/EditRetreatForm";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import RegistrationModal from "@/components/dashboard/modals/RegistrationModal";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";
import CreateRetreatModal from "@/components/dashboard/modals/CreateRetreatModal";
import RegistrationsTab from "@/components/dashboard/retreat-tabs/RegistrationsTab";
import { useRegistrationHandlers } from "@/hooks/retreats/use-registration-handlers";
import EditRegistrationModal from "@/components/dashboard/modals/EditRegistrationModal";
import LoadingSkeleton from "@/components/dashboard/skeletons/page/RetreatsPageSkeleton";

const Retreats = () => {
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "registrations" | "attendance"
  >("registrations");

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

  const [showRegModal, setShowRegModal] = useState(false);
  const [showEditRegModal, setShowEditRegModal] = useState(false);
  const [editingRegistration, setEditingRegistration] =
    useState<Registration | null>(null);
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

  const [regPage, setRegPage] = useState(1);
  const [regFilters, setRegFilters] = useState<RegistrationFilters>({
    search: "",
    gender: "",
    category: "",
    nationality: "",
    invitedBy: "",
    dayRegistered: "",
  });

  const debouncedSearch = useDebounce(regFilters.search, 500);

  const debouncedFilters = {
    ...regFilters,
    search: debouncedSearch,
  };

  const [deleteRetreatConfirm, setDeleteRetreatConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const [deleteRegistrationConfirm, setDeleteRegistrationConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const {
    retreats,
    loading,
    retreatsPage,
    setRetreatsPage,
    retreatsTotalPages,
    retreatsTotal,
    sessions,
    attendanceRecords,
    fetchRetreats,
    fetchSessions,
    fetchAttendanceRecords,
  } = useRetreatsData(selectedRetreat);

  const {
    registrations,
    total: regTotal,
    totalPages: regTotalPages,
    isLoading: regLoading,
    refresh: refreshRegistrations,
  } = useRegistrations({
    retreatId: selectedRetreat?._id || null,
    page: regPage,
    filters: debouncedFilters,
  });

  const { handleCreateRetreat, handleUpdateRetreat, confirmDeleteRetreat } =
    useRetreat(
      fetchRetreats,
      retreatsPage,
      setSelectedRetreat,
      selectedRetreat
    );

  const {
    handleCreateRegistration,
    handleEditRegistration,
    handleUpdateRegistration,
    confirmDeleteRegistration,
  } = useRegistrationHandlers(selectedRetreat, refreshRegistrations);

  const { handleGenerateSessions, handleSaveAttendance } = useSession(
    selectedRetreat,
    fetchSessions,
    fetchAttendanceRecords
  );

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

  const handleFiltersChange = (filters: RegistrationFilters) => {
    setRegFilters(filters);
    setRegPage(1);
  };

  const retreatsColumns = getRetreatsColumns(
    formatDate,
    (retreat) => {
      setSelectedRetreat(retreat);
      loadRetreatToForm(retreat);
    },
    (id) => setDeleteRetreatConfirm({ isOpen: true, id })
  );

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
                  {retreatsTotal} total retreats
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
                pagination={{
                  page: retreatsPage,
                  totalPages: retreatsTotalPages,
                  total: retreatsTotal,
                  onPageChange: setRetreatsPage,
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
                  onSubmit={(e) => handleUpdateRetreat(e, retreatForm)}
                  form={retreatForm}
                  setForm={setRetreatForm}
                />
              )}

              {activeTab === "registrations" && (
                <RegistrationsTab
                  registrations={registrations}
                  total={regTotal}
                  loading={regLoading}
                  filters={regFilters}
                  pagination={{
                    page: regPage,
                    totalPages: regTotalPages,
                    total: regTotal,
                    onPageChange: setRegPage,
                  }}
                  onFiltersChange={handleFiltersChange}
                  onAdd={() => setShowRegModal(true)}
                  onEdit={(reg) =>
                    handleEditRegistration(
                      reg,
                      setEditingRegistration,
                      setRegForm,
                      setShowEditRegModal
                    )
                  }
                  onDelete={(id) =>
                    setDeleteRegistrationConfirm({ isOpen: true, id })
                  }
                  onRefresh={refreshRegistrations}
                  totalDays={selectedRetreat.totalDays}
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
          onSubmit={(e) =>
            handleCreateRetreat(
              e,
              retreatForm,
              resetRetreatForm,
              setShowCreateModal
            )
          }
          form={retreatForm}
          setForm={setRetreatForm}
        />

        <RegistrationModal
          isOpen={showRegModal}
          onClose={() => {
            setShowRegModal(false);
            resetRegForm();
          }}
          onSubmit={(e) =>
            handleCreateRegistration(e, regForm, setShowRegModal, resetRegForm)
          }
          form={regForm}
          setForm={setRegForm}
          totalDays={selectedRetreat?.totalDays || 1}
        />

        <EditRegistrationModal
          isOpen={showEditRegModal}
          onClose={() => {
            setShowEditRegModal(false);
            setEditingRegistration(null);
            resetRegForm();
          }}
          onSubmit={(e) =>
            handleUpdateRegistration(
              e,
              editingRegistration,
              regForm,
              setShowEditRegModal,
              setEditingRegistration,
              resetRegForm
            )
          }
          form={regForm}
          setForm={setRegForm}
          totalDays={selectedRetreat?.totalDays || 1}
        />

        <ConfirmationModal
          isOpen={deleteRetreatConfirm.isOpen}
          onClose={() => setDeleteRetreatConfirm({ isOpen: false, id: null })}
          onConfirm={() =>
            confirmDeleteRetreat(deleteRetreatConfirm, setDeleteRetreatConfirm)
          }
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
          onConfirm={() =>
            confirmDeleteRegistration(
              deleteRegistrationConfirm,
              setDeleteRegistrationConfirm
            )
          }
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
