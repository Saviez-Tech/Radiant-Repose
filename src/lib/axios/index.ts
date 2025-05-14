"use server"

import axios from 'axios';
import { cookies } from 'next/headers';

const createAxiosInstance = async () => {
  const myCookies = await cookies()
  
  const userSession = myCookies.get("user_session")
  
  const headers = {
    'Content-Type': 'application/json',
    Authorization: ""
  }
  
  if (userSession?.value) {
    try {
      const cookieValue = JSON.parse(userSession.value)
      if (cookieValue.auth_token) {
        headers.Authorization = `Token ${cookieValue.auth_token}`;
      }
    } catch (error) {
      console.error("Error parsing user_session cookie:", error)
    }
  }
  
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers,
  })
}

export default createAxiosInstance;