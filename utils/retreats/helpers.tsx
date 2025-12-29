import { Retreat } from "@/types/interface/dashboard";

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const calculateDayDate = (
  selectedRetreat: Retreat | null,
  dayNumber: number
) => {
  if (!selectedRetreat) return new Date().toISOString().split("T")[0];
  const startDate = new Date(selectedRetreat.dateFrom);
  const dayDate = new Date(startDate);
  dayDate.setDate(startDate.getDate() + (dayNumber - 1));
  return dayDate.toISOString().split("T")[0];
};
