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

export interface Registration {
    _id: string;
    retreatId: string;
    name: string;
    gender: string;
    address: string;
    phone: string;
    nationality: string;
    invitedBy: string;
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
    invitedBy: string;
    age: number;
    dayRegistered: number;
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

export interface SessionFormData {
    sessionName: string;
    sessionTime: string;
}

export interface CreateRetreatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: RetreatForm;
    setForm: React.Dispatch<React.SetStateAction<RetreatForm>>;
}

export interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: RegistrationForm;
    setForm: React.Dispatch<React.SetStateAction<RegistrationForm>>;
    totalDays: number;
}

export interface EditRetreatFormProps {
    onSubmit: (e: React.FormEvent) => void;
    form: RetreatForm;
    setForm: React.Dispatch<React.SetStateAction<RetreatForm>>;
}

export interface SessionFormProps {
    totalDays: number;
    retreatDateFrom: string;
    retreatId: string;
    sessions: AttendanceSession[];
    attendanceRecords: AttendanceRecord[];
    onGenerateSessions: (sessionsPerFullDay: number, templates: SessionTemplate[]) => Promise<void>;
    onSaveAttendance: (records: AttendanceRecord[]) => void;
}

export interface RegistrationsTableProps {
    registrations: Registration[];
    onAdd: () => void;
    onDelete: (id: string) => void;
}