"use server"

import { cookies } from "next/headers";


  
export async function LoginHandler(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password })
    })

    
    if (!response.ok) {
      const errorMessage = response.status === 401 || response.status === 404
        ? "Invalid credentials. Please try again."
        : "Failed to login. Please check your network or try again later.";
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    const { id, username, group, auth_token, full_name } = data;
    
    if (!auth_token) {
      throw new Error("Authentication token not received from server.")
    }
    
    const userData = JSON.stringify({ id, username, group, auth_token, name: full_name })
    
    // Set auth token in cookies for 24 hours
    const cookieStore = await cookies()
      cookieStore.set("user_session", userData, {
      maxAge: 60 * 60 * 24 
    }) 
    
    return { id, username, group, success: true, name: full_name }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: (error instanceof Error) ? error.message : "Failed to login. Please check your network or try again later.",
      success: false
    }
    
  }
}




export async function logoutHandler(){
  try {
    const cookieStore =  await cookies()
    cookieStore.set("user_session","",{ maxAge: 0 })
    cookieStore.delete("auth_token")

    return { success: true, data: "Logout Successful" }
  }
  catch{
    return {
      success: false,
      error: "Logout Failed"
    }
  }
}