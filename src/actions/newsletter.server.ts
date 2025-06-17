import { ContactFormData } from "@/components/contact-us/ContactForm";

export async function newsletterHandler(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/newsletter/subscribe/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (!response.ok) {
      const errorMessage =
        response.status === 401 || response.status === 404
          ? "Invalid credentials. Please try again."
          : "Failed to subscribe. Please check your network or try again later.";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log({ data });

    return {
      data,
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please check your network or try again later.",
      success: false,
    };
  }
}
