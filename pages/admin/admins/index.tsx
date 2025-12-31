import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Table from "@/components/dashboard/tables/Table";
import EditAdminModal from "@/components/dashboard/modals/EditAdminModal";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import { Admin, AdminForm, AdminsResponse } from "@/types/interface/dashboard";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";

const fetcher = async (url: string): Promise<AdminsResponse> => {
  const { data } = await axios.get(url);
  return data;
};

const Admins = () => {
  const { data, error, isLoading, mutate } = useSWR<AdminsResponse>(
    "/api/admins",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [adminForm, setAdminForm] = useState<AdminForm>({
    name: "",
    email: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const admins = data?.admins || [];

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      await axios.patch(`/api/admins/${editingAdmin._id}`, adminForm);
      toast.success("Admin updated successfully");
      setShowEditModal(false);
      setEditingAdmin(null);
      setAdminForm({ name: "", email: "" });
      mutate();
    } catch (error: unknown) {
      console.error("Error updating admin:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to update admin");
      }
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;

    try {
      await axios.delete(`/api/admins/${deleteConfirm.id}`);
      toast.success("Admin deleted successfully");
      mutate();
    } catch (error: unknown) {
      console.error("Error deleting admin:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete admin");
      }
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const adminsColumns = [
    {
      key: "number",
      label: "#",
      render: (_: unknown, __: Admin, index?: number) => (
        <span className="font-bold">{(index ?? 0) + 1}</span>
      ),
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: unknown) => formatDate(value as string),
    },
  ];

  if (error) {
    toast.error("Failed to fetch admins");
  }

  return (
    <DashboardLayout title="Admins">
      <Toaster position="top-right" richColors />
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase text-navy dark:text-white mb-2">
              Admin Accounts
            </h1>
            <p className="text-sm text-black/60 dark:text-white/60">
              {admins.length} admin{admins.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <Table
          columns={adminsColumns}
          data={admins}
          emptyMessage="No admin accounts found"
          loading={isLoading}
        />

        <EditAdminModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingAdmin(null);
            setAdminForm({ name: "", email: "" });
          }}
          onSubmit={handleUpdateAdmin}
          form={adminForm}
          setForm={setAdminForm}
        />

        <ConfirmationModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
          onConfirm={confirmDelete}
          title="Delete Admin"
          message="Are you sure you want to delete this admin account? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </DashboardLayout>
  );
};

export default Admins;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context);
};
