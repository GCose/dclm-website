import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Retreat, AttendanceSession, AttendanceRecord } from "@/types/interface/dashboard";

export const useRetreatsData = (selectedRetreat: Retreat | null) => {
    const [retreats, setRetreats] = useState<Retreat[]>([]);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<AttendanceSession[]>([]);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);


    const [retreatsPage, setRetreatsPage] = useState(1);
    const [retreatsTotalPages, setRetreatsTotalPages] = useState(1);
    const [retreatsTotal, setRetreatsTotal] = useState(0);


    const fetchRetreats = async (page: number) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/retreats?page=${page}&limit=20`);
            const retreatsData = Array.isArray(data.retreats)
                ? data.retreats
                : data.retreats || [];
            setRetreats(retreatsData);

            if (data.pagination) {
                setRetreatsTotal(data.pagination.total);
                setRetreatsTotalPages(data.pagination.totalPages);
            }
        } catch (error: unknown) {
            console.error("Error fetching retreats:", error);
            toast.error("Failed to fetch retreats");
            setRetreats([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSessions = async () => {
        if (!selectedRetreat) return;
        try {
            const { data } = await axios.get(
                `/api/attendance-sessions?retreatId=${selectedRetreat._id}`
            );
            const sessionsData = Array.isArray(data) ? data : data.sessions || [];
            setSessions(sessionsData);
        } catch (error: unknown) {
            console.error("Error fetching sessions:", error);
            toast.error("Failed to fetch sessions");
        }
    };

    const fetchAttendanceRecords = async () => {
        if (!selectedRetreat) return;
        try {
            const { data } = await axios.get(`/api/attendance-records`);
            const recordsData = Array.isArray(data) ? data : data.records || [];
            setAttendanceRecords(recordsData);
        } catch (error: unknown) {
            console.error("Error fetching attendance records:", error);
        }
    };

    useEffect(() => {
        fetchRetreats(retreatsPage);
    }, [retreatsPage]);

    useEffect(() => {
        if (!selectedRetreat) return;

        const fetchRetreatData = async () => {
            try {
                const [sessionsRes, recordsRes] = await Promise.all([
                    axios.get(`/api/attendance-sessions?retreatId=${selectedRetreat._id}`),
                    axios.get(`/api/attendance-records`),
                ]);

                const sessionsData = Array.isArray(sessionsRes.data)
                    ? sessionsRes.data
                    : sessionsRes.data.sessions || [];
                const recordsData = Array.isArray(recordsRes.data)
                    ? recordsRes.data
                    : recordsRes.data.records || [];

                setSessions(sessionsData);
                setAttendanceRecords(recordsData);
            } catch (error: unknown) {
                console.error("Error fetching retreat data:", error);
                toast.error("Failed to fetch retreat data");
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
        sessions,
        setSessions,
        attendanceRecords,
        setAttendanceRecords,
        fetchRetreats,
        fetchSessions,
        fetchAttendanceRecords,
    };
};