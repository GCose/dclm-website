import axios from "axios";
import { useState, useEffect } from "react";
import { RegistrationTrend } from "@/types/interface/dashboard";

const useRegistrationTrends = () => {
    const [trends, setTrends] = useState<RegistrationTrend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/dashboard/registration-trends");
                setTrends(response.data.trends);
                setError(null);
            } catch (err) {
                console.error("Error fetching registration trends:", err);
                setError("Failed to load registration trends");
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
    }, []);

    return { trends, loading, error };
};

export default useRegistrationTrends;