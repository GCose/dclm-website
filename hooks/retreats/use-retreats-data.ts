import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Retreat, AttendanceSession, AttendanceRecord, RetreatFilters } from "@/types/interface/dashboard";

export const useRetreatsData = (selectedRetreat: Retreat | null, filters?: RetreatFilters) => {
    const [retreats, setRetreats] = useState<Retreat[]>([]);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<AttendanceSession[]>([]);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

    const [retreatsPage, setRetreatsPage] = useState(1);
    const [retreatsTotalPages, setRetreatsTotalPages] = useState(1);
    const [retreatsTotal, setRetreatsTotal] = useState(0);
    const [uniqueYears, setUniqueYears] = useState<number[]>([]);

    const fetchRetreats = async (page: number) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "20",
            });

            if (filters?.year) params.append("year", filters.year);
            if (filters?.type) params.append("type", filters.type);

            const { data } = await axios.get(`/api/retreats?${params.toString()}`);
            const retreatsData = Array.isArray(data.retreats)
                ? data.retreats
                : data.retreats || [];
            setRetreats(retreatsData);

            if (data.pagination) {
                setRetreatsTotal(data.pagination.total);
                setRetreatsTotalPages(data.pagination.totalPages);
            }

            const years = Array.from(new Set<number>(retreatsData.map((r: Retreat) => r.year))).sort((a: number, b: number) => b - a);
            setUniqueYears(years);
        } catch (error: unknown) {
            console.error("Error fetching retreats:", error);
            toast.error("Failed to fetch retreats");
            setRetreats([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSessions = async () => {
        if (!selectedRetreat) {
            setSessions([]);
            return;
        }

        try {
            const { data } = await axios.get(
                `/api/attendance-sessions?retreatId=${selectedRetreat._id}`
            );

            console.log('API Response:', data);

            const sessionsData = Array.isArray(data) ? data : data.sessions || [];

            console.log('Parsed sessions:', sessionsData);
            console.log('Sessions count:', sessionsData.length);

            setSessions(sessionsData);
        } catch (error: unknown) {
            console.error("Error fetching sessions:", error);
            toast.error("Failed to fetch sessions");
            setSessions([]);
        }
    };

    const fetchAttendanceRecords = async () => {
        if (!selectedRetreat) {
            setAttendanceRecords([]);
            return;
        }

        try {
            const { data } = await axios.get(`/api/attendance-records`);
            const recordsData = Array.isArray(data) ? data : data.records || [];
            setAttendanceRecords(recordsData);
        } catch (error: unknown) {
            console.error("Error fetching attendance records:", error);
            setAttendanceRecords([]);
        }
    };

    useEffect(() => {
        fetchRetreats(retreatsPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retreatsPage, filters?.year, filters?.type]);

    useEffect(() => {
        setSessions([]);
        setAttendanceRecords([]);

        if (!selectedRetreat) return;

        const fetchRetreatData = async () => {
            try {
                const [sessionsRes, recordsRes] = await Promise.all([
                    axios.get(`/api/attendance-sessions?retreatId=${selectedRetreat._id}`),
                    axios.get(`/api/attendance-records`),
                ]);

                console.log('Sessions API response:', sessionsRes.data);
                console.log('Records API response:', recordsRes.data);

                const sessionsData = Array.isArray(sessionsRes.data)
                    ? sessionsRes.data
                    : sessionsRes.data.sessions || [];
                const recordsData = Array.isArray(recordsRes.data)
                    ? recordsRes.data
                    : recordsRes.data.records || [];

                console.log('Final sessions data:', sessionsData);
                console.log('Final sessions length:', sessionsData.length);

                setSessions(sessionsData);
                setAttendanceRecords(recordsData);
            } catch (error: unknown) {
                console.error("Error fetching retreat data:", error);
                toast.error("Failed to fetch retreat data");
                setSessions([]);
                setAttendanceRecords([]);
            }
        };

        fetchRetreatData();
    }, [selectedRetreat]);

    return {
        retreats,
        setRetreats,
        loading,
        retreatsPage,
        setRetreatsPage,
        retreatsTotalPages,
        retreatsTotal,
        uniqueYears,
        sessions,
        setSessions,
        attendanceRecords,
        setAttendanceRecords,
        fetchRetreats,
        fetchSessions,
        fetchAttendanceRecords,
    };
};