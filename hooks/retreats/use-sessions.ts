import axios from "axios";
import { toast } from "sonner";
import { calculateDayDate } from "@/utils/retreats/helpers";
import { Retreat, SessionTemplate, AttendanceRecord } from "@/types/interface/dashboard";

const useSession = (
    selectedRetreat: Retreat | null,
    fetchSessions: () => Promise<void>,
    fetchAttendanceRecords: () => Promise<void>
) => {
    const handleGenerateSessions = async (
        sessionsPerFullDay: number,
        templates: SessionTemplate[]
    ) => {
        if (!selectedRetreat) return;

        try {
            const sessionsToCreate: Array<{
                retreatId: string;
                day: number;
                date: string;
                sessionName: string;
                sessionTime: string;
            }> = [];

            for (let day = 1; day <= selectedRetreat.totalDays; day++) {
                const dayDate = calculateDayDate(selectedRetreat, day);

                if (day === 1) {
                    sessionsToCreate.push({
                        retreatId: selectedRetreat._id,
                        day: 1,
                        date: dayDate,
                        sessionName: "Evening Session",
                        sessionTime: "6:00 PM - 8:00 PM",
                    });
                } else if (day === selectedRetreat.totalDays) {
                    sessionsToCreate.push({
                        retreatId: selectedRetreat._id,
                        day: selectedRetreat.totalDays,
                        date: dayDate,
                        sessionName: "Morning Session",
                        sessionTime: "6:00 AM - 8:00 AM",
                    });
                } else {
                    templates.forEach((template) => {
                        sessionsToCreate.push({
                            retreatId: selectedRetreat._id,
                            day,
                            date: dayDate,
                            sessionName: template.sessionName,
                            sessionTime: template.sessionTime,
                        });
                    });
                }
            }

            await Promise.all(
                sessionsToCreate.map((session) =>
                    axios.post("/api/attendance-sessions", session)
                )
            );

            toast.success("Sessions generated successfully");
            await fetchSessions();
        } catch (error: unknown) {
            console.error("Error generating sessions:", error);
            toast.error("Failed to generate sessions");
        }
    };

    const handleSaveAttendance = async (records: AttendanceRecord[]) => {
        try {
            await Promise.all(
                records.map((record) => axios.post("/api/attendance-records", record))
            );
            toast.success("Attendance saved successfully");
            await fetchAttendanceRecords();
        } catch (error: unknown) {
            console.error("Error saving attendance:", error);
            toast.error("Failed to save attendance");
        }
    };

    return {
        handleGenerateSessions,
        handleSaveAttendance,
    };
};

export default useSession;