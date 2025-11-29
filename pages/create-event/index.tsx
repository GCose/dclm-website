import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navigation from "@/components/website/layout/Navigation";

interface Event {
  _id: string;
  title: string;
  venue: string;
  image: string;
  description?: string;
  date: string;
  createdAt: string;
}

export default function CreateEvent() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    image: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        setAuthenticated(true);
        const data = await res.json();
        setEvents(data);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        fetchEvents();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setAuthenticated(false);
      router.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      venue: "",
      image: "",
      description: "",
      date: "",
    });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        resetForm();
        setShowCreateModal(false);
        fetchEvents();
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/events/${editingEvent._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        resetForm();
        setShowEditModal(false);
        setEditingEvent(null);
        fetchEvents();
      }
    } catch (error) {
      console.error("Error updating event:", error);
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
      date: event.date.split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | DCLM Brikama</title>
        </Head>
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

      <Navigation />

      <div className="min-h-screen bg-cream pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-[clamp(3rem,5vw,6rem)] font-heading leading-[1.1] tracking-tight">
                Events
              </h1>
              <button
                onClick={handleLogout}
                className="mt-2 text-sm uppercase tracking-widest text-black/60 hover:text-black"
              >
                Logout
              </button>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="bg-terracotta text-white px-8 py-4 uppercase tracking-widest hover:bg-terracotta/90 transition-colors"
            >
              Create Event
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-off-white overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-heading mb-2">{event.title}</h3>

                  {event.description && (
                    <p className="text-sm text-black/70 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-6">
                    <p className="text-sm">
                      <span className="font-semibold">Venue:</span>{" "}
                      {event.venue}
                    </p>
                    <p className="text-sm text-black/60">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-warm-gray">
                    <button
                      onClick={() => openEditModal(event)}
                      className="text-sm uppercase tracking-widest text-terracotta hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-sm uppercase tracking-widest text-black/60 hover:text-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-black/60">
                No events yet. Create your first event!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-off-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading">Create Event</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-2xl hover:text-terracotta"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
                <p className="text-xs text-black/60 mt-2">
                  Upload image (will be implemented with file server)
                </p>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-terracotta text-white py-3 uppercase tracking-widest hover:bg-terracotta/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-8 py-3 bg-warm-gray uppercase tracking-widest hover:bg-warm-gray/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-off-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading">Edit Event</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEvent(null);
                }}
                className="text-2xl hover:text-terracotta"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
                <p className="text-xs text-black/60 mt-2">
                  Current: {editingEvent.image}
                </p>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-cream border border-warm-gray focus:border-terracotta outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-terracotta text-white py-3 uppercase tracking-widest hover:bg-terracotta/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Event"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEvent(null);
                  }}
                  className="px-8 py-3 bg-warm-gray uppercase tracking-widest hover:bg-warm-gray/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
