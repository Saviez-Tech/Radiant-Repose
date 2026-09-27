"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setAuthUser } from "@/lib/redux/slices/authUserSlice";
import { clearProductToEdit } from "@/lib/redux/slices/editProductSlice";
import { clearStaffToEdit } from "@/lib/redux/slices/editStaffSlice";
import { setBranches } from "@/lib/redux/slices/storeBranchesSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { logoutHandler } from "@/actions/auth.server";

export default function AuthUserPersistor({ persistedUserData }:{ persistedUserData: { id: string, username: string, branch?: string, group: "Administrator" | "Worker", name: string } | null }){

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const { staffToEdit } = useAppSelector(store => store.editStaff)
    const { branches } = useAppSelector(store => store.storeBranches)
    const { productToEdit } = useAppSelector(store => store.editProduct)
    const router = useRouter()


    const fetchBranchesClientHandler = async() => {
        // Check localStorage cache first (10 min TTL) to avoid slow API calls on every navigation
        try {
            const cached = localStorage.getItem("rr_branches_cache")
            if (cached) {
                const { data: cachedData, ts } = JSON.parse(cached)
                if (Date.now() - ts < 10 * 60 * 1000 && cachedData?.length) {
                    dispatch(setBranches(cachedData))
                    return
                }
            }
        } catch {/* ignore parse errors */}

        try {
            // Call the API directly from the client — avoids the slow server action POST roundtrip
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/luxury-branches/`, {
                credentials: "include",
            })
            if (!res.ok) throw new Error("Failed to fetch branches")
            const data = await res.json()
            try {
                localStorage.setItem("rr_branches_cache", JSON.stringify({ data, ts: Date.now() }))
            } catch {/* ignore storage errors */}
            dispatch(setBranches(data))
        } catch {
            toast.error("Failed To Fetch Stores")
        }
    }

    useEffect(() => {
        if (persistedUserData && persistedUserData.id && persistedUserData.username){
            
            if (!sessionStorage.getItem("tab_session_active") && (pathName.startsWith("/admin") || pathName.startsWith("/pos"))) {
                logoutHandler().then(() => {
                    router.push("/auth/login");
                });
                return;
            }

            dispatch(setAuthUser({
                id: persistedUserData.id,
                emailOrUsername: persistedUserData.username,
                group: persistedUserData.group,
                name: persistedUserData.name,
                branch: persistedUserData.branch
            }))

            if (persistedUserData.group === "Administrator" && !pathName.startsWith("/admin")){
                router.push("/admin")
            }
        }
    },[persistedUserData?.id,persistedUserData?.username])


    useEffect(() => {
        if (!pathName.match("/auth") && !branches.length){
            fetchBranchesClientHandler()
        }

        if (pathName !== "/admin/staff-management/edit-staff" && staffToEdit){
            dispatch(clearStaffToEdit())
        }
        if (pathName.startsWith("/admin/product-management/edit-product") && productToEdit){
            dispatch(clearProductToEdit())
        }

    },[pathName])

    // Idle timeout effect
    useEffect(() => {
        // Only run if user is authenticated and on protected route
        if (!persistedUserData || (!pathName.startsWith("/admin") && !pathName.startsWith("/pos"))) {
            return;
        }

        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // Log out after 30 minutes of inactivity
                logoutHandler().then(() => {
                    sessionStorage.removeItem("tab_session_active");
                    router.push("/auth/login");
                });
            }, 30 * 60 * 1000); // 30 minutes
        };

        // Events that reset the timer
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        // Initialize timer
        resetTimer();

        // Add event listeners
        events.forEach(event => {
            window.addEventListener(event, resetTimer, { passive: true });
        });

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [persistedUserData, pathName, router]);

    return null;
}