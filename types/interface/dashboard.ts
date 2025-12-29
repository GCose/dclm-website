import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface DashboardLayoutProps {
    children: ReactNode;
    title?: string;
}

export interface StatsCardProps {
    label: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    loading?: boolean;
}

export interface Retreat {
    _id: string;
    year: number;
    type: "Easter" | "December";
    status: "ongoing" | "completed";
    totalDays: number;
    dateFrom: string;
    dateTo: string;
    venue: string;
    theme?: string;
    createdAt: string;
}

export interface RetreatForm {
    year: number;
    type: "Easter" | "December";
    status: "ongoing" | "completed";
    totalDays: number;
    dateFrom: string;
    dateTo: string;
    venue: string;
    theme: string;
}

export interface CreateRetreatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: RetreatForm;
    setForm: React.Dispatch<React.SetStateAction<RetreatForm>>;
}

export interface Registration {
    _id: string;
    retreatId: string;
    name: string;
    gender: string;
    address: string;
    phone: string;
    nationality: string;
    invitedBy: string;
    category: string;
    age: number;
    dayRegistered: number;
    createdAt: string;
}

export interface RegistrationForm {
    name: string;
    gender: "Male" | "Female";
    address: string;
    phone: string;
    nationality: string;
    invitedBy: "Invited" | "Member" | "Worker";
    category: "Adult" | "Campus" | "Youth" | "Children";
    age: number;
    dayRegistered: number;
}

export interface RegistrationFilters {
    search: string;
    gender: string;
    category: string;
    nationality: string;
    invitedBy: string;
    dayRegistered: string;
}

export interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: RegistrationForm;
    setForm: React.Dispatch<React.SetStateAction<RegistrationForm>>;
    totalDays: number;
}

export interface RegistrationFormProps {
    form: RegistrationForm;
    setForm: React.Dispatch<React.SetStateAction<RegistrationForm>>;
    onSubmit: (e: React.FormEvent) => void;
    totalDays: number;
    submitText: string;
}

export interface RegistrationsTableProps {
    registrations: Registration[];
    total: number;
    loading: boolean;
    filters: RegistrationFilters;
    pagination: {
        page: number;
        totalPages: number;
        total?: number;
        onPageChange: (page: number) => void;
    };
    onFiltersChange: (filters: RegistrationFilters) => void;
    onAdd: () => void;
    onEdit: (registration: Registration) => void;
    onDelete: (id: string) => void;
    onRefresh: () => void;
    totalDays: number;
}

export interface AttendanceSession {
    _id: string;
    retreatId: string;
    day: number;
    date: string;
    sessionName: string;
    sessionTime: string;
}

export interface AttendanceRecord {
    _id?: string;
    sessionId: string;
    adultsMale: number;
    adultsFemale: number;
    youthMale: number;
    youthFemale: number;
    childrenMale: number;
    childrenFemale: number;
    total: number;
}

export interface SessionTemplate {
    sessionName: string;
    sessionTime: string;
}

export interface SessionFormProps {
    totalDays: number;
    retreatDateFrom: string;
    retreatId: string;
    sessions: AttendanceSession[];
    attendanceRecords: AttendanceRecord[];
    onGenerateSessions: (
        sessionsPerFullDay: number,
        templates: SessionTemplate[]
    ) => Promise<void>;
    onSaveAttendance: (records: AttendanceRecord[]) => void;
}

export interface TableColumn<T = unknown> {
    key: string;
    label: string;
    render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T = unknown> {
    columns: TableColumn<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    loading?: boolean;
    pagination?: {
        page: number;
        totalPages: number;
        total?: number;
        onPageChange: (page: number) => void;
    };
}

export interface UseRegistrationsParams {
    retreatId: string | null;
    page: number;
    filters: RegistrationFilters;
}

export interface RegistrationsResponse {
    registrations: Registration[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface RegistrationsDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    registration: Registration | null;
}