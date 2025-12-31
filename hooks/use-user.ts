import useSWR from "swr";
import axios from "axios";
import { UserProfile } from "@/types/interface/dashboard";

const fetcher = async (url: string): Promise<UserProfile> => {
    const { data } = await axios.get(url);
    return data;
};

export const useUser = () => {
    const { data, error, isLoading, mutate } = useSWR<UserProfile>(
        "/api/auth/profile",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
        }
    );

    return {
        user: data || null,
        name: data?.name || "",
        email: data?.email || "",
        loading: isLoading,
        error,
        refreshUser: mutate,
    };
};