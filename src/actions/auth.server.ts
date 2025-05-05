"use server"

import { cookies } from "next/headers";

export async function LoginHandler(email: string, password: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    if (!apiUrl) {
      throw new Error("API URL not configured")
    }

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password }),
      cache: 'no-store'
    })

    // Get response data as text first to handle potential non-JSON responses
    const responseText = await response.text()
    let data
    
    try {
      // Try to parse as JSON
      data = JSON.parse(responseText)
    } catch {
      console.error("Failed to parse response as JSON:", responseText)
      // Return error object instead of throwing
      return { 
        success: false, 
        error: "Invalid response from server" 
      }
    }
    
    if (!response.ok) {
      console.error("Login failed with status:", response.status)
      
      // Return error object instead of throwing
      return { 
        success: false, 
        error: data?.message || 
          (response.status === 401 || response.status === 404
            ? "Invalid credentials. Please try again."
            : "Failed to login. Please check your network or try again later.")
      }
    }
    
    const { id, username, group, auth_token, full_name } = data
    
    if (!auth_token) {
      // Return error object instead of throwing
      return { 
        success: false, 
        error: "Authentication token not received from server." 
      }
    }
    
    const userData = JSON.stringify({ id, username, group, auth_token, name: full_name })
    
    // Set auth token in cookies for 24 hours
    const cookieStore = await cookies()
    cookieStore.set("user_session", userData, {
      maxAge: 60 * 60 * 24 
    }) 
    
    return { 
      success: true, 
      user: { id, username, group, name: full_name } 
    }
  } catch (error) {
    console.error("Login error:", error)

    // Return error object instead of throwing
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred."
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