"use server"

import { cookies } from "next/headers";

export async function getUserSession(){
    try{
        const cookieStore = await cookies()
        const cookieValue = cookieStore.get("user_session")?.value;
        const { auth_token } = cookieValue ? await JSON.parse(cookieValue) : "";
        const cleanedToken = auth_token?.replace(/\s+/g, '') || '';
        return cleanedToken;
    }
    catch(e){
        return null;
    }
}

export async function getUserSessionID(){
    try{
        const cookieStore = await cookies()
        const cookieValue = cookieStore.get("user_session")?.value;
        const { id } = cookieValue ? await JSON.parse(cookieValue) : "";
        return id;
    }
    catch(e){
        return null;
    }
}