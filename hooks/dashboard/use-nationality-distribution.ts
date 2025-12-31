import useSWR from "swr";
import axios from "axios";
import { NationalityDistributionResponse, UseNationalityDistributionProps } from "@/types/interface/dashboard";


const fetcher = async (url: string): Promise<NationalityDistributionResponse> => {
    const { data } = await axios.get(url);
    return data;
};

const useNationalityDistribution = ({ year, type }: UseNationalityDistributionProps = {}) => {
    const params = new URLSearchParams();
    if (year) params.append("year", year);
    if (type) params.append("type", type);

    const key = `/api/dashboard/nationality-distribution?${params.toString()}`;

    const { data, error, isLoading, mutate } = useSWR<NationalityDistributionResponse>(
        key,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        }
    );

    return {
        distribution: data?.distribution || [],
        loading: isLoading,
        error: error ? "Failed to load nationality distribution" : null,
        refetch: mutate,
    };
};

export default useNationalityDistribution;