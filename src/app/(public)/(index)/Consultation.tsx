export default function ConsultationSection() {
    return (
      <section className="relative w-full h-full py-12 px-4">
        <div className="absolute inset-0">
          <img
            src="/images/closeup-businessman-using-mobile-phone.png"
            alt="Consultation Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#9900004D]/30" />
        </div>
  
        <div className="relative app-container mx-auto md:max-w-4xl bg-[#F2F2F2] rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary-deepBlack">
              Book a consultation
            </h2>
            <p className="text-primary-dark_slate mt-2">
              Looking for tailored advice or ready to schedule your next
              experience? Enter your email to continue.
            </p>
          </div>
          <form className="relative w-full md:w-1/2">
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email address here"
                className="w-full px-4 py-3 rounded-lg md:text-sm text-xs  focus:outline-none focus:ring-2 focus:ring-primary-darkRed"
              />
              <button
                type="submit"
                className="bg-primary-darkRed text-white max-md:text-xs md:px-5 px-2 py-2 rounded-lg  hover:bg-primary-darkRed/90 transition right-2 absolute"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }