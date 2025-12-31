import useSWR from "swr";
import axios from "axios";
import { DashboardStats } from "@/types/interface/dashboard";

const fetcher = async (url: string): Promise<DashboardStats> => {
    const { data } = await axios.get(url);
    return data;
};

const useDashboardStats = () => {
    const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
        "/api/dashboard/stats",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    return {
        stats: data || null,
        loading: isLoading,
        error: error ? "Failed to load dashboard stats" : null,
        refresh: mutate,
    };
};

export default useDashboardStats;