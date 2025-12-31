import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";
import { Retreat, AttendanceSession, AttendanceRecord, RetreatFilters } from "@/types/interface/dashboard";

interface RetreatsResponse {
    retreats: Retreat[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface SessionsResponse {
    sessions?: AttendanceSession[];
}

interface RecordsResponse {
    records?: AttendanceRecord[];
}

const fetcher = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
};

export const useRetreatsData = (
    selectedRetreat: Retreat | null,
    filters: RetreatFilters,
    page: number
) => {
    const retreatsParams = new URLSearchParams({
        page: String(page),
        limit: "20",
    });

    if (filters?.year) retreatsParams.append("year", filters.year);
    if (filters?.type) retreatsParams.append("type", filters.type);

    const retreatsKey = `/api/retreats?${retreatsParams.toString()}`;

    const {
        data: retreatsData,
        isLoading: retreatsLoading,
        mutate: mutateRetreats,
    } = useSWR<RetreatsResponse>(retreatsKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching retreats:", error);
            toast.error("Failed to fetch retreats");
        },
    });

    const sessionsKey = selectedRetreat
        ? `/api/attendance-sessions?retreatId=${selectedRetreat._id}`
        : null;

    const {
        data: sessionsData,
        mutate: mutateSessions,
    } = useSWR<SessionsResponse>(sessionsKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching sessions:", error);
            toast.error("Failed to fetch sessions");
        },
    });

    const recordsKey = selectedRetreat ? "/api/attendance-records" : null;

    const {
        data: recordsData,
        mutate: mutateRecords,
    } = useSWR<RecordsResponse>(recordsKey, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching attendance records:", error);
        },
    });

    const retreats = useMemo(() => {
        if (Array.isArray(retreatsData?.retreats)) {
            return retreatsData.retreats;
        }
        return [];
    }, [retreatsData]);

    const uniqueYears = useMemo(() => {
        const years = Array.from(
            new Set<number>(retreats.map((r: Retreat) => r.year))
        ).sort((a: number, b: number) => b - a);
        return years;
    }, [retreats]);

    const sessions = useMemo(() => {
        if (!sessionsData) return [];
        const data = Array.isArray(sessionsData)
            ? sessionsData
            : sessionsData.sessions || [];
        return data;
    }, [sessionsData]);

    const attendanceRecords = useMemo(() => {
        if (!recordsData) return [];
        const data = Array.isArray(recordsData)
            ? recordsData
            : recordsData.records || [];
        return data;
    }, [recordsData]);

    return {
        retreats,
        loading: retreatsLoading,
        totalPages: retreatsData?.pagination?.totalPages || 1,
        total: retreatsData?.pagination?.total || 0,
        uniqueYears,
        sessions,
        attendanceRecords,
        refreshRetreats: mutateRetreats,
        refreshSessions: mutateSessions,
        refreshRecords: mutateRecords,
        refreshAll: () => {
            mutateRetreats();
            mutateSessions();
            mutateRecords();
        },
    };
};