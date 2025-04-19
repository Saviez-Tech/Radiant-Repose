import Image from "next/image";
import ClientTestimonialsContainer from "./ClientsTestimonialContainer";

export default function TestimonialSection(){
    return (
        <section className="md:pe-16 lg:pe-20 md:flex items-center justify-center">
            <div className="-translate-y-10 relative md:-translate-y-14">
                <Image 
                  src="/images/shopping-model.png"
                  alt="girl with shopping bags"
                  width={800}
                  height={700}
                />
                <Image 
                  src="/images/shopping-model-overlay-item.png"
                  alt=""
                  aria-hidden="true"
                  width={200}
                  height={200}
                  className="absolute bottom-10 right-[10em] m-auto"
                />
            </div>

            <div className="md:w-[31em] px-4 md:px-0">
                <h3 className="text-primary-deepBlack font-semibold text-3xl md:text-4xl">What our Clients say about us</h3>
                <ClientTestimonialsContainer />
            </div>
        </section>
    )
}