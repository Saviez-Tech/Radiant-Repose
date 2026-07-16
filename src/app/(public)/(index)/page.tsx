// Page.tsx
import AboutSection from "./AboutSection";
import Blog from "./blog";
import ConsultationSection from "./Consultation";
import Hero from "./Hero";
// import ServicesSection from "./Services";
import { fetchProductsData } from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";
import HomepageProducts from "./HomepageProducts";

export default async function Page() {
  const { success, data } = await fetchProductsData("luxury-collection");
  const products = success && data ? data.slice(0, 20) : [];

  return (
    <main>
      <div className="flex relative flex-col ">
        <Hero />
        {/* <ServicesSection /> */}
        {products.length > 0 && <HomepageProducts products={products} />}
        <AboutSection />
        <Blog />
        <ConsultationSection />
      </div>
    </main>
  )
}
