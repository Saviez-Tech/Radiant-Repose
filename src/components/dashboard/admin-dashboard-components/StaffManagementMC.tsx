"use client"

import AddNewStaffBtn from "@/components/buttons/AddNewStaffBtn";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../Pagination";
import { sampleStaffData } from "@/components-data/sample-data";
import { Icon } from "@iconify/react/dist/iconify.js";
import DestructiveActionPrompt from "@/components/modals/DestructiveActionPrompt";
import { useRouter } from "next/navigation";
import DestructiveActionPromptSuccess from "@/components/modals/DestructiveActionPromptSuccess";


export default function StaffManagementMC({ data }: { data: Staff[] }) {

    const [selectedFilter, setSelectedFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    const [showConfirmModal,setShowConfirmModal] = useState(false)
    const [showSuccessModal,setShowSuccessModal] = useState(false)

    const router = useRouter()

    const onConfirmDeactivateAccount = async() => {
        setShowConfirmModal(false)
    }
    
    const onCancelAction = async () => {
        setShowConfirmModal(false)
    }

    // Apply filter function
    const applyFilter = (staffList: Staff[], filter: string) => {
        switch (filter) {
        case 'active':
            return staffList.filter(staff => staff.status === 'Active')
        case 'inactive':
            return staffList.filter(staff => staff.status === 'Inactive')
        case 'all':
        default:
            return staffList;
        }
    }

    // Apply filter immediately using useMemo
    const filteredStaff = useMemo(() => {
        return applyFilter(data, selectedFilter)
    }, [data, selectedFilter])
    
    // Calculate pagination
    const paginatedStaff = useMemo(() => {
        return filteredStaff.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
    }, [filteredStaff, currentPage, rowsPerPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedFilter])
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    
    // Handle rows per page change
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }

    return (
        <div className="w-full py-8">
            <div className="flex justify-between flex-wrap gap-8 items-center mb-4">
                <h2 className="font-medium text-primary-deepBlack">Staff List View</h2>
                <AddNewStaffBtn />
            </div>
            
            <div className="overflow-x-auto rounded-md mt-8">
                <table className="table-auto w-full text-primary-dark_gray text-[0.85rem]">
                    <thead className="bg-[#F8F8F8]">
                        <tr>
                            <th className="text-left p-4 font-semibold text-primary-dark_gray">Staff Name</th>
                            <th className="text-left p-4 font-semibold text-primary-dark_gray">Staff ID</th>
                            <th className="text-left p-4 font-semibold text-primary-dark_gray">Phone Number</th>
                            <th className="text-left p-4 font-semibold text-primary-dark_gray">Store Location</th>
                            <th className="text-center p-4 font-semibold text-primary-dark_gray">Status</th>
                            <th className="text-center p-4 font-semibold text-primary-dark_gray">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedStaff.length > 0 ? (
                            paginatedStaff.map((staff) => (
                                <tr key={staff.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 min-w-40">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src="/icons/cashier.svg"
                                                alt={staff.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full shadow object-cover"
                                            />
                                            <span className="text-[0.85rem] text-gray-700">{staff.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[0.85rem] text-primary-dark_gray">{staff.user}</td>
                                    <td className="p-4 text-[0.85rem] text-primary-dark_gray">{staff.phone_number}</td>
                                    <td className="p-4 text-[0.85rem] text-primary-dark_gray max-w-xs">
                                        <p className="truncate">{staff.branch.location}</p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-5 py-[6px] text-xs rounded-lg ${
                                        staff.status === 'Active' 
                                            ? 'bg-green-100 text-[#33CC33]' 
                                            : 'bg-gray-100 text-primary-dark_gray/50'
                                        }`}>
                                        {staff.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                onClick={() => router.push("/staff-management/edit-staff")}
                                                className="w-7 h-7 bg-primary-yellow text-primary-base_color1 rounded-full flex items-center justify-center 
                                                        hover:bg-yellow-400 active:scale-95 transition duration-200"
                                            >
                                                <Icon icon="iconamoon:edit-light" width="19" height="19" />
                                            </button>

                                            <button 
                                                onClick={() => setShowConfirmModal(true)}
                                                className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center 
                                                        hover:bg-red-600 active:scale-95 transition duration-200"
                                            >
                                                <span className="text-white">✖</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-t">
                                <td colSpan={6} className="p-4 text-center text-[0.85rem] text-gray-500">
                                    No staff found for the selected filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <Pagination
                totalItems={sampleStaffData.length}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            <DestructiveActionPrompt 
               description="Deactivate this account"
               onCancel={onCancelAction}
               onConfirm={onConfirmDeactivateAccount}
               open={showConfirmModal}
            />

            <DestructiveActionPromptSuccess onClose={() => setShowSuccessModal(false)} open={showSuccessModal}>
                <Image src="/icons/cancelled-transaction-success.svg" alt="success" width={110} height={110} />
                <div className="text-center">
                    <p className="text-sm font-bold text-primary-midGray mt-2 mb-1">Account Deactivated!</p>
                    <span className="font-light text-xs text-[#424F4A]">Staff account RR5302002 has been deactivated.</span>
                </div>
          </DestructiveActionPromptSuccess>
        </div>
    )
}
