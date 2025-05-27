import SpaSectionPosActionButtons from "@/components/dashboard/spa-section/SpaSectionPosActionButtons";
import SpaServiceNProductPageIndicator from "@/components/dashboard/spa-section/SpaServiceNProductPageIndicator";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SpaServiceNProductPageIndicator />
            {children}
            <div className="mb-16">
                <SpaSectionPosActionButtons />
            </div>
        </>
    )
}