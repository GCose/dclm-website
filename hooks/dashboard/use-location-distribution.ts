import { useState, useEffect } from "react";
import axios from "axios";
import { LocationDistribution, UseLocationDistributionProps } from "@/types/interface/dashboard";

const useLocationDistribution = ({ year, type }: UseLocationDistributionProps = {}) => {
    const [distribution, setDistribution] = useState<LocationDistribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDistribution = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (year) params.append("year", year);
                if (type) params.append("type", type);

                const response = await axios.get(`/api/dashboard/location-distribution?${params.toString()}`);
                setDistribution(response.data.distribution);
                setError(null);
            } catch (err) {
                console.error("Error fetching location distribution:", err);
                setError("Failed to load location distribution");
            } finally {
                setLoading(false);
            }
        };

        fetchDistribution();
    }, [year, type]);

    return { distribution, loading, error };
};

export default useLocationDistribution;