import { Toaster, toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import {
  Retreat,
  Registration,
  RegistrationForm,
  RegistrationFilters,
  RetreatFilters,
} from "@/types/interface/dashboard";
import { Plus, X } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { useDebounce } from "@/hooks/usedebounce";
import { formatDate } from "@/utils/retreats/helpers";
import useRetreat from "@/hooks/retreats/use-retreat";
import Table from "@/components/dashboard/tables/Table";
import { useRegistrations } from "@/hooks/use-registrations";
import { getRetreatsColumns } from "@/utils/retreats/columns";
import { useRetreatsData } from "@/hooks/retreats/use-retreats-data";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import RegistrationModal from "@/components/dashboard/modals/RegistrationModal";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";
import CreateRetreatModal from "@/components/dashboard/modals/CreateRetreatModal";
import EditRetreatModal from "@/components/dashboard/modals/EditRetreatModal";
import OverviewTab from "@/components/dashboard/retreat-tabs/Overviewtab";
import RegistrationsTab from "@/components/dashboard/retreat-tabs/RegistrationsTab";
import { useRegistrationHandlers } from "@/hooks/retreats/use-registration-handlers";
import EditRegistrationModal from "@/components/dashboard/modals/EditRegistrationModal";
import RetreatsPageSkeleton from "@/components/dashboard/skeletons/page/RetreatsPageSkeleton";
import SessionsAndAttendanceTab from "@/components/dashboard/retreat-tabs/sessions/SessionsAndAttendanceTab";
import { generateRetreatPDF } from "@/utils/retreats/pdf-generator";
import { useReportData } from "@/hooks/retreats/use-report-data";

const Retreats = () => {
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [editingRetreat, setEditingRetreat] = useState<Retreat | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditRetreatModal, setShowEditRetreatModal] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "registrations" | "attendance"
  >("overview");

  const [retreatForm, setRetreatForm] = useState({
    year: new Date().getFullYear(),
    type: "Easter" as "Easter" | "December",
    totalDays: 1,
    dateFrom: "",
    dateTo: "",
    venue: "",
    theme: "",
  });

  const [retreatFilters, setRetreatFilters] = useState<RetreatFilters>({
    year: "",
    type: "",
  });

  const [showRegModal, setShowRegModal] = useState(false);
  const [showEditRegModal, setShowEditRegModal] = useState(false);
  const [editingRegistration, setEditingRegistration] =
    useState<Registration | null>(null);
  const [regForm, setRegForm] = useState<RegistrationForm>({
    name: "",
    gender: "Male",
    location: "",
    phone: "",
    nationality: "",
    invitedBy: "Invited",
    category: "Adult",
    age: "",
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
    uniqueYears,
    sessions,
    attendanceRecords,
    fetchRetreats,
    fetchSessions,
    fetchAttendanceRecords,
  } = useRetreatsData(selectedRetreat, retreatFilters);

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

  const { reportData } = useReportData(
    selectedRetreat
      ? {
          retreatId: selectedRetreat._id,
          year: selectedRetreat.year,
          type: selectedRetreat.type,
          dateFrom: selectedRetreat.dateFrom,
          dateTo: selectedRetreat.dateTo,
          venue: selectedRetreat.venue,
          theme: selectedRetreat.theme,
          totalDays: selectedRetreat.totalDays,
        }
      : null
  );

  const { handleCreateRetreat, confirmDeleteRetreat } = useRetreat(
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

  const handleRefreshSessions = async () => {
    await fetchSessions();
    await fetchAttendanceRecords();
  };

  const handleGeneratePDF = async () => {
    if (!reportData) {
      toast.error("Report data not available");
      return;
    }

    setGeneratingPDF(true);
    try {
      await generateRetreatPDF(reportData);
      toast.success("PDF report generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleEditRetreatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRetreat) return;

    try {
      await axios.patch(`/api/retreats/${editingRetreat._id}`, retreatForm);
      toast.success("Retreat updated successfully");
      setShowEditRetreatModal(false);
      setEditingRetreat(null);
      resetRetreatForm();
      fetchRetreats(retreatsPage);
    } catch (error: unknown) {
      console.error("Error updating retreat:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to update retreat");
      }
    }
  };

  const resetRetreatForm = () => {
    setRetreatForm({
      year: new Date().getFullYear(),
      type: "Easter",
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
      location: "",
      phone: "",
      nationality: "",
      invitedBy: "Invited",
      category: "Adult",
      age: "",
      dayRegistered: 1,
    });
  };

  const loadRetreatToForm = (retreat: Retreat) => {
    setRetreatForm({
      year: retreat.year,
      type: retreat.type,
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

  const handleRetreatFiltersChange = (filters: RetreatFilters) => {
    setRetreatFilters(filters);
    setRetreatsPage(1);
  };

  const clearRetreatFilters = () => {
    setRetreatFilters({
      year: "",
      type: "",
    });
  };

  const hasActiveRetreatFilters = retreatFilters.year || retreatFilters.type;

  const retreatsColumns = getRetreatsColumns(
    formatDate,
    (retreat) => {
      setEditingRetreat(retreat);
      loadRetreatToForm(retreat);
      setShowEditRetreatModal(true);
    },
    (id) => setDeleteRetreatConfirm({ isOpen: true, id })
  );

  return (
    <DashboardLayout title="Retreats">
      <Toaster position="top-right" richColors />
      <div>
        {!selectedRetreat ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
                  Retreats
                </h1>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded cursor-pointer"
              >
                <Plus size={20} />
                Create Retreat
              </button>
            </div>

            <div className="bg-white dark:bg-navy/50 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                    Year
                  </label>
                  <select
                    value={retreatFilters.year}
                    onChange={(e) =>
                      handleRetreatFiltersChange({
                        ...retreatFilters,
                        year: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
                  >
                    <option value="">All</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                    Type
                  </label>
                  <select
                    value={retreatFilters.type}
                    onChange={(e) =>
                      handleRetreatFiltersChange({
                        ...retreatFilters,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white rounded cursor-pointer"
                  >
                    <option value="">All</option>
                    <option value="Easter">Easter</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearRetreatFilters}
                    disabled={!hasActiveRetreatFilters}
                    className="w-full flex items-center border justify-center gap-2 px-4 py-2 text-sm text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <RetreatsPageSkeleton />
            ) : (
              <Table
                columns={retreatsColumns}
                data={retreats}
                onRowClick={(retreat) => {
                  setSelectedRetreat(retreat);
                  loadRetreatToForm(retreat);
                  setActiveTab("overview");
                }}
                pagination={{
                  page: retreatsPage,
                  totalPages: retreatsTotalPages,
                  total: retreatsTotal,
                  onPageChange: setRetreatsPage,
                }}
                emptyMessage="No retreats found"
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
                className="flex items-center gap-2 px-4 py-2 text-navy cursor-pointer border border-navy dark:border-white/50 dark:hover:border-white/80 rounded-sm hover:bg-navy hover:text-white dark:text-white/60 dark:hover:text-white transition-colors uppercase"
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
                <OverviewTab
                  retreat={selectedRetreat}
                  onGeneratePDF={handleGeneratePDF}
                  generatingPDF={generatingPDF}
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
                <SessionsAndAttendanceTab
                  retreat={selectedRetreat}
                  sessions={sessions}
                  attendanceRecords={attendanceRecords}
                  onRefresh={handleRefreshSessions}
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

        <EditRetreatModal
          isOpen={showEditRetreatModal}
          onClose={() => {
            setShowEditRetreatModal(false);
            setEditingRetreat(null);
            resetRetreatForm();
          }}
          onSubmit={handleEditRetreatSubmit}
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
