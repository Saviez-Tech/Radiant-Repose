import SpaPageHeaderSection from "@/components/dashboard/spa-section/SpaPageHeaderSection";
import SpaSectionPosActionButtons from "@/components/dashboard/spa-section/SpaSectionPosActionButtons";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SpaPageHeaderSection />
            {children}
            <div className="mb-16">
                <SpaSectionPosActionButtons />
            </div>
        </>
    )
}