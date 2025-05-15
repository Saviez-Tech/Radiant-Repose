"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/lib/redux/hooks"

export default function POSBranch() {
    const [branchName, setBranchName] = useState<string | null>(null)
    
    const { branch } = useAppSelector(store => store.authUser)
    
    useEffect(() => {
        setBranchName(branch ?? null)
    }, [branch])
    
    if (branchName === null) {
        return null;
    }
    
    return (
        <p className="text-xs">{branchName}</p>
    )
}