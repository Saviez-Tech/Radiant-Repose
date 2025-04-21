
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-white  text-primary-deepBlack p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <Image
          src="/images/404.png"
          width={320}
          height={240}
          alt="404 Illustration"
          className="mx-auto aspect-video rounded-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Oops! Page not found.</h1>
          <p className="text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <Link
          href="/"
          className="group bg-gradient-to-r from-[#990000] to-[#FF0000] hover:from-[#b30000] hover:to-[#cc0000]
                 active:scale-95 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center gap-2
                 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}