export default function SelectedServicesCard() {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="relative w-[100px] aspect-[120/80] rounded-2xl overflow-hidden">
        <img
          src="/images/christin-hume.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute bottom-2 left-2 bg-white text-primary-red text-xs font-medium px-2 py-0.5 rounded-full shadow">
          30 Minutes
        </div> */}
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1">
        <p className="text-base font-semibold text-primary-deepBlack">
          Hot Stone Therapy
        </p>
        <p className="text-sm text-primary-dark_ash_slate leading-snug">
          A deeply relaxing massage that eases tension, improves circulation and
          revitalizes the body.
        </p>
      </div>

      <div className="flex flex-col items-end justify-between text-right gap-1">
        <div>
          <p className="text-sm font-semibold text-primary-grayDark">Total</p>
          <p className="text-lg font-semibold text-primary-darkRed">
            N65,200
          </p>
        </div>
        <button className="text-sm text-primary-red italic mt-2 hover:underline">
          Remove Item
        </button>
      </div>
    </div>
  );
}


