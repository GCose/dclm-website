import axios from "axios";
import Head from "next/head";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Modal from "@/components/dashboard/Modal";
import EventCard from "@/components/dashboard/EventCard";
import EventForm from "@/components/dashboard/EventForm";
import Navigation from "@/components/website/layout/Navigation";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import {
  Event,
  EventFormData,
  EventSubmitData,
  PaginationData,
  EventsResponse,
} from "@/types";

const CreateEvent = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    eventId: string | null;
  }>({ isOpen: false, eventId: null });

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    venue: "",
    image: "",
    description: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchEvents(pagination.page);
    }
  }, [authenticated, pagination.page]);

  const checkAuth = async () => {
    try {
      await axios.get("/api/auth-status");
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchEvents = async (page: number = 1) => {
    try {
      const { data } = await axios.get<EventsResponse>(
        `/api/events?page=${page}&limit=15`
      );
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const loginToast = toast.loading("Logging in...");

    try {
      await axios.post("/api/auth", { email, password });
      setAuthenticated(true);
      toast.success("Logged in successfully", { id: loginToast });
    } catch (error) {
      toast.error("Invalid credentials", { id: loginToast });
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    const logoutToast = toast.loading("Logging out...");

    try {
      await axios.post("/api/logout");
      setAuthenticated(false);
      toast.success("Logged out successfully", { id: logoutToast });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout", { id: logoutToast });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      venue: "",
      image: "",
      description: "",
      dateFrom: "",
      dateTo: "",
      timeFrom: "",
      timeTo: "",
    });
  };

  const handleFormChange = (field: keyof EventFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadToast = toast.loading("Uploading image...");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "dclm-events");

      const { data } = await axios.post(
        "https://jeetix-file-service.onrender.com/api/storage/upload",
        uploadFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status === "success") {
        setFormData({ ...formData, image: data.data.fileUrl });
        toast.success("Image uploaded successfully", { id: uploadToast });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image", { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    const createToast = toast.loading("Creating event...");

    try {
      const submitData: EventSubmitData = {
        title: formData.title,
        venue: formData.venue,
        image: formData.image,
        description: formData.description,
        dateFrom: formData.dateFrom,
        timeFrom: formData.timeFrom,
      };

      if (formData.dateTo) submitData.dateTo = formData.dateTo;
      if (formData.timeTo) submitData.timeTo = formData.timeTo;

      await axios.post("/api/events", submitData);
      resetForm();
      setShowCreateModal(false);
      fetchEvents(pagination.page);
      toast.success("Event created successfully", { id: createToast });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event", { id: createToast });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    const updateToast = toast.loading("Updating event...");

    try {
      const submitData: EventSubmitData = {
        title: formData.title,
        venue: formData.venue,
        image: formData.image,
        description: formData.description,
        dateFrom: formData.dateFrom,
        timeFrom: formData.timeFrom,
      };

      if (formData.dateTo) submitData.dateTo = formData.dateTo;
      if (formData.timeTo) submitData.timeTo = formData.timeTo;

      await axios.patch(`/api/events/${editingEvent._id}`, submitData);
      resetForm();
      setShowEditModal(false);
      setEditingEvent(null);
      fetchEvents(pagination.page);
      toast.success("Event updated successfully", { id: updateToast });
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event", { id: updateToast });
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      venue: event.venue,
      image: event.image,
      description: event.description || "",
      dateFrom: event.dateFrom.split("T")[0],
      dateTo: event.dateTo ? event.dateTo.split("T")[0] : "",
      timeFrom: event.timeFrom,
      timeTo: event.timeTo || "",
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, eventId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.eventId) return;

    const deleteToast = toast.loading("Deleting event...");

    try {
      await axios.delete(`/api/events/${deleteConfirm.eventId}`);
      fetchEvents(pagination.page);
      toast.success("Event deleted successfully", { id: deleteToast });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event", { id: deleteToast });
    } finally {
      setDeleteConfirm({ isOpen: false, eventId: null });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === pagination.page) return;
    setPagination({ ...pagination, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-2xl text-black/40">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | DCLM Brikama</title>
        </Head>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-heading text-center mb-8">
              Admin Login
            </h1>
            <form
              onSubmit={handleLogin}
              className="space-y-6 bg-off-white p-8 rounded-lg"
            >
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-terracotta text-white py-3 uppercase cursor-pointer tracking-widest hover:bg-terracotta/90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Events | DCLM Brikama</title>
      </Head>
      <Toaster position="top-right" richColors />
      <Navigation />
      <div className="min-h-screen pt-32 pb-20 px-8 bg-cream">
        <div className="w-full">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h1 className="text-[clamp(3rem,6vw,5rem)] font-heading leading-tight">
                Event Archive
              </h1>
              <p className="text-lg text-black/60 mt-2">
                {pagination.total} total events
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-terracotta text-white text-sm uppercase tracking-widest cursor-pointer hover:bg-terracotta/90 transition-colors"
              >
                New Event
              </button>
              <button
                onClick={handleLogout}
                className="px-8 py-4 bg-navy text-white text-sm uppercase tracking-widest cursor-pointer hover:bg-navy/90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-black/40">No events yet</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                {events.map((event) => (
                  <div key={event._id}>
                    <EventCard
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      venue={event.venue}
                      dateFrom={event.dateFrom}
                      dateTo={event.dateTo}
                      timeFrom={event.timeFrom}
                      timeTo={event.timeTo}
                    />
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openEditModal(event)}
                        className="flex-1 px-6 py-3 border border-black text-black text-xs uppercase tracking-wider cursor-pointer hover:bg-black hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(event._id)}
                        className="flex-1 px-6 py-3 bg-black text-white text-xs uppercase tracking-wider cursor-pointer hover:bg-black/80 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-20">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-6 py-3 border border-black text-black text-sm uppercase tracking-wider cursor-pointer hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 border border-black text-sm uppercase cursor-pointer transition-colors ${
                          page === pagination.page
                            ? "bg-black text-white"
                            : "text-black hover:bg-black hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-6 py-3 border border-black text-black text-sm uppercase tracking-wider cursor-pointer hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          <Modal
            isOpen={showCreateModal}
            onClose={() => {
              setShowCreateModal(false);
              resetForm();
            }}
            title="CREATE EVENT"
          >
            <EventForm
              formData={formData}
              onSubmit={handleCreateSubmit}
              onChange={handleFormChange}
              onImageUpload={handleImageUpload}
              onCancel={() => {
                setShowCreateModal(false);
                resetForm();
              }}
              loading={loading}
              uploading={uploading}
              submitText="Create Event"
            />
          </Modal>

          <Modal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditingEvent(null);
              resetForm();
            }}
            title="EDIT EVENT"
          >
            <EventForm
              formData={formData}
              onSubmit={handleEditSubmit}
              onChange={handleFormChange}
              onImageUpload={handleImageUpload}
              onCancel={() => {
                setShowEditModal(false);
                setEditingEvent(null);
                resetForm();
              }}
              loading={loading}
              uploading={uploading}
              submitText="Update Event"
            />
          </Modal>

          <ConfirmationModal
            isOpen={deleteConfirm.isOpen}
            onClose={() => setDeleteConfirm({ isOpen: false, eventId: null })}
            onConfirm={confirmDelete}
            title="Delete Event"
            message="Are you sure you want to delete this event? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
