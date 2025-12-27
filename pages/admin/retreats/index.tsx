import axios from "axios";
import { toast, Toaster } from "sonner";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Retreat } from "@/types/interface/dashboard";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";

export default function Retreats() {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "registrations" | "attendance"
  >("overview");

  useEffect(() => {
    fetchRetreats();
  }, []);

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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout title="Retreats">
      <Toaster position="top-right" richColors />
      <div className="max-w-7xl">
        {!selectedRetreat ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold uppercase text-navy dark:text-white mb-2">
                  Retreats
                </h1>
                <p className="text-lg text-black/60 dark:text-white/60">
                  {retreats.length} total retreats
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded">
                <Plus size={20} />
                Create Retreat
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-warm-gray dark:bg-navy/50 p-6 rounded-lg h-32 animate-pulse"
                  />
                ))}
              </div>
            ) : retreats.length === 0 ? (
              <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-12 rounded-lg text-center">
                <p className="text-black/60 dark:text-white/60 text-lg">
                  No retreats yet. Create your first retreat to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {retreats.map((retreat) => (
                  <div
                    key={retreat._id}
                    className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-6 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedRetreat(retreat)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold uppercase text-navy dark:text-white mb-2">
                          {retreat.title}
                        </h3>
                        <p className="text-black/60 dark:text-white/60 mb-4">
                          {retreat.description}
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div>
                            <span className="uppercase tracking-wider text-burgundy font-bold block mb-1">
                              Location
                            </span>
                            <span className="text-black/70 dark:text-white/70">
                              {retreat.location}
                            </span>
                          </div>
                          <div>
                            <span className="uppercase tracking-wider text-burgundy font-bold block mb-1">
                              Dates
                            </span>
                            <span className="text-black/70 dark:text-white/70">
                              {formatDate(retreat.startDate)} -{" "}
                              {formatDate(retreat.endDate)}
                            </span>
                          </div>
                          <div>
                            <span className="uppercase tracking-wider text-burgundy font-bold block mb-1">
                              Duration
                            </span>
                            <span className="text-black/70 dark:text-white/70">
                              {retreat.totalDays} days
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold uppercase text-navy dark:text-white">
                {selectedRetreat.title}
              </h1>
              <button
                onClick={() => {
                  setSelectedRetreat(null);
                  setActiveTab("overview");
                }}
                className="flex items-center gap-2 px-4 py-2 text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors"
              >
                <X size={20} />
                Close
              </button>
            </div>

            <div className="border-b border-black/10 dark:border-white/10 mb-8">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors ${
                    activeTab === "overview"
                      ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                      : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("registrations")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors ${
                    activeTab === "registrations"
                      ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                      : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  Registrations
                </button>
                <button
                  onClick={() => setActiveTab("attendance")}
                  className={`pb-4 text-sm uppercase tracking-wider transition-colors ${
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
                <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
                  <h2 className="text-xl font-bold uppercase text-navy dark:text-white mb-6">
                    Retreat Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
                        Title
                      </label>
                      <p className="text-black/70 dark:text-white/70">
                        {selectedRetreat.title}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
                        Description
                      </label>
                      <p className="text-black/70 dark:text-white/70">
                        {selectedRetreat.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
                          Location
                        </label>
                        <p className="text-black/70 dark:text-white/70">
                          {selectedRetreat.location}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
                          Start Date
                        </label>
                        <p className="text-black/70 dark:text-white/70">
                          {formatDate(selectedRetreat.startDate)}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-burgundy font-bold mb-2">
                          End Date
                        </label>
                        <p className="text-black/70 dark:text-white/70">
                          {formatDate(selectedRetreat.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "registrations" && (
                <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold uppercase text-navy dark:text-white">
                      Registrations
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded">
                      <Plus size={16} />
                      Add Registration
                    </button>
                  </div>
                  <p className="text-black/60 dark:text-white/60">
                    No registrations yet
                  </p>
                </div>
              )}

              {activeTab === "attendance" && (
                <div className="bg-warm-gray dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
                  <h2 className="text-xl font-bold uppercase text-navy dark:text-white mb-6">
                    Sessions & Attendance
                  </h2>
                  <p className="text-black/60 dark:text-white/60">
                    No sessions yet
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
