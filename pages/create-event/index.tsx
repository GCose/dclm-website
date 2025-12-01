import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navigation from "@/components/website/layout/Navigation";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import EventForm from "@/components/dashboard/EventForm";
import Modal from "@/components/dashboard/Modal";

interface Event {
  _id: string;
  title: string;
  venue: string;
  image: string;
  description?: string;
  dateFrom: string;
  dateTo?: string;
  timeFrom: string;
  timeTo?: string;
  createdAt: string;
}

interface EventFormData {
  title: string;
  venue: string;
  image: string;
  description: string;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
}

interface EventSubmitData {
  title: string;
  venue: string;
  image: string;
  description: string;
  dateFrom: string;
  timeFrom: string;
  dateTo?: string;
  timeTo?: string;
}

const CreateEvent = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
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

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/events");
      setAuthenticated(true);
      setEvents(data.reverse());
    } catch {
      setAuthenticated(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("/api/events");
      setEvents(data.reverse());
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

    try {
      await axios.post("/api/auth", { email, password });
      setAuthenticated(true);
      fetchEvents();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Invalid credentials");
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setAuthenticated(false);
      router.reload();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
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
      fetchEvents();
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
      fetchEvents();
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
      fetchEvents();
      toast.success("Event deleted successfully", { id: deleteToast });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event", { id: deleteToast });
    } finally {
      setDeleteConfirm({ isOpen: false, eventId: null });
    }
  };

  const formatDateRange = (dateFrom: string, dateTo?: string) => {
    const from = new Date(dateFrom);
    const fromFormatted = from.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!dateTo || dateFrom === dateTo) {
      return fromFormatted;
    }

    const to = new Date(dateTo);
    const toFormatted = to.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${fromFormatted} - ${toFormatted}`;
  };

  const formatTimeRange = (timeFrom: string, timeTo?: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    if (!timeTo) return formatTime(timeFrom);
    return `${formatTime(timeFrom)} - ${formatTime(timeTo)}`;
  };

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
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-heading leading-tight">
              Events Inventory
            </h1>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {events.map((event) => (
              <div key={event._id} className="group">
                <div className="relative w-full aspect-3/2 mb-6 overflow-hidden bg-warm-gray">
                  <Image
                    fill
                    src={event.image}
                    alt={event.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/favicon.png";
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-black/50">
                    {event.venue}
                  </p>
                  <h3 className="text-3xl font-heading leading-tight text-black">
                    {event.title}
                  </h3>
                  <p className="text-xl text-black/70">
                    {formatDateRange(event.dateFrom, event.dateTo)}
                  </p>
                  <p className="text-xl text-black/70">
                    {formatTimeRange(event.timeFrom, event.timeTo)}
                  </p>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => openEditModal(event)}
                      className="flex-1 px-6 py-3 border border-black text-black text-base uppercase tracking-wider cursor-pointer hover:bg-black hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(event._id)}
                      className="flex-1 px-6 py-3 bg-black text-white text-base uppercase tracking-wider cursor-pointer hover:bg-black/80 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
