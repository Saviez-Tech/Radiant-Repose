"use server"

import axios from 'axios';
import { cookies } from 'next/headers';

const createAxiosInstance = async () => {
  const myCookies = await cookies()
  const cookieValue = await JSON.parse(myCookies.get("user_session")?.value || "")

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${cookieValue.auth_token}`,
    },
  })
}

export default createAxiosInstance;
