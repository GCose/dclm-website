import { useState, useEffect } from "react";
import axios from "axios";
import { NationalityDistribution, UseNationalityDistributionProps } from "@/types/interface/dashboard";

const useNationalityDistribution = ({ year, type }: UseNationalityDistributionProps = {}) => {
    const [distribution, setDistribution] = useState<NationalityDistribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDistribution = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (year) params.append("year", year);
                if (type) params.append("type", type);

                const response = await axios.get(`/api/dashboard/nationality-distribution?${params.toString()}`);
                setDistribution(response.data.distribution);
                setError(null);
            } catch (err) {
                console.error("Error fetching nationality distribution:", err);
                setError("Failed to load nationality distribution");
            } finally {
                setLoading(false);
            }
        };

        fetchDistribution();
    }, [year, type]);

    return { distribution, loading, error, refetch: () => { } };
};

export default useNationalityDistribution;