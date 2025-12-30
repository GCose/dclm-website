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
    status: "upcoming" | "ongoing" | "completed";
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
    totalDays: number;
    dateFrom: string;
    dateTo: string;
    venue: string;
    theme: string;
}

export interface RetreatFilters {
    year: string;
    type: string;
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
    location: string;
    phone: string;
    nationality: string;
    invitedBy: string;
    category: string;
    age: string;
    dayRegistered: number;
    createdAt: string;
}

export interface RegistrationForm {
    name: string;
    gender: "Male" | "Female";
    location: string;
    phone: string;
    nationality: string;
    invitedBy: "Invited" | "Member" | "Worker";
    category: "Adult" | "Campus" | "Youth" | "Children";
    age: string;
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

export type Category = "Adult" | "Youth" | "Campus" | "Children";

export interface AttendanceSession {
    _id: string;
    retreatId: string;
    category: Category;
    sessionNumber: number;
    day: number;
    date: string;
    sessionName: string;
    sessionTime: string;
    isGSMessage: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AttendanceRecord {
    _id?: string;
    sessionId: string;
    male: number;
    female: number;
    total: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface SessionTemplate {
    sessionNumber: number;
    startTime: string;
    endTime: string;
    adultName: string;
    youthName: string;
    campusName: string;
    childrenName: string;
}

export interface SessionSetupData {
    totalSessions: number;
    templates: SessionTemplate[];
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
    render?: (value: unknown, row: T, index?: number) => ReactNode;
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

export interface EditSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: AttendanceSession | null;
    onSave: (sessionId: string, updates: Partial<AttendanceSession>) => Promise<void>;
}

export interface AttendanceEntryProps {
    retreat: Retreat;
    sessions: AttendanceSession[];
    attendanceRecords: AttendanceRecord[];
    onRefresh: () => void;
}

export interface DaySelectorProps {
    selectedDay: number;
    totalDays: number;
    onDayChange: (day: number) => void;
}

export interface CategoryTabsProps {
    selectedCategory: Category;
    onCategoryChange: (category: Category) => void;
}

export interface SessionRowProps {
    session: AttendanceSession;
    attendance: Partial<AttendanceRecord>;
    onAttendanceChange: (field: "male" | "female", value: number) => void;
    onEditSession: (session: AttendanceSession) => void;
    onDeleteSession: (sessionId: string) => void;
}

export interface SessionSetupFormProps {
    totalDays: number;
    onGenerate: (templates: SessionTemplate[]) => Promise<void>;
    existingTemplates?: SessionTemplate[];
}

export interface CategoryAttendanceTableProps {
    category: Category;
    day: number;
    sessions: AttendanceSession[];
    attendanceRecords: AttendanceRecord[];
    onSaveAttendance: (records: Partial<AttendanceRecord>[]) => Promise<void>;
    onEditSession: (session: AttendanceSession) => void;
    onDeleteClick: (sessionId: string) => void;
}

export interface SessionsAndAttendanceTabProps {
    retreat: Retreat;
    sessions: AttendanceSession[];
    attendanceRecords: AttendanceRecord[];
    onRefresh: () => void;
}

export interface CategorySessionTemplate {
    sessionNumber: number;
    startTime: string;
    endTime: string;
    name: string;
}

export interface CategorySessionConfig {
    category: "Adult" | "Campus" | "Youth" | "Children";
    sessionCount: number;
    templates: CategorySessionTemplate[];
}

export interface SessionSetupState {
    step: "counts" | "define";
    configs: {
        Adult: CategorySessionConfig;
        Campus: CategorySessionConfig;
        Youth: CategorySessionConfig;
        Children: CategorySessionConfig;
    };
}

export interface SessionCountsStepProps {
    counts: Record<Category, number>;
    onCountsChange: (counts: Record<Category, number>) => void;
    onNext: () => void;
}

export interface CategorySessionDefineStepProps {
    counts: Record<Category, number>;
    categoryTemplates: Record<Category, CategorySessionTemplate[]>;
    onTemplatesChange: (
        category: Category,
        templates: CategorySessionTemplate[]
    ) => void;
    onGenerate: () => void;
    onBack: () => void;
    generating: boolean;
    editMode?: boolean;
}

export interface EditRetreatFormProps {
    onSubmit: (e: React.FormEvent) => void;
    form: RetreatForm;
    setForm: React.Dispatch<React.SetStateAction<RetreatForm>>;
}

export interface Admin {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminForm {
    email: string;
}

export interface EditAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: AdminForm;
    setForm: React.Dispatch<React.SetStateAction<AdminForm>>;
}