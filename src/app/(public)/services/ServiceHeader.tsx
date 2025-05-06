"use client";

import NormalSelect from "@/components/custom-utils/NormalSelect";
import Link from "next/link";
import ProductTypeFilter from "./ProductTypeFilter";
import ServicePopOver from "./ServicePopOver";

export default function ServiceHeader() {
  const locations = [
    { value: "new_york", label: "New York, USA" },
    { value: "los_angeles", label: "Los Angeles, USA" },
    { value: "chicago", label: "Chicago, USA" },
    { value: "houston", label: "Houston, USA" },
    { value: "phoenix", label: "Phoenix, USA" },
    { value: "philadelphia", label: "Philadelphia, USA" },
  ];

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex max-md:items-end gap-4">
        <NormalSelect options={locations} />
        <ServicePopOver>
          <button className="flex items-center bg-white rounded-lg p-2 shadow-sm text-2xl max-md:w-fit">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7872 22.0226C18.6658 22.0226 17.7116 21.6291 16.9246 20.8421C16.1376 20.0551 15.744 19.1009 15.744 17.9795C15.744 16.8581 16.1376 15.9039 16.9246 15.1169C17.7116 14.3299 18.6658 13.9363 19.7872 13.9363C20.9086 13.9363 21.8628 14.3299 22.6498 15.1169C23.4369 15.9039 23.8304 16.8581 23.8304 17.9795C23.8304 19.1009 23.4369 20.0551 22.6498 20.8421C21.8628 21.6291 20.9086 22.0226 19.7872 22.0226ZM19.7872 20.0011C20.3488 20.0011 20.8261 19.8045 21.2192 19.4114C21.6123 19.0184 21.8088 18.541 21.8088 17.9795C21.8088 17.4179 21.6123 16.9406 21.2192 16.5475C20.8261 16.1544 20.3488 15.9579 19.7872 15.9579C19.2257 15.9579 18.7483 16.1544 18.3552 16.5475C17.9622 16.9406 17.7656 17.4179 17.7656 17.9795C17.7656 18.541 17.9622 19.0184 18.3552 19.4114C18.7483 19.8045 19.2257 20.0011 19.7872 20.0011ZM0.918945 18.9902V16.9687H12.5302V18.9902H0.918945ZM4.96212 9.06367C3.84076 9.06367 2.88655 8.67015 2.09949 7.88312C1.31246 7.09609 0.918945 6.14189 0.918945 5.02053C0.918945 3.89914 1.31246 2.94494 2.09949 2.1579C2.88655 1.37087 3.84076 0.977356 4.96212 0.977356C6.08348 0.977356 7.03769 1.37087 7.82474 2.1579C8.61177 2.94494 9.00529 3.89914 9.00529 5.02053C9.00529 6.14189 8.61177 7.09609 7.82474 7.88312C7.03769 8.67015 6.08348 9.06367 4.96212 9.06367ZM4.96212 7.04213C5.52367 7.04213 6.001 6.84559 6.39409 6.4525C6.78718 6.05941 6.98372 5.58208 6.98372 5.02053C6.98372 4.45897 6.78718 3.98165 6.39409 3.58856C6.001 3.19547 5.52367 2.99892 4.96212 2.99892C4.40056 2.99892 3.92324 3.19547 3.53015 3.58856C3.13706 3.98165 2.94051 4.45897 2.94051 5.02053C2.94051 5.58208 3.13706 6.05941 3.53015 6.4525C3.92324 6.84559 4.40056 7.04213 4.96212 7.04213ZM12.2191 6.0313V4.00976H23.8304V6.0313H12.2191Z"
                fill="#5B5B5B"
              />
            </svg>
          </button>
        </ServicePopOver>
      </div>
      <div className="flex max-md:flex-col md:items-center gap-2 md:gap-4">
        <h2 className="text-primary-dark_slate font-semibold">Categories</h2>
        <div className="flex items-center gap-2 flex-1">
        <ProductTypeFilter />
        <p className="text-primary-dark_slate">|</p>
        <Link
          href="/services/cart"
          className="flex items-center gap-2 bg-[#EFE1D2] font-semibold text-lg rounded-md "
        >
          <span>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="5" fill="#EFE1D2" />
              <path
                d="M30 30C28.89 30 28 30.89 28 32C28 32.5304 28.2107 33.0391 28.5858 33.4142C28.9609 33.7893 29.4696 34 30 34C30.5304 34 31.0391 33.7893 31.4142 33.4142C31.7893 33.0391 32 32.5304 32 32C32 31.4696 31.7893 30.9609 31.4142 30.5858C31.0391 30.2107 30.5304 30 30 30ZM14 14V16H16L19.6 23.59L18.24 26.04C18.09 26.32 18 26.65 18 27C18 27.5304 18.2107 28.0391 18.5858 28.4142C18.9609 28.7893 19.4696 29 20 29H32V27H20.42C20.3537 27 20.2901 26.9737 20.2432 26.9268C20.1963 26.8799 20.17 26.8163 20.17 26.75C20.17 26.7 20.18 26.66 20.2 26.63L21.1 25H28.55C29.3 25 29.96 24.58 30.3 23.97L33.88 17.5C33.95 17.34 34 17.17 34 17C34 16.7348 33.8946 16.4804 33.7071 16.2929C33.5196 16.1054 33.2652 16 33 16H18.21L17.27 14M20 30C18.89 30 18 30.89 18 32C18 32.5304 18.2107 33.0391 18.5858 33.4142C18.9609 33.7893 19.4696 34 20 34C20.5304 34 21.0391 33.7893 21.4142 33.4142C21.7893 33.0391 22 32.5304 22 32C22 31.4696 21.7893 30.9609 21.4142 30.5858C21.0391 30.2107 20.5304 30 20 30Z"
                fill="#ABA299"
              />
            </svg>
          </span>
        </Link>
        </div>
      </div>
    </div>
  );
}
