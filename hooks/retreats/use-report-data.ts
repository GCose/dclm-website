import useSWR from "swr";
import axios from "axios";
import { useMemo } from "react";
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

const fetcher = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
};

export const useReportData = (retreat: UseReportDataParams | null) => {
    const retreatId = retreat?.retreatId;
    const year = retreat?.year;
    const type = retreat?.type;
    const dateFrom = retreat?.dateFrom;
    const dateTo = retreat?.dateTo;
    const venue = retreat?.venue;
    const theme = retreat?.theme;
    const totalDays = retreat?.totalDays;

    const registrationsKey = retreatId
        ? `/api/registrations?retreatId=${retreatId}&limit=1000`
        : null;

    const sessionsKey = retreatId
        ? `/api/attendance-sessions?retreatId=${retreatId}`
        : null;

    const recordsKey = retreatId ? "/api/attendance-records" : null;

    const { data: registrationsData, error: registrationsError } = useSWR(
        registrationsKey,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    const { data: sessionsData, error: sessionsError } = useSWR(
        sessionsKey,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    const { data: recordsData, error: recordsError } = useSWR(
        recordsKey,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    const loading =
        !registrationsData || !sessionsData || !recordsData;

    const hasError = registrationsError || sessionsError || recordsError;

    const reportData = useMemo(() => {
        if (!retreat || !registrationsData || !sessionsData || !recordsData) {
            return null;
        }

        const registrations: Registration[] = Array.isArray(
            registrationsData.registrations
        )
            ? registrationsData.registrations
            : [];

        const sessions: AttendanceSession[] = Array.isArray(
            sessionsData.sessions
        )
            ? sessionsData.sessions
            : sessionsData.sessions || [];

        const allRecords: AttendanceRecord[] = Array.isArray(
            recordsData.records
        )
            ? recordsData.records
            : recordsData.records || [];

        const attendanceRecords = allRecords.filter((record) =>
            sessions.some((session) => session._id === record.sessionId)
        );

        const total = registrations.length;
        const male = registrations.filter((r) => r.gender === "Male").length;
        const female = registrations.filter((r) => r.gender === "Female").length;

        const dailyAttendanceStats =
            sessions.length > 0 && totalDays
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
                femalePercentage:
                    total > 0 ? Math.round((female / total) * 100) : 0,
            },
            categoryBreakdown: calculateCategoryBreakdown(registrations),
            nationalityBreakdown: calculateNationalityBreakdown(registrations),
            locationBreakdown: calculateLocationBreakdown(registrations),
            typeBreakdown: calculateTypeBreakdown(registrations),
            dailyRegistrations: calculateDailyRegistrations(
                registrations,
                totalDays || 0
            ),
            attendanceData:
                sessions.length > 0
                    ? {
                        dailyAttendance: dailyAttendanceStats,
                        sessionDetails: calculateSessionDetails(
                            sessions,
                            attendanceRecords
                        ),
                        averageAttendance:
                            calculateAverageAttendance(dailyAttendanceStats),
                    }
                    : undefined,
        };

        return report;
    }, [
        retreat,
        registrationsData,
        sessionsData,
        recordsData,
        year,
        type,
        dateFrom,
        dateTo,
        venue,
        theme,
        totalDays,
    ]);

    return {
        reportData,
        loading,
        error: hasError ? "Failed to load report data" : null,
    };
};