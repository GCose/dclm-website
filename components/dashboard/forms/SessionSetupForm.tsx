import { useState, useEffect } from "react";
import {
  SessionTemplate,
  SessionSetupFormProps,
} from "@/types/interface/dashboard";

interface ExtendedSessionSetupFormProps extends SessionSetupFormProps {
  existingTemplates?: SessionTemplate[];
}

const SessionSetupForm = ({
  onGenerate,
  existingTemplates,
}: ExtendedSessionSetupFormProps) => {
  const [totalSessions, setTotalSessions] = useState(7);
  const [templates, setTemplates] = useState<SessionTemplate[]>([
    {
      sessionNumber: 1,
      startTime: "",
      endTime: "",
      adultName: "",
      youthName: "",
      campusName: "",
      childrenName: "",
    },
  ]);
  const [generating, setGenerating] = useState(false);

  // Prefill with existing templates if provided
  useEffect(() => {
    if (existingTemplates && existingTemplates.length > 0) {
      setTotalSessions(existingTemplates.length);
      setTemplates(existingTemplates);
    }
  }, [existingTemplates]);

  const handleTotalSessionsChange = (count: number) => {
    setTotalSessions(count);
    const newTemplates: SessionTemplate[] = Array.from(
      { length: count },
      (_, i) => {
        if (templates[i]) return templates[i];
        return {
          sessionNumber: i + 1,
          startTime: "",
          endTime: "",
          adultName: "",
          youthName: "",
          campusName: "",
          childrenName: "",
        };
      }
    );
    setTemplates(newTemplates);
  };

  const updateTemplate = (
    index: number,
    field: keyof SessionTemplate,
    value: string
  ) => {
    const updated = [...templates];
    updated[index] = { ...updated[index], [field]: value };
    setTemplates(updated);
  };

  const handleGenerate = async () => {
    const isValid = templates.every(
      (t) =>
        t.startTime &&
        t.endTime &&
        t.adultName &&
        t.youthName &&
        t.campusName &&
        t.childrenName
    );

    if (!isValid) {
      alert("Please fill in all session names and times");
      return;
    }

    setGenerating(true);
    try {
      await onGenerate(templates);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 p-8 rounded-lg">
        <h3 className="text-lg font-bold uppercase text-navy dark:text-white mb-6">
          {existingTemplates
            ? "Update Session Configuration"
            : "Set Up Sessions for Retreat"}
        </h3>

        <div className="mb-12">
          <label className="block text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-2">
            How many sessions for this retreat? *
          </label>
          <input
            type="number"
            required
            min="1"
            value={totalSessions}
            onChange={(e) =>
              handleTotalSessionsChange(parseInt(e.target.value) || 1)
            }
            className="w-full md:w-64 px-4 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
          />
        </div>

        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold mb-4">
            Define Sessions for Each Category
          </h4>
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
                    Adult Church *
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                    Youth Church *
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                    Campus Church *
                  </th>
                  <th className="text-left py-3 px-4 text-sm uppercase tracking-wider text-navy dark:text-white/80 font-bold">
                    Children Church *
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
                          value={template.adultName}
                          onChange={(e) =>
                            updateTemplate(index, "adultName", e.target.value)
                          }
                          placeholder="e.g., Morning Prayer"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          required
                          value={template.youthName}
                          onChange={(e) =>
                            updateTemplate(index, "youthName", e.target.value)
                          }
                          placeholder="e.g., Youth Service"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          required
                          value={template.campusName}
                          onChange={(e) =>
                            updateTemplate(index, "campusName", e.target.value)
                          }
                          placeholder="e.g., Campus Meeting"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          required
                          value={template.childrenName}
                          onChange={(e) =>
                            updateTemplate(
                              index,
                              "childrenName",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Kids Service"
                          className="w-full px-2 py-1 bg-transparent border-b border-black/20 dark:border-white/20 text-navy dark:text-white focus:outline-none focus:border-navy dark:focus:border-white"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full px-6 py-3 bg-navy dark:bg-white text-white dark:text-navy text-sm uppercase tracking-wider hover:bg-burgundy dark:hover:bg-burgundy dark:hover:text-white transition-colors rounded disabled:opacity-50 cursor-pointer"
        >
          {generating
            ? "Generating..."
            : existingTemplates
            ? "Update Sessions for Retreat"
            : "Generate Sessions for Retreat"}
        </button>
      </div>
    </div>
  );
};

export default SessionSetupForm;
