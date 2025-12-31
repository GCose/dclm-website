import useSWR from "swr";
import axios from "axios";
import { RegistrationTrendsResponse } from "@/types/interface/dashboard";

const fetcher = async (url: string): Promise<RegistrationTrendsResponse> => {
    const { data } = await axios.get(url);
    return data;
};

const useRegistrationTrends = () => {
    const { data, error, isLoading, mutate } = useSWR<RegistrationTrendsResponse>(
        "/api/dashboard/registration-trends",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    return {
        trends: data?.trends || [],
        loading: isLoading,
        error: error ? "Failed to load registration trends" : null,
        refresh: mutate,
    };
};

export default useRegistrationTrends;