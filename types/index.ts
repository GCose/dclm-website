import { ReactNode } from "react";

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