import ClientLayout from "./luxury/ClientLayout";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    );
}