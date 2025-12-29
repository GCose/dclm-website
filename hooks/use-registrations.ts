import useSWR from "swr";
import axios from "axios";
import { RegistrationsResponse, UseRegistrationsParams } from "@/types/interface/dashboard";


const fetcher = async (url: string): Promise<RegistrationsResponse> => {
    const { data } = await axios.get(url);
    return data;
};

export const useRegistrations = ({ retreatId, page, filters }: UseRegistrationsParams) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: "20",
    });

    if (retreatId) params.append("retreatId", retreatId);
    if (filters.gender) params.append("gender", filters.gender);
    if (filters.category) params.append("category", filters.category);
    if (filters.nationality) params.append("nationality", filters.nationality);
    if (filters.invitedBy) params.append("invitedBy", filters.invitedBy);
    if (filters.dayRegistered) params.append("dayRegistered", filters.dayRegistered);

    const key = retreatId ? `/api/registrations?${params.toString()}` : null;

    const { data, error, isLoading, mutate } = useSWR<RegistrationsResponse>(key, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });

    return {
        registrations: data?.registrations || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || 1,
        totalPages: data?.pagination?.totalPages || 1,
        isLoading,
        isError: error,
        refresh: mutate,
    };
};