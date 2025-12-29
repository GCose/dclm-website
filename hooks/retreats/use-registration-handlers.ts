import axios from "axios";
import { toast } from "sonner";
import { Registration, RegistrationForm, Retreat } from "@/types/interface/dashboard";

export const useRegistrationHandlers = (
    selectedRetreat: Retreat | null,
    refreshRegistrations: () => void
) => {
    const handleCreateRegistration = async (
        e: React.FormEvent,
        regForm: RegistrationForm,
        setShowRegModal: (show: boolean) => void,
        resetRegForm: () => void
    ) => {
        e.preventDefault();
        if (!selectedRetreat) return;
        try {
            await axios.post("/api/registrations", {
                ...regForm,
                retreatId: selectedRetreat._id,
            });
            toast.success("Registration added");
            setShowRegModal(false);
            resetRegForm();
            refreshRegistrations();
        } catch (error: unknown) {
            console.error("Error creating registration:", error);
            toast.error("Failed to add registration");
        }
    };

    const handleEditRegistration = (
        registration: Registration,
        setEditingRegistration: (reg: Registration) => void,
        setRegForm: (form: RegistrationForm) => void,
        setShowEditRegModal: (show: boolean) => void
    ) => {
        setEditingRegistration(registration);
        setRegForm({
            name: registration.name,
            gender: registration.gender as "Male" | "Female",
            address: registration.address,
            phone: registration.phone,
            nationality: registration.nationality,
            invitedBy: registration.invitedBy as "Invited" | "Member" | "Worker",
            category: registration.category as
                | "Adult"
                | "Campus"
                | "Youth"
                | "Children",
            age: registration.age,
            dayRegistered: registration.dayRegistered,
        });
        setShowEditRegModal(true);
    };

    const handleUpdateRegistration = async (
        e: React.FormEvent,
        editingRegistration: Registration | null,
        regForm: RegistrationForm,
        setShowEditRegModal: (show: boolean) => void,
        setEditingRegistration: (reg: Registration | null) => void,
        resetRegForm: () => void
    ) => {
        e.preventDefault();
        if (!editingRegistration) return;
        try {
            await axios.patch(
                `/api/registrations/${editingRegistration._id}`,
                regForm
            );
            toast.success("Registration updated");
            setShowEditRegModal(false);
            setEditingRegistration(null);
            resetRegForm();
            refreshRegistrations();
        } catch (error: unknown) {
            console.error("Error updating registration:", error);
            toast.error("Failed to update registration");
        }
    };

    const confirmDeleteRegistration = async (
        deleteRegistrationConfirm: { id: string | null },
        setDeleteRegistrationConfirm: (confirm: { isOpen: boolean; id: string | null }) => void
    ) => {
        if (!deleteRegistrationConfirm.id) return;

        try {
            await axios.delete(`/api/registrations/${deleteRegistrationConfirm.id}`);
            toast.success("Registration deleted");
            refreshRegistrations();
        } catch (error: unknown) {
            console.error("Error deleting registration:", error);
            toast.error("Failed to delete registration");
        } finally {
            setDeleteRegistrationConfirm({ isOpen: false, id: null });
        }
    };

    return {
        handleCreateRegistration,
        handleEditRegistration,
        handleUpdateRegistration,
        confirmDeleteRegistration,
    };
};