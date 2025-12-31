import { Registration, AttendanceSession, AttendanceRecord } from "@/types/interface/dashboard";
import {
    CategoryStats,
    NationalityStats,
    LocationStats,
    TypeStats,
    DailyRegistrationStats,
    DailyAttendanceStats,
    SessionAttendanceStats,
} from "@/types/interface/report";

export const calculateCategoryBreakdown = (registrations: Registration[]): CategoryStats[] => {
    const total = registrations.length;
    const categories = ["Adult", "Youth", "Campus", "Children"];

    return categories.map(category => {
        const count = registrations.filter(r => r.category === category).length;
        return {
            category,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });
};

export const calculateNationalityBreakdown = (registrations: Registration[]): NationalityStats[] => {
    const total = registrations.length;
    const nationalityMap = new Map<string, number>();

    registrations.forEach(r => {
        const count = nationalityMap.get(r.nationality) || 0;
        nationalityMap.set(r.nationality, count + 1);
    });

    return Array.from(nationalityMap.entries())
        .map(([nationality, count]) => ({
            nationality,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count);
};

export const calculateLocationBreakdown = (registrations: Registration[]): LocationStats[] => {
    const total = registrations.length;
    const locationMap = new Map<string, number>();

    registrations.forEach(r => {
        const count = locationMap.get(r.location) || 0;
        locationMap.set(r.location, count + 1);
    });

    return Array.from(locationMap.entries())
        .map(([location, count]) => ({
            location,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count);
};

export const calculateTypeBreakdown = (registrations: Registration[]): TypeStats[] => {
    const total = registrations.length;
    const types = ["Invited", "Member", "Worker"];

    return types.map(type => {
        const count = registrations.filter(r => r.invitedBy === type).length;
        return {
            type,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });
};

export const calculateDailyRegistrations = (
    registrations: Registration[],
    totalDays: number
): DailyRegistrationStats[] => {
    const stats: DailyRegistrationStats[] = [];

    for (let day = 1; day <= totalDays; day++) {
        const dayRegs = registrations.filter(r => r.dayRegistered === day);

        stats.push({
            day,
            adult: dayRegs.filter(r => r.category === "Adult").length,
            youth: dayRegs.filter(r => r.category === "Youth").length,
            campus: dayRegs.filter(r => r.category === "Campus").length,
            children: dayRegs.filter(r => r.category === "Children").length,
            total: dayRegs.length,
        });
    }

    return stats;
};

export const calculateDailyAttendance = (
    sessions: AttendanceSession[],
    attendanceRecords: AttendanceRecord[],
    totalDays: number
): DailyAttendanceStats[] => {
    const stats: DailyAttendanceStats[] = [];

    for (let day = 1; day <= totalDays; day++) {
        const daySessions = sessions.filter(s => s.day === day);
        const date = daySessions[0]?.date || "";

        const categoryTotals = {
            Adult: 0,
            Youth: 0,
            Campus: 0,
            Children: 0,
        };

        daySessions.forEach(session => {
            const record = attendanceRecords.find(r => r.sessionId === session._id);
            if (record) {
                categoryTotals[session.category as keyof typeof categoryTotals] += record.total;
            }
        });

        stats.push({
            day,
            date,
            adult: categoryTotals.Adult,
            youth: categoryTotals.Youth,
            campus: categoryTotals.Campus,
            children: categoryTotals.Children,
            total: Object.values(categoryTotals).reduce((sum, val) => sum + val, 0),
        });
    }

    return stats;
};

export const calculateSessionDetails = (
    sessions: AttendanceSession[],
    attendanceRecords: AttendanceRecord[]
): SessionAttendanceStats[] => {
    return sessions.map(session => {
        const record = attendanceRecords.find(r => r.sessionId === session._id);

        return {
            day: session.day,
            sessionNumber: session.sessionNumber,
            sessionName: session.sessionName,
            sessionTime: session.sessionTime,
            category: session.category,
            male: record?.male || 0,
            female: record?.female || 0,
            total: record?.total || 0,
            isGSMessage: session.isGSMessage,
        };
    }).sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.sessionNumber - b.sessionNumber;
    });
};

export const calculateAverageAttendance = (
    dailyStats: DailyAttendanceStats[]
) => {
    const daysWithData = dailyStats.filter(d => d.total > 0).length;

    if (daysWithData === 0) {
        return {
            adult: 0,
            youth: 0,
            campus: 0,
            children: 0,
            total: 0,
        };
    }

    const totals = dailyStats.reduce(
        (acc, day) => ({
            adult: acc.adult + day.adult,
            youth: acc.youth + day.youth,
            campus: acc.campus + day.campus,
            children: acc.children + day.children,
            total: acc.total + day.total,
        }),
        { adult: 0, youth: 0, campus: 0, children: 0, total: 0 }
    );

    return {
        adult: Math.round(totals.adult / daysWithData),
        youth: Math.round(totals.youth / daysWithData),
        campus: Math.round(totals.campus / daysWithData),
        children: Math.round(totals.children / daysWithData),
        total: Math.round(totals.total / daysWithData),
    };
};

export const formatRetreatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const getDateRange = (dateFrom: string, dateTo: string): string => {
    return `${formatRetreatDate(dateFrom)} - ${formatRetreatDate(dateTo)}`;
};