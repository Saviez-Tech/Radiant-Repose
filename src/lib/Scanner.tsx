"use client"

import { useEffect } from "react";
import { fetchProductsByBarcode } from "./redux/slices/posFlowSlice";
import { useAppDispatch } from "./redux/hooks";

// This is just a demo scanner tool 

export default function Scanner(){

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProductsByBarcode("36364636364"))
    },[])

    return null;
}