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
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    createdAt: string;
}