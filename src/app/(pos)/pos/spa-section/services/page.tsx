import RetryBtn from "@/components/buttons/RetryBtn";
import PosSpaSectionServices from "@/components/dashboard/PosSpaSectionServices";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { Wifi, AlertTriangle } from "lucide-react";


const fetchServices = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/services/`)
        
        const data = await response.json()

        if (!response.ok) {
            throw new Error(handleApiError(data))
        }
        
        return { data, success: true }

    } catch (err) {
       return { success: false, data: [], error: err instanceof Error ? err.message : "An unknown error occurred" }
    }
}


export default async function Page() {

    const { error, success, data } = await fetchServices()

    if (!success) {
        return (
            <main className="flex items-center justify-center min-h-[60vh] p-6">
                <div className="max-w-md w-full text-center">
                    <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Wifi className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary-dark_slate mb-2">
                        Oops! Service Unavailable
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        We couldn&apos;t load the spa services right now. This might be a temporary connection issue.
                    </p>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                        <p className="text-sm text-red-700 font-medium">
                            {error}
                        </p>
                    </div>
                    
                    <RetryBtn />
                    
                    <p className="text-xs text-gray-500 mt-4">
                        Still having trouble? Contact support for assistance.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main>
            <PosSpaSectionServices services={data} />
        </main>
    )
}