import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Category,
  CategorySessionDefineStepProps,
  CategorySessionTemplate,
} from "@/types/interface/dashboard";

const CategorySessionDefineStep = ({
  counts,
  categoryTemplates,
  onTemplatesChange,
  onGenerate,
  onBack,
  generating,
}: CategorySessionDefineStepProps) => {
  const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];
  const [activeCategory, setActiveCategory] = useState<Category>("Adult");

  const templates = categoryTemplates[activeCategory];

  const updateTemplate = (
    index: number,
    field: keyof CategorySessionTemplate,
    value: string
  ) => {
    const updated = [...templates];
    updated[index] = { ...updated[index], [field]: value };
    onTemplatesChange(activeCategory, updated);
  };

  const addSession = () => {
    const newSession: CategorySessionTemplate = {
      sessionNumber: templates.length + 1,
      startTime: "",
      endTime: "",
      name: "",
    };
    onTemplatesChange(activeCategory, [...templates, newSession]);
  };

  const removeSession = (index: number) => {
    const updated = templates.filter((_, i) => i !== index);
    const renumbered = updated.map((t, i) => ({ ...t, sessionNumber: i + 1 }));
    onTemplatesChange(activeCategory, renumbered);
  };

  const handleGenerate = () => {
    const allValid = categories.every((category) => {
      const temps = categoryTemplates[category];
      return temps.every((t) => t.startTime && t.endTime && t.name);
    });

    if (!allValid) {
      alert("Please fill in all session names and times for all categories");
      return;
    }

    onGenerate();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold uppercase text-navy dark:text-white">
          Define Sessions for Each Category
        </h3>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm uppercase tracking-wider text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white transition-colors"
        >
          Back
        </button>
      </div>

      <div className="border-b border-black/10 dark:border-white/10">
        <div className="flex gap-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`pb-4 px-2 text-sm uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === category
                  ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                  : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
              }`}
            >
              {category} {category === "Campus" ? "Fellowship" : "Church"}
              <span className="ml-2 text-xs">
                ({counts[category]} sessions)
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Session #
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Start Time *
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  End Time *
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Session Name *
                </th>
                <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template, index) => {
                const isGSMessage =
                  template.sessionNumber === 1 ||
                  template.sessionNumber === 3 ||
                  template.sessionNumber === templates.length;

                return (
                  <tr
                    key={index}
                    className="border-b border-black/10 dark:border-white/10"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-black/70 dark:text-white/70">
                          {index + 1}
                        </span>
                        {isGSMessage && (
                          <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta text-[10px] uppercase tracking-wider font-bold rounded">
                            GS
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="time"
                        required
                        value={template.startTime}
                        onChange={(e) =>
                          updateTemplate(index, "startTime", e.target.value)
                        }
                        className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="time"
                        required
                        value={template.endTime}
                        onChange={(e) =>
                          updateTemplate(index, "endTime", e.target.value)
                        }
                        className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        required
                        value={template.name}
                        onChange={(e) =>
                          updateTemplate(index, "name", e.target.value)
                        }
                        placeholder="e.g., Morning Prayer"
                        className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removeSession(index)}
                        className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={addSession}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wider text-navy dark:text-white border border-black/10 dark:border-white/10 hover:border-navy dark:hover:border-white transition-colors rounded cursor-pointer"
        >
          <Plus size={16} />
          Add Session
        </button>
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded disabled:opacity-50 cursor-pointer"
      >
        {generating
          ? "Generating Sessions..."
          : "Generate Sessions for Retreat"}
      </button>
    </div>
  );
};

export default CategorySessionDefineStep;
