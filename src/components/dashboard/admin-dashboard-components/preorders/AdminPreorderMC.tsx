"use client";

import { useMemo, useState } from "react";
import { AdminPreorder } from "@/actions/admin-preorders.server";
import { Pagination } from "@/components/dashboard/Pagination";
import DeliverPreorderBtn from "./DeliverPreorderBtn";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { dm_mono, inter } from "@/fonts";
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  MapPin,
  Phone,
  Mail,
  FileText,
  DollarSign,
  LayoutGrid,
  List,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function AdminPreorderMC({
  initialData,
}: {
  initialData: AdminPreorder[];
}) {
  const router = useRouter();
  const [data, setData] = useState<AdminPreorder[]>(initialData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "delivered" | "paid" | "unpaid"
  >("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedOrder, setSelectedOrder] = useState<AdminPreorder | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Stats
  const stats = useMemo(() => {
    const total = data.length;
    const pending = data.filter((d) => d.status?.toLowerCase() === "pending").length;
    const delivered = data.filter((d) => d.status?.toLowerCase() === "delivered").length;
    const paid = data.filter((d) => d.payment).length;
    const totalValue = data.reduce((acc, d) => {
      const price = parseFloat(d.price_at_order) || 0;
      return acc + price * (d.quantity || 1);
    }, 0);

    return { total, pending, delivered, paid, totalValue };
  }, [data]);

  // Filtered data
  const filteredData = useMemo(() => {
    let result = data;

    // Filter by tab
    if (activeTab === "pending") {
      result = result.filter((d) => d.status?.toLowerCase() === "pending");
    } else if (activeTab === "delivered") {
      result = result.filter((d) => d.status?.toLowerCase() === "delivered");
    } else if (activeTab === "paid") {
      result = result.filter((d) => d.payment);
    } else if (activeTab === "unpaid") {
      result = result.filter((d) => !d.payment);
    }

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
          d.full_name?.toLowerCase().includes(q) ||
          d.email?.toLowerCase().includes(q) ||
          d.phone?.toLowerCase().includes(q) ||
          d.reference?.toLowerCase().includes(q) ||
          d.city?.toLowerCase().includes(q) ||
          d.state?.toLowerCase().includes(q) ||
          String(d.id).includes(q) ||
          String(d.product).includes(q)
      );
    }

    return result;
  }, [data, activeTab, searchTerm]);

  // Paginated data
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredData, currentPage, rowsPerPage]);

  const handleOrderDelivered = (orderId: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: "delivered" } : item
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: "delivered" } : null));
    }
    router.refresh();
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedRef(text);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`${inter.className} pb-16`}>
      {/* ── Top Summary Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-text_stone_color uppercase tracking-wider">
              Total Pre-Orders
            </p>
            <h3 className={`${dm_mono.className} text-2xl font-bold text-primary-deepBlack mt-1`}>
              {stats.total}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-light_peach flex items-center justify-center text-primary-darkRed">
            <Package size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-text_stone_color uppercase tracking-wider">
              Pending Delivery
            </p>
            <h3 className={`${dm_mono.className} text-2xl font-bold text-amber-600 mt-1`}>
              {stats.pending}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-text_stone_color uppercase tracking-wider">
              Delivered
            </p>
            <h3 className={`${dm_mono.className} text-2xl font-bold text-emerald-600 mt-1`}>
              {stats.delivered}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-text_stone_color uppercase tracking-wider">
              Total Value
            </p>
            <h3 className={`${dm_mono.className} text-xl md:text-2xl font-bold text-primary-darkRed mt-1 truncate max-w-[170px]`}>
              {formatNaira(stats.totalValue, true, true)}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-primary-darkRed">
            <DollarSign size={22} />
          </div>
        </div>
      </div>

      {/* ── Controls Strip: Tabs, Search, View Mode ── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All", count: stats.total },
            { id: "pending", label: "Pending", count: stats.pending },
            { id: "delivered", label: "Delivered", count: stats.delivered },
            { id: "paid", label: "Paid", count: stats.paid },
            { id: "unpaid", label: "Unpaid", count: stats.total - stats.paid },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-primary-darkRed text-white shadow-sm"
                  : "bg-gray-100 text-primary-text_stone_color hover:bg-gray-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Layout toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search buyer, phone, ref, city…"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-darkRed/20 focus:border-primary-darkRed text-primary-deepBlack placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-gray-100 p-0.5 rounded-xl">
            <button
              onClick={() => setViewMode("table")}
              title="Table view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table"
                  ? "bg-white text-primary-darkRed shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-primary-darkRed shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content View ── */}
      {paginatedData.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
          <Package size={44} className="text-gray-300 mb-3" />
          <h3 className="text-base font-semibold text-primary-deepBlack">
            No Pre-Orders Found
          </h3>
          <p className="text-xs text-primary-text_stone_color mt-1 max-w-sm">
            {searchTerm
              ? `No pre-orders match "${searchTerm}". Try a different search term or filter.`
              : "There are currently no pre-orders recorded in this view."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* ── TABLE VIEW ── */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-primary-text_stone_color uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Product / Qty</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Reference</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((order) => {
                  const isDelivered = order.status?.toLowerCase() === "delivered";
                  const totalOrderPrice =
                    (parseFloat(order.price_at_order) || 0) * (order.quantity || 1);

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-primary-darkRed">
                        #{order.id}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-primary-deepBlack">
                          {order.full_name}
                        </div>
                        <div className="text-[11px] text-primary-text_stone_color">
                          {order.email}
                        </div>
                        <div className="text-[11px] text-primary-text_stone_color">
                          {order.phone}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="truncate text-primary-deepBlack">
                          {order.street_address}
                        </div>
                        <div className="text-[11px] text-primary-text_stone_color">
                          {order.city}, {order.state}
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-primary-deepBlack">
                          Product #{order.product}
                        </span>
                        <div className="text-[11px] text-primary-text_stone_color">
                          Qty: <span className="font-bold">{order.quantity}</span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4">
                        <div className={`${dm_mono.className} font-bold text-primary-deepBlack`}>
                          {formatNaira(totalOrderPrice, true, true)}
                        </div>
                        <span
                          className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
                            order.payment
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.payment ? "Paid" : "Unpaid"}
                        </span>
                      </td>

                      {/* Reference */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600 bg-gray-100 px-2 py-1 rounded max-w-fit">
                          <span className="truncate max-w-[100px]" title={order.reference}>
                            {order.reference || "N/A"}
                          </span>
                          {order.reference && (
                            <button
                              onClick={() => copyToClipboard(order.reference)}
                              title="Copy reference"
                              className="text-gray-400 hover:text-gray-700"
                            >
                              {copiedRef === order.reference ? (
                                <Check size={12} className="text-emerald-600" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                            isDelivered
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {isDelivered ? (
                            <CheckCircle2 size={11} />
                          ) : (
                            <Clock size={11} />
                          )}
                          {order.status || "pending"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-primary-text_stone_color whitespace-nowrap text-[11px]">
                        {formatDate(order.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            title="View Full Details"
                            className="p-1.5 text-gray-500 hover:text-primary-darkRed hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <DeliverPreorderBtn
                            preorderId={order.id}
                            status={order.status}
                            onSuccess={() => handleOrderDelivered(order.id)}
                            compact
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ── GRID CARD VIEW ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedData.map((order) => {
            const isDelivered = order.status?.toLowerCase() === "delivered";
            const totalOrderPrice =
              (parseFloat(order.price_at_order) || 0) * (order.quantity || 1);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary-darkRed">
                        Order #{order.id}
                      </span>
                      <h4 className="text-sm font-bold text-primary-deepBlack mt-0.5">
                        {order.full_name}
                      </h4>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                        isDelivered
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {isDelivered ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {order.status || "pending"}
                    </span>
                  </div>

                  {/* Customer Contact */}
                  <div className="py-3 flex flex-col gap-1.5 text-xs text-primary-text_stone_color">
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-gray-400 shrink-0" />
                      <span className="truncate">{order.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-gray-400 shrink-0" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">
                        {order.street_address}, {order.city}, {order.state}
                      </span>
                    </div>
                  </div>

                  {/* Product & Pricing box */}
                  <div className="bg-primary-light_peach rounded-xl p-3 my-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-primary-text_stone_color font-medium">
                        Product #{order.product} (×{order.quantity})
                      </span>
                      <div className={`${dm_mono.className} text-base font-bold text-primary-darkRed`}>
                        {formatNaira(totalOrderPrice, true, true)}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        order.payment
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.payment ? "Payment Confirmed" : "Payment Pending"}
                    </span>
                  </div>

                  {/* Note if any */}
                  {order.note && (
                    <div className="mt-2 text-xs bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-gray-600 line-clamp-2">
                      <strong className="text-primary-deepBlack">Note: </strong>
                      {order.note}
                    </div>
                  )}
                </div>

                {/* Card footer actions */}
                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs text-primary-text_stone_color hover:text-primary-darkRed font-semibold flex items-center gap-1"
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                  <DeliverPreorderBtn
                    preorderId={order.id}
                    status={order.status}
                    onSuccess={() => handleOrderDelivered(order.id)}
                    compact
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {filteredData.length > 0 && (
        <div className="mt-8">
          <Pagination
            totalItems={filteredData.length}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* ── Full Details Dialog Modal ── */}
      <Dialog
        open={Boolean(selectedOrder)}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        <DialogContent className="max-w-lg p-6 rounded-2xl">
          {selectedOrder && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-primary-deepBlack flex items-center justify-between">
                  <span>Pre-Order #{selectedOrder.id}</span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      selectedOrder.status?.toLowerCase() === "delivered"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {selectedOrder.status || "pending"}
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-5 mt-4 text-xs">
                {/* Customer Details Section */}
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 flex flex-col gap-2">
                  <h5 className="font-bold text-primary-deepBlack uppercase text-[10px] tracking-wider">
                    Customer Information
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-primary-deepBlack">
                    <div>
                      <span className="text-gray-400 text-[10px]">Name</span>
                      <p className="font-semibold">{selectedOrder.full_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px]">Phone</span>
                      <p className="font-semibold">
                        <a
                          href={`tel:${selectedOrder.phone}`}
                          className="hover:underline text-primary-darkRed"
                        >
                          {selectedOrder.phone}
                        </a>
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 text-[10px]">Email</span>
                      <p className="font-semibold">
                        <a
                          href={`mailto:${selectedOrder.email}`}
                          className="hover:underline text-primary-darkRed"
                        >
                          {selectedOrder.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address Section */}
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 flex flex-col gap-2">
                  <h5 className="font-bold text-primary-deepBlack uppercase text-[10px] tracking-wider">
                    Delivery Address
                  </h5>
                  <p className="text-primary-deepBlack font-medium">
                    {selectedOrder.street_address}
                  </p>
                  <p className="text-gray-500">
                    {selectedOrder.city}, {selectedOrder.state},{" "}
                    {selectedOrder.country} ({selectedOrder.zip_code})
                  </p>
                </div>

                {/* Order & Payment Details */}
                <div className="bg-primary-light_peach rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-text_stone_color font-medium">
                      Product ID #{selectedOrder.product} (×{selectedOrder.quantity})
                    </span>
                    <span className="text-primary-deepBlack font-semibold">
                      {formatNaira(
                        (parseFloat(selectedOrder.price_at_order) || 0) *
                          (selectedOrder.quantity || 1),
                        true,
                        true
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 text-[11px] pt-2 border-t border-amber-200/50">
                    <span>Unit Price at Order:</span>
                    <span className={dm_mono.className}>
                      {formatNaira(selectedOrder.price_at_order, true, true)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 text-[11px]">
                    <span>Payment Status:</span>
                    <span
                      className={`font-semibold ${
                        selectedOrder.payment ? "text-emerald-700" : "text-amber-700"
                      }`}
                    >
                      {selectedOrder.payment ? "Paid (Confirmed)" : "Unpaid"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 text-[11px]">
                    <span>Paystack Reference:</span>
                    <div className="flex items-center gap-1 font-mono text-primary-deepBlack">
                      <span>{selectedOrder.reference || "None"}</span>
                      {selectedOrder.reference && (
                        <button
                          onClick={() => copyToClipboard(selectedOrder.reference)}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          {copiedRef === selectedOrder.reference ? (
                            <Check size={12} className="text-emerald-600" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 text-[11px]">
                    <span>Order Placed:</span>
                    <span>{formatDate(selectedOrder.created_at)}</span>
                  </div>
                </div>

                {/* Note */}
                {selectedOrder.note && (
                  <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-amber-800 font-semibold mb-1">
                      <FileText size={13} />
                      Customer Note:
                    </div>
                    <p className="text-amber-900 leading-relaxed">
                      {selectedOrder.note}
                    </p>
                  </div>
                )}

                {/* Action button in modal */}
                <div className="pt-2 flex justify-end gap-2">
                  <DeliverPreorderBtn
                    preorderId={selectedOrder.id}
                    status={selectedOrder.status}
                    onSuccess={() => handleOrderDelivered(selectedOrder.id)}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
