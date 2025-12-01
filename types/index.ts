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