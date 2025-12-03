import { FormEvent, ReactNode } from "react";

export interface IEvent {
    eventId: string;
    title: string;
    venue: string;
    image: string;
    description?: string;
    date: Date;
}

export interface IAdmin {
    email: string;
    password: string;
}

export interface LayoutProps {
    title?: string;
    children: ReactNode;
    description?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

export interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export interface EventFormData {
    title: string;
    venue: string;
    image: string;
    description: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
}

export interface EventFormProps {
    formData: EventFormData;
    onSubmit: (e: FormEvent) => void;
    onChange: (field: keyof EventFormData, value: string) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    loading: boolean;
    uploading: boolean;
    submitText: string;
}

export interface EventCardProps {
    image: string;
    title: string;
    description?: string;
    venue: string;
    dateFrom: string;
    dateTo?: string;
    timeFrom: string;
    timeTo?: string;
}

export interface Event {
    _id: string;
    title: string;
    venue: string;
    image: string;
    description?: string;
    dateFrom: string;
    dateTo?: string;
    timeFrom: string;
    timeTo?: string;
    createdAt: string;
}

export interface EventSubmitData {
    title: string;
    venue: string;
    image: string;
    description: string;
    dateFrom: string;
    timeFrom: string;
    dateTo?: string;
    timeTo?: string;
}

export interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface EventsResponse {
    events: Event[];
    pagination: PaginationData;
}

export interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
}