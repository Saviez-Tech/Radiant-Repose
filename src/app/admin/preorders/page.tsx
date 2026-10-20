import { fetchAdminPreorders } from "@/actions/admin-preorders.server";
import AdminPreorderMC from "@/components/dashboard/admin-dashboard-components/preorders/AdminPreorderMC";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pre-Orders Management | Radiant Repose Admin",
  description: "View and manage customer pre-orders and mark them as delivered.",
};

export default async function AdminPreordersPage() {
  const { success, data, errorMessage } = await fetchAdminPreorders();

  if (!success) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl my-6">
        <h3 className="text-red-700 font-semibold mb-1">
          Error Loading Pre-Orders
        </h3>
        <p className="text-red-600 text-sm">
          {errorMessage || "Failed to load pre-orders. Please check your session or network."}
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <AdminPreorderMC initialData={data || []} />
    </div>
  );
}
