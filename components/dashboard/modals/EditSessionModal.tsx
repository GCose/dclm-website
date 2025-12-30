import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { EditSessionModalProps } from "@/types/interface/dashboard";

const EditSessionModal = ({
  isOpen,
  onClose,
  session,
  onSave,
}: EditSessionModalProps) => {
  const [sessionName, setSessionName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session) {
      setSessionName(session.sessionName);
      const times = session.sessionTime.split(" - ");
      setStartTime(times[0] || "");
      setEndTime(times[1] || "");
    }
  }, [session]);

  const handleSave = async () => {
    if (!session) return;

    setSaving(true);
    try {
      await onSave(session._id, {
        sessionName,
        sessionTime: `${startTime} - ${endTime}`,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-navy border border-black/10 dark:border-white/10 rounded-lg max-w-lg w-full">
        <div className="border-b border-black/10 dark:border-white/10 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase text-navy dark:text-white">
            Edit Session
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
              Session Name *
            </label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                Start Time *
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
                End Time *
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
              />
            </div>
          </div>

          <div className="bg-terracotta/10 border border-terracotta/20 p-4 rounded">
            <p className="text-sm text-terracotta">
              <strong>Category:</strong> {session.category} Church
              <br />
              <strong>Day:</strong> {session.day} ({session.date})
              <br />
              {session.isGSMessage && (
                <>
                  <strong>Note:</strong> This is a GS Message session
                </>
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 p-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white dark:bg-navy border border-black/10 dark:border-white/10 text-navy dark:text-white text-sm uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !sessionName || !startTime || !endTime}
            className="flex-1 px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSessionModal;
