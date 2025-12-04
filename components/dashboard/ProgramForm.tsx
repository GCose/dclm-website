import { ProgramFormProps } from "@/types";
import Image from "next/image";

const EventForm = ({
  formData,
  onSubmit,
  onChange,
  onImageUpload,
  onCancel,
  loading,
  uploading,
  submitText,
}: ProgramFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
          Program Title <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-2xl transition-colors"
        />
      </div>

      <div>
        <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
          Venue <span className="text-terracotta">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.venue}
          onChange={(e) => onChange("venue", e.target.value)}
          className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-2xl transition-colors"
        />
      </div>

      <div>
        <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
          Program Image <span className="text-terracotta">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          disabled={uploading}
          className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-lg cursor-pointer transition-colors"
        />
        {uploading && (
          <p className="text-base text-terracotta mt-2">Uploading image...</p>
        )}
        {formData.image && !uploading && (
          <div className="mt-6 relative w-full aspect-3/2">
            <Image
              fill
              src={formData.image}
              alt="Preview"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
          Description <span className="text-terracotta">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl resize-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
            Start Date <span className="text-terracotta">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.dateFrom}
            onChange={(e) => onChange("dateFrom", e.target.value)}
            className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
          />
        </div>
        <div>
          <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
            End Date (optional)
          </label>
          <input
            type="date"
            value={formData.dateTo}
            onChange={(e) => onChange("dateTo", e.target.value)}
            className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
            Start Time <span className="text-terracotta">*</span>
          </label>
          <input
            type="time"
            required
            value={formData.timeFrom}
            onChange={(e) => onChange("timeFrom", e.target.value)}
            className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
          />
        </div>
        <div>
          <label className="block text-lg uppercase tracking-relaxed mb-3 text-black/60">
            End Time (optional)
          </label>
          <input
            type="time"
            value={formData.timeTo}
            onChange={(e) => onChange("timeTo", e.target.value)}
            className="w-full px-2 py-4 bg-transparent border-b-2 border-black/20 focus:border-terracotta outline-none text-xl transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-6 pt-8">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 px-8 py-4 bg-black text-white text-sm uppercase tracking-widest cursor-pointer hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? `${submitText}...` : submitText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-8 py-4 border border-black text-black text-sm uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;
