"use client"

import { useAppSelector } from "@/lib/redux/hooks"

export default function POSBranch(){

    const { branch } = useAppSelector(store => store.authUser)

    return(
        <p className="text-xs">{branch}</p>
    )
}