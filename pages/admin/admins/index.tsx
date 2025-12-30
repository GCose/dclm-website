import axios from "axios";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { Admin, AdminForm } from "@/types/interface/dashboard";
import Table from "@/components/dashboard/tables/Table";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import ConfirmationModal from "@/components/dashboard/modals/ConfirmationModal";
import EditAdminModal from "@/components/dashboard/modals/EditAdminModal";

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [adminForm, setAdminForm] = useState<AdminForm>({
    email: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admins");
      setAdmins(data.admins || []);
    } catch (error: unknown) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setAdminForm({ email: admin.email });
    setShowEditModal(true);
  };

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      await axios.patch(`/api/admins/${editingAdmin._id}`, adminForm);
      toast.success("Admin updated successfully");
      setShowEditModal(false);
      setEditingAdmin(null);
      setAdminForm({ email: "" });
      fetchAdmins();
    } catch (error: unknown) {
      console.error("Error updating admin:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to update admin");
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;

    try {
      await axios.delete(`/api/admins/${deleteConfirm.id}`);
      toast.success("Admin deleted successfully");
      fetchAdmins();
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
      key: "email",
      label: "Email",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: unknown) => formatDate(value as string),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Admin) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="p-2 text-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row._id);
            }}
            className="p-2 text-burgundy hover:bg-burgundy/10 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

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

        {loading ? (
          <div className="bg-white dark:bg-navy/50 border border-black/10 dark:border-white/10 rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="text-black/60 dark:text-white/60">
                Loading admins...
              </div>
            </div>
          </div>
        ) : (
          <Table
            columns={adminsColumns}
            data={admins}
            emptyMessage="No admin accounts found"
          />
        )}

        <EditAdminModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingAdmin(null);
            setAdminForm({ email: "" });
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
