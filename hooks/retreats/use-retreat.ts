import axios from "axios";
import { toast } from "sonner";
import { Retreat, RetreatForm } from "@/types/interface/dashboard";

const useRetreats = (
    fetchRetreats: (page: number) => Promise<void>,
    retreatsPage: number,
    setSelectedRetreat: (retreat: Retreat | null) => void,
    selectedRetreat: Retreat | null
) => {
    const handleCreateRetreat = async (
        e: React.FormEvent,
        retreatForm: RetreatForm,
        resetRetreatForm: () => void,
        setShowCreateModal: (show: boolean) => void
    ) => {
        e.preventDefault();
        try {
            await axios.post("/api/retreats", retreatForm);
            toast.success("Retreat created successfully");
            setShowCreateModal(false);
            resetRetreatForm();
            fetchRetreats(retreatsPage);
        } catch (error: unknown) {
            console.error("Error creating retreat:", error);
            toast.error("Failed to create retreat");
        }
    };

    const handleUpdateRetreat = async (
        e: React.FormEvent,
        retreatForm: RetreatForm
    ) => {
        e.preventDefault();
        if (!selectedRetreat) return;
        try {
            await axios.patch(`/api/retreats/${selectedRetreat._id}`, retreatForm);
            toast.success("Retreat updated successfully");

            const retreatRes = await axios.get(`/api/retreats/${selectedRetreat._id}`);
            setSelectedRetreat(retreatRes.data);
            fetchRetreats(retreatsPage);
        } catch (error: unknown) {
            console.error("Error updating retreat:", error);
            toast.error("Failed to update retreat");
        }
    };

    const confirmDeleteRetreat = async (
        deleteRetreatConfirm: { id: string | null },
        setDeleteRetreatConfirm: (confirm: { isOpen: boolean; id: string | null }) => void
    ) => {
        if (!deleteRetreatConfirm.id) return;

        try {
            await axios.delete(`/api/retreats/${deleteRetreatConfirm.id}`);
            toast.success("Retreat deleted");

            fetchRetreats(retreatsPage);

            if (selectedRetreat?._id === deleteRetreatConfirm.id) {
                setSelectedRetreat(null);
            }
        } catch (error: unknown) {
            console.error("Error deleting retreat:", error);
            toast.error("Failed to delete retreat");
        } finally {
            setDeleteRetreatConfirm({ isOpen: false, id: null });
        }
    };

    return {
        handleCreateRetreat,
        handleUpdateRetreat,
        confirmDeleteRetreat,
    };
};

export default useRetreats;