"use client";

import { useMemo, useState, useTransition } from "react";
import { AdminPreorder, fetchAdminPreorders } from "@/actions/admin-preorders.server";
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
  ExternalLink,
  CreditCard,
  RotateCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminPreorderMC({
  initialData,
}: {
  initialData: AdminPreorder[];
}) {
  const router = useRouter();
  const [data, setData] = useState<AdminPreorder[]>(initialData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [isSearchingServer, setIsSearchingServer] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "delivered" | "paid" | "unpaid"
  >("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedOrder, setSelectedOrder] = useState<AdminPreorder | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Server-side email search handler
  const handleServerEmailSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchingServer(true);
    try {
      const res = await fetchAdminPreorders(emailSearch);
      if (res.success && res.data) {
        setData(res.data);
        setCurrentPage(1);
        if (emailSearch.trim()) {
          toast.success(`Found ${res.data.length} pre-order(s) for "${emailSearch.trim()}"`);
        }
      } else {
        toast.error(res.errorMessage || "Failed to search preorders by email");
      }
    } catch (err) {
      toast.error("Error searching preorders");
    } finally {
      setIsSearchingServer(false);
    }
  };

  const handleResetSearch = async () => {
    setEmailSearch("");
    setSearchTerm("");
    setIsSearchingServer(true);
    const res = await fetchAdminPreorders();
    if (res.success && res.data) {
      setData(res.data);
      setCurrentPage(1);
    }
    setIsSearchingServer(false);
  };

  // Stats
  const stats = useMemo(() => {
    const total = data.length;
    const pending = data.filter((d) => d.status?.toLowerCase() === "pending").length;
    const delivered = data.filter((d) => d.status?.toLowerCase() === "delivered").length;
    const paid = data.filter(
      (d) => d.payment_complete || d.payment || d.payment_status === "paid"
    ).length;
    const totalValue = data.reduce((acc, d) => {
      const price = parseFloat(d.total_amount || d.price_at_order || "0") || 0;
      return acc + (d.total_amount ? price : price * (d.quantity || 1));
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
      result = result.filter(
        (d) => d.payment_complete || d.payment || d.payment_status === "paid"
      );
    } else if (activeTab === "unpaid") {
      result = result.filter(
        (d) => !d.payment_complete && !d.payment && d.payment_status !== "paid"
      );
    }

    // Filter by client-side search (buyer name, phone, ref, tracking URL, etc.)
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
          d.product_name?.toLowerCase().includes(q) ||
          d.tracking_url?.toLowerCase().includes(q) ||
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

  /**
   * Helper to ensure the customer tracking link points to the frontend page
   * (e.g. /preorder/track/<token>) instead of the raw backend API URL.
   */
  const getFrontendTrackingUrl = (rawUrl?: string): string => {
    if (!rawUrl) return "";
    // If it's already a relative path or token
    if (rawUrl.startsWith("/")) return rawUrl;

    try {
      // Check if it contains a token at the end or /track/<token>
      const match = rawUrl.match(/\/track\/([^/?#]+)/i);
      const token = match ? match[1] : rawUrl.split("/").filter(Boolean).pop();
      if (token && typeof window !== "undefined") {
        return `${window.location.origin}/preorder/track/${token}`;
      }
      if (token) {
        return `/preorder/track/${token}`;
      }
    } catch {
      // Fallback
    }

    // If it already points to /preorder/track, keep origin if on client
    if (typeof window !== "undefined" && rawUrl.includes("/preorder/track/")) {
      const parts = rawUrl.split("/preorder/track/");
      return `${window.location.origin}/preorder/track/${parts[1]}`;
    }

    return rawUrl;
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
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex flex-col gap-4">
        {/* Row 1: Email Server-Side Search */}
        <form
          onSubmit={handleServerEmailSearch}
          className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center bg-gray-50/70 p-3 rounded-xl border border-gray-200/70"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-primary-deepBlack shrink-0">
            <Mail size={15} className="text-primary-darkRed" />
            <span>Search by Email (Backend):</span>
          </div>
          <div className="relative flex-1">
            <input
              type="email"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              placeholder="e.g. buyer@example.com (supports partial matches)"
              className="w-full pl-3 pr-8 py-1.5 text-xs rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-darkRed/20 focus:border-primary-darkRed text-primary-deepBlack placeholder-gray-400"
            />
            {emailSearch && (
              <button
                type="button"
                onClick={() => setEmailSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isSearchingServer}
              className="px-4 py-1.5 rounded-lg bg-primary-darkRed text-white hover:bg-primary-red text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isSearchingServer ? (
                <>
                  <RotateCw size={12} className="animate-spin" /> Searching…
                </>
              ) : (
                <>
                  <Search size={12} /> Search Email
                </>
              )}
            </button>
            {emailSearch && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Row 2: Tabs, Instant Filter & Layout toggle */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
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

          {/* Quick Filter & Layout toggle */}
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
                placeholder="Filter by name, phone, ref, tracking…"
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
                  <th className="py-3.5 px-4">Financials (Paid / Total)</th>
                  <th className="py-3.5 px-4">Tracking Link</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((order) => {
                  const isDelivered = order.status?.toLowerCase() === "delivered";
                  const totalOrderPrice =
                    (parseFloat(order.price_at_order || "0") || 0) * (order.quantity || 1);

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
                          {order.product_name || `Product #${order.product}`}
                        </span>
                        <div className="text-[11px] text-primary-text_stone_color">
                          Qty: <span className="font-bold">{order.quantity}</span>
                        </div>
                      </td>

                      {/* Financials */}
                      <td className="py-3.5 px-4">
                        <div className={`${dm_mono.className} font-bold text-primary-deepBlack`}>
                          {formatNaira(
                            order.total_amount || totalOrderPrice,
                            true,
                            true
                          )}
                        </div>
                        <div className="text-[11px] text-primary-text_stone_color flex items-center gap-1.5 mt-0.5">
                          <span>Paid:</span>
                          <span className={`${dm_mono.className} font-semibold text-emerald-700`}>
                            {formatNaira(order.amount_paid || (order.payment ? totalOrderPrice : 0), true, true)}
                          </span>
                        </div>
                        {order.balance_due && parseFloat(order.balance_due) > 0 && (
                          <div className="text-[10px] text-rose-600 font-medium">
                            Due: {formatNaira(order.balance_due, true, true)}
                          </div>
                        )}
                        <span
                          className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 capitalize ${
                            order.payment_complete || order.payment || order.payment_status === "paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.payment_status === "partially_paid" || (parseFloat(order.amount_paid || "0") > 0)
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {order.payment_complete
                            ? "Fully Paid"
                            : order.payment_status
                            ? order.payment_status.replace("_", " ")
                            : order.payment
                            ? "Paid"
                            : "Unpaid"}
                        </span>
                      </td>

                      {/* Tracking Link */}
                      <td className="py-3.5 px-4">
                        {order.tracking_url ? (
                          (() => {
                            const feUrl = getFrontendTrackingUrl(order.tracking_url);
                            return (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    copyToClipboard(feUrl);
                                    toast.success("Customer tracking link copied to clipboard!");
                                  }}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg transition-colors"
                                  title="Copy Customer Frontend Tracking Link"
                                >
                                  {copiedRef === feUrl ? (
                                    <>
                                      <Check size={12} className="text-emerald-600" />
                                      <span className="text-emerald-700 font-semibold">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copy Link</span>
                                    </>
                                  )}
                                </button>
                                <a
                                  href={feUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Open Customer Frontend Tracking Page"
                                  className="p-1 text-gray-400 hover:text-primary-darkRed"
                                >
                                  <ExternalLink size={13} />
                                </a>
                              </div>
                            );
                          })()
                        ) : (
                          <span className="text-[11px] text-gray-400">—</span>
                        )}
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
              (parseFloat(order.price_at_order || "0") || 0) * (order.quantity || 1);

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
                  <div className="bg-primary-light_peach rounded-xl p-3 my-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-primary-text_stone_color font-medium block">
                          {order.product_name || `Product #${order.product}`} (×{order.quantity})
                        </span>
                        <div className={`${dm_mono.className} text-base font-bold text-primary-darkRed`}>
                          {formatNaira(order.total_amount || totalOrderPrice, true, true)}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          order.payment_complete || order.payment || order.payment_status === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.payment_status === "partially_paid" || parseFloat(order.amount_paid || "0") > 0
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.payment_complete
                          ? "Fully Paid"
                          : order.payment_status
                          ? order.payment_status.replace("_", " ")
                          : order.payment
                          ? "Payment Confirmed"
                          : "Payment Pending"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-amber-200/50 text-gray-600">
                      <span>
                        Paid:{" "}
                        <strong className="text-emerald-700">
                          {formatNaira(order.amount_paid || (order.payment ? totalOrderPrice : 0), true, true)}
                        </strong>
                      </span>
                      {order.balance_due && parseFloat(order.balance_due) > 0 && (
                        <span>
                          Balance:{" "}
                          <strong className="text-rose-600">
                            {formatNaira(order.balance_due, true, true)}
                          </strong>
                        </span>
                      )}
                    </div>

                    {order.tracking_url && (
                      (() => {
                        const feUrl = getFrontendTrackingUrl(order.tracking_url);
                        return (
                          <div className="pt-1.5 flex items-center justify-between text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                copyToClipboard(feUrl);
                                toast.success("Customer tracking link copied!");
                              }}
                              className="flex items-center gap-1 text-[11px] font-medium text-gray-700 hover:text-primary-darkRed"
                            >
                              {copiedRef === feUrl ? (
                                <>
                                  <Check size={12} className="text-emerald-600" />
                                  <span className="text-emerald-700 font-semibold">Link Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Copy Tracking Link</span>
                                </>
                              )}
                            </button>
                            <a
                              href={feUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-primary-darkRed hover:underline flex items-center gap-0.5"
                            >
                              Track <ExternalLink size={10} />
                            </a>
                          </div>
                        );
                      })()
                    )}
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
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] p-0 rounded-2xl flex flex-col overflow-hidden bg-white border border-gray-100 shadow-xl">
          {selectedOrder && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Sticky Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg font-bold text-primary-deepBlack flex flex-wrap items-center justify-between gap-2 pr-6">
                    <span className="font-mono text-primary-darkRed">
                      Pre-Order #{selectedOrder.id}
                    </span>
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
              </div>

              {/* Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 text-xs">
                {/* Customer Details Section */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-2.5">
                  <h5 className="font-bold text-primary-deepBlack uppercase text-[10px] tracking-wider">
                    Customer Information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-primary-deepBlack">
                    <div>
                      <span className="text-gray-400 text-[10px] block">Full Name</span>
                      <p className="font-semibold text-xs sm:text-sm">{selectedOrder.full_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">Phone Number</span>
                      <p className="font-semibold">
                        <a
                          href={`tel:${selectedOrder.phone}`}
                          className="hover:underline text-primary-darkRed break-all"
                        >
                          {selectedOrder.phone}
                        </a>
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-400 text-[10px] block">Email Address</span>
                      <p className="font-semibold">
                        <a
                          href={`mailto:${selectedOrder.email}`}
                          className="hover:underline text-primary-darkRed break-all"
                        >
                          {selectedOrder.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address Section */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-2">
                  <h5 className="font-bold text-primary-deepBlack uppercase text-[10px] tracking-wider">
                    Delivery Address
                  </h5>
                  <p className="text-primary-deepBlack font-medium leading-relaxed">
                    {selectedOrder.street_address}
                  </p>
                  <p className="text-gray-500">
                    {selectedOrder.city}, {selectedOrder.state},{" "}
                    {selectedOrder.country} ({selectedOrder.zip_code})
                  </p>
                </div>

                {/* Customer Tracking Link (Customer Link with Copy) */}
                {selectedOrder.tracking_url && (
                  (() => {
                    const feTrackingUrl = getFrontendTrackingUrl(selectedOrder.tracking_url);
                    return (
                      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex flex-col gap-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                            <ExternalLink size={13} className="text-emerald-700" />
                            Customer Tracking Link (Frontend)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              copyToClipboard(feTrackingUrl);
                              toast.success("Customer frontend tracking link copied!");
                            }}
                            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-white hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors shadow-2xs self-start sm:self-auto"
                          >
                            {copiedRef === feTrackingUrl ? (
                              <>
                                <Check size={13} className="text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Frontend Link</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={feTrackingUrl}
                            className="w-full text-[11px] font-mono text-gray-700 bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 select-all focus:outline-none truncate"
                          />
                          <a
                            href={feTrackingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-[11px] font-semibold hover:bg-emerald-800 shrink-0 inline-flex items-center justify-center gap-1.5 text-center"
                          >
                            Open <ExternalLink size={12} />
                          </a>
                        </div>
                        <p className="text-[10px] text-emerald-700">
                          Share this frontend link with the buyer so they can view their preorder status and complete remaining installment payments.
                        </p>
                      </div>
                    );
                  })()
                )}

                {/* Order & Payment Financials Card */}
                <div className="bg-primary-light_peach rounded-xl p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-amber-200/50">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-primary-text_stone_color block">
                        Product Details
                      </span>
                      <h4 className="font-bold text-sm text-primary-deepBlack mt-0.5">
                        {selectedOrder.product_name || `Product #${selectedOrder.product}`}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 block">Quantity</span>
                      <span className="font-bold text-sm text-primary-deepBlack">
                        ×{selectedOrder.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
                    <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/40">
                      <span className="text-[10px] text-gray-500 font-medium block">Preorder Total</span>
                      <span className={`${dm_mono.className} font-bold text-sm text-primary-deepBlack`}>
                        {formatNaira(
                          selectedOrder.total_amount ||
                            (parseFloat(selectedOrder.price_at_order || "0") || 0) *
                              (selectedOrder.quantity || 1),
                          true,
                          true
                        )}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/40">
                      <span className="text-[10px] text-emerald-700 font-medium block">Amount Paid</span>
                      <span className={`${dm_mono.className} font-bold text-sm text-emerald-700`}>
                        {formatNaira(selectedOrder.amount_paid || "0", true, true)}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/40">
                      <span className="text-[10px] text-rose-700 font-medium block">Balance Due</span>
                      <span className={`${dm_mono.className} font-bold text-sm text-rose-600`}>
                        {formatNaira(selectedOrder.balance_due || "0", true, true)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-amber-200/50 text-gray-600 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span>Payment Status:</span>
                      <span
                        className={`font-semibold capitalize px-2 py-0.5 rounded text-[10px] ${
                          selectedOrder.payment_complete || selectedOrder.payment || selectedOrder.payment_status === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : selectedOrder.payment_status === "partially_paid" || parseFloat(selectedOrder.amount_paid || "0") > 0
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {selectedOrder.payment_complete
                          ? "Payment Complete (Fully Paid)"
                          : selectedOrder.payment_status
                          ? selectedOrder.payment_status.replace("_", " ")
                          : selectedOrder.payment
                          ? "Paid (Confirmed)"
                          : "Unpaid / Pending"}
                      </span>
                    </div>

                    {selectedOrder.reference && (
                      <div className="flex items-center gap-1 font-mono text-primary-deepBlack text-[10px]">
                        <span className="text-gray-500">Ref:</span>
                        <span className="truncate max-w-[120px]" title={selectedOrder.reference}>
                          {selectedOrder.reference}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(selectedOrder.reference!)}
                          className="text-gray-400 hover:text-gray-700 p-0.5"
                        >
                          {copiedRef === selectedOrder.reference ? (
                            <Check size={12} className="text-emerald-600" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-gray-500 text-right">
                    Ordered: {formatDate(selectedOrder.created_at)}
                  </div>
                </div>

                {/* Payments Attempts List */}
                {selectedOrder.payments && selectedOrder.payments.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-2.5">
                    <h5 className="font-bold text-primary-deepBlack uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <CreditCard size={13} className="text-primary-darkRed" />
                      Recorded Payment Attempts ({selectedOrder.payments.length})
                    </h5>
                    <div className="divide-y divide-gray-200">
                      {selectedOrder.payments.map((p, idx) => (
                        <div
                          key={p.id || idx}
                          className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary-deepBlack text-xs">
                                {formatNaira(p.amount, true, true)}
                              </span>
                              <span
                                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded capitalize ${
                                  p.status?.toLowerCase() === "paid" || p.status?.toLowerCase() === "success"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {p.status}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500 block mt-0.5">
                              {p.paid_at ? `Paid: ${formatDate(p.paid_at)}` : `Created: ${formatDate(p.created_at)}`}
                            </span>
                          </div>
                          {p.reference && (
                            <div className="flex items-center gap-1.5 font-mono text-[10px] bg-white px-2 py-1 rounded border border-gray-200 self-start sm:self-auto">
                              <span className="truncate max-w-[140px]" title={p.reference}>
                                {p.reference}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  copyToClipboard(p.reference);
                                  toast.success("Payment reference copied!");
                                }}
                                className="text-gray-400 hover:text-gray-700 p-0.5"
                              >
                                {copiedRef === p.reference ? (
                                  <Check size={11} className="text-emerald-600" />
                                ) : (
                                  <Copy size={11} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note */}
                {selectedOrder.note && (
                  <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-1">
                      <FileText size={13} />
                      Customer Note:
                    </div>
                    <p className="text-amber-900 leading-relaxed text-xs">
                      {selectedOrder.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 sticky bottom-0 z-10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
                <DeliverPreorderBtn
                  preorderId={selectedOrder.id}
                  status={selectedOrder.status}
                  onSuccess={() => handleOrderDelivered(selectedOrder.id)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
