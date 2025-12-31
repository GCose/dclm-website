export interface ReportData {
    retreat: {
        year: number;
        type: "Easter" | "December";
        dateFrom: string;
        dateTo: string;
        venue: string;
        theme?: string;
        totalDays: number;
    };
    registrationSummary: {
        total: number;
        male: number;
        female: number;
        malePercentage: number;
        femalePercentage: number;
    };
    categoryBreakdown: CategoryStats[];
    nationalityBreakdown: NationalityStats[];
    locationBreakdown: LocationStats[];
    typeBreakdown: TypeStats[];
    dailyRegistrations: DailyRegistrationStats[];
    attendanceData?: {
        dailyAttendance: DailyAttendanceStats[];
        sessionDetails: SessionAttendanceStats[];
        averageAttendance: {
            adult: number;
            youth: number;
            campus: number;
            children: number;
            total: number;
        };
    };
}

export interface CategoryStats {
    category: string;
    count: number;
    percentage: number;
}

export interface NationalityStats {
    nationality: string;
    count: number;
    percentage: number;
}

export interface LocationStats {
    location: string;
    count: number;
    percentage: number;
}

export interface TypeStats {
    type: string;
    count: number;
    percentage: number;
}

export interface DailyRegistrationStats {
    day: number;
    adult: number;
    youth: number;
    campus: number;
    children: number;
    total: number;
}

export interface DailyAttendanceStats {
    day: number;
    date: string;
    adult: number;
    youth: number;
    campus: number;
    children: number;
    total: number;
}

export interface SessionAttendanceStats {
    day: number;
    sessionNumber: number;
    sessionName: string;
    sessionTime: string;
    category: string;
    male: number;
    female: number;
    total: number;
    isGSMessage: boolean;
}

export interface UseReportDataParams {
    retreatId: string;
    year: number;
    type: "Easter" | "December";
    dateFrom: string;
    dateTo: string;
    venue: string;
    theme?: string;
    totalDays: number;
}

export interface EditRetreatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: {
        year: number;
        type: "Easter" | "December";
        totalDays: number;
        dateFrom: string;
        dateTo: string;
        venue: string;
        theme: string;
    };
    setForm: React.Dispatch<React.SetStateAction<{
        year: number;
        type: "Easter" | "December";
        totalDays: number;
        dateFrom: string;
        dateTo: string;
        venue: string;
        theme: string;
    }>>;
}

export interface OverviewTabProps {
    retreat: {
        _id: string;
        year: number;
        type: "Easter" | "December";
        status: string;
        totalDays: number;
        dateFrom: string;
        dateTo: string;
        venue: string;
        theme?: string;
    };
    onGeneratePDF: () => void;
    generatingPDF: boolean;
}