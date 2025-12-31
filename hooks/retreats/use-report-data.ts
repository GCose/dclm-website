import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ReportData, UseReportDataParams } from "@/types/interface/report";
import { Registration, AttendanceSession, AttendanceRecord } from "@/types/interface/dashboard";
import {
    calculateCategoryBreakdown,
    calculateNationalityBreakdown,
    calculateLocationBreakdown,
    calculateTypeBreakdown,
    calculateDailyRegistrations,
    calculateDailyAttendance,
    calculateSessionDetails,
    calculateAverageAttendance,
} from "@/utils/retreats/report-helpers";

export const useReportData = (retreat: UseReportDataParams | null) => {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    const retreatId = retreat?.retreatId;
    const year = retreat?.year;
    const type = retreat?.type;
    const dateFrom = retreat?.dateFrom;
    const dateTo = retreat?.dateTo;
    const venue = retreat?.venue;
    const theme = retreat?.theme;
    const totalDays = retreat?.totalDays;

    useEffect(() => {
        if (!retreatId) {
            setReportData(null);
            setLoading(false);
            return;
        }

        const fetchReportData = async () => {
            setLoading(true);
            try {
                const [registrationsRes, sessionsRes, recordsRes] = await Promise.all([
                    axios.get(`/api/registrations?retreatId=${retreatId}&limit=1000`),
                    axios.get(`/api/attendance-sessions?retreatId=${retreatId}`),
                    axios.get(`/api/attendance-records`),
                ]);

                const registrations: Registration[] = Array.isArray(registrationsRes.data.registrations)
                    ? registrationsRes.data.registrations
                    : [];

                const sessions: AttendanceSession[] = Array.isArray(sessionsRes.data.sessions)
                    ? sessionsRes.data.sessions
                    : sessionsRes.data.sessions || [];

                const allRecords: AttendanceRecord[] = Array.isArray(recordsRes.data.records)
                    ? recordsRes.data.records
                    : recordsRes.data.records || [];

                const attendanceRecords = allRecords.filter(record =>
                    sessions.some(session => session._id === record.sessionId)
                );

                const total = registrations.length;
                const male = registrations.filter(r => r.gender === "Male").length;
                const female = registrations.filter(r => r.gender === "Female").length;

                const dailyAttendanceStats = sessions.length > 0 && totalDays
                    ? calculateDailyAttendance(sessions, attendanceRecords, totalDays)
                    : [];

                const report: ReportData = {
                    retreat: {
                        year: year || 0,
                        type: type || "Easter",
                        dateFrom: dateFrom || "",
                        dateTo: dateTo || "",
                        venue: venue || "",
                        theme: theme,
                        totalDays: totalDays || 0,
                    },
                    registrationSummary: {
                        total,
                        male,
                        female,
                        malePercentage: total > 0 ? Math.round((male / total) * 100) : 0,
                        femalePercentage: total > 0 ? Math.round((female / total) * 100) : 0,
                    },
                    categoryBreakdown: calculateCategoryBreakdown(registrations),
                    nationalityBreakdown: calculateNationalityBreakdown(registrations),
                    locationBreakdown: calculateLocationBreakdown(registrations),
                    typeBreakdown: calculateTypeBreakdown(registrations),
                    dailyRegistrations: calculateDailyRegistrations(registrations, totalDays || 0),
                    attendanceData: sessions.length > 0 ? {
                        dailyAttendance: dailyAttendanceStats,
                        sessionDetails: calculateSessionDetails(sessions, attendanceRecords),
                        averageAttendance: calculateAverageAttendance(dailyAttendanceStats),
                    } : undefined,
                };

                setReportData(report);
            } catch (error) {
                console.error("Error fetching report data:", error);
                toast.error("Failed to load report data");
                setReportData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [retreatId, year, type, dateFrom, dateTo, venue, theme, totalDays]);

    return { reportData, loading };
};