"use server"

import { getUserSession } from "@/lib/helperFns/getUserSession";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { EditStaffFormValues, StaffFormValues } from "@/schemas/addStaff.schema";
import { revalidatePath } from "next/cache";

// ADD STAFF
interface BackendStaffPayload {
    username: string;
    userfullname: string;
    password: string;
    phone_number: string;
    address: string;
    branch_id: number
}
  
export async function addStaffHandler(staffDetails: StaffFormValues) {
    try {
        // Transform the form values to match the expected backend structure
        const transformedData: BackendStaffPayload = {
        username: staffDetails.emailOrUsername,
        userfullname: staffDetails.fullName,
        password: staffDetails.password,
        phone_number: staffDetails.phoneNumber,
        address: staffDetails.address,
        branch_id: parseInt(staffDetails.AssignedLocation)
        }

        const auth_token = await getUserSession()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${auth_token}`
        },
        body: JSON.stringify(transformedData)
        })

        if (!response.ok) {
        const errorData = await response.json()
        throw new Error(handleApiError(errorData))
        }

        const data = await response.json()
        
        // Revalidate the staff management page to show the new staff member
        revalidatePath('/admin/staff-management')
        
        return { 
        success: true, 
        data 
        }
    } catch (error) {
        console.error('Error adding staff:', error)
        return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }
    }
}



interface BackendEditStaffPayload {
    username: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    branch_id: number
}
  
export async function editStaffHandler(staffDetails: EditStaffFormValues, staffID: string) {

    if(!staffID){
        return {
            success: false,
            error: 'Invalid User'
        }
    }

    try {
        const transformedData: Partial<BackendEditStaffPayload> = {}
        console.log(staffDetails)
        // Only add fields that have values (not undefined, null, or empty string)
        if (staffDetails.emailOrUsername) transformedData.username = staffDetails.emailOrUsername;
        if (staffDetails.fullName) transformedData.name = staffDetails.fullName;
        if (staffDetails.password) transformedData.password = staffDetails.password;
        if (staffDetails.phoneNumber) transformedData.phone_number = staffDetails.phoneNumber;
        if (staffDetails.address) transformedData.address = staffDetails.address;
        if (staffDetails.AssignedLocation) transformedData.branch_id = parseInt(staffDetails.AssignedLocation)
        
        // If no fields to update, return early
        if (Object.keys(transformedData).length === 0) {
            return {
                success: false,
                error: 'No fields to update'
            }
        }
        
        const auth_token = await getUserSession()
        
        const cleanedToken = auth_token?.replace(/\s+/g, '') || '';
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/worker-update/${staffID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${cleanedToken}`
            },
            body: JSON.stringify(transformedData)
        })
        
        if (!response.ok) {
            console.log(response)
        }
        
        const data = await response.json()
       
        // Revalidate the staff management page to show the updated staff member
        revalidatePath('/admin/staff-management')
       
        return {
            success: true,
            data
        }
    } catch (error) {
        console.error('Error editing staff:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}



export async function staffStatusHandler(staffID: string, action: "enable" | "disable") {

    if (!staffID) {
      return {
        success: false,
        error: 'Invalid User ID'
      }
    }
  
    try {
      const auth_token = await getUserSession()
      const cleanedToken = auth_token?.replace(/\s+/g, '') || '';
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/worker-${action}/${staffID}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${cleanedToken}`
        },
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(handleApiError(errorData))
      }
  
      const data = await response.json()
  
      // Revalidate staff management page
      revalidatePath('/admin/staff-management')
  
      return {
        success: true,
        data
      }
    } catch (error) {
      console.error('Error disabling staff:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }
    }
}
  