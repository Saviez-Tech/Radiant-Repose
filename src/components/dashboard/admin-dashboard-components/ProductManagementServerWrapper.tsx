import { cookies } from "next/headers";
import ProductManagementMC from "./ProductManagementMC";


function getApiPath(section: string): string {
  switch (section) {
    case "luxury-collection":  return "admin";
    case "spa-collection":     return "admin/spa";
    case "pharmacy-collection":return "admin/pharmacy";
    default:                   return "admin";
  }
}

export async function fetchProductsData(section: "luxury-collection" | "spa-collection" | "pharmacy-collection") {
  try {
    // Read auth token from cookies for authenticated requests
    let authToken = "";
    try {
      const cookieStore = await cookies();
      const userSession = cookieStore.get("user_session")?.value;
      if (userSession) {
        const parsed = JSON.parse(userSession);
        if (parsed.auth_token) authToken = `Token ${parsed.auth_token}`;
      }
    } catch { /* no session cookie — public request */ }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${getApiPath(section)}/products`;

    // Use native fetch with Next.js built-in caching (5 min) — safe with dynamic APIs
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: authToken } : {}),
      },
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An Error Occurred";
    console.error("[fetchProductsData]", errorMessage);
    return { success: false, errorMessage };
  }
}


export default async function ProductManagementServerWrapper({ section }:{ section: "luxury-collection" | "spa-collection" | "pharmacy-collection"}) {
  const { success, data, errorMessage } = await fetchProductsData(section)
  
  if (!success) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-600 font-medium mb-2">Error Loading Products Data</h3>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    )
  }
  
  return <ProductManagementMC data={data || []} section={section} />
}