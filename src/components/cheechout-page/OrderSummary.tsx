export default function OrderSummary() {
    return (
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Summary:</h3>
       <div className="flex flex-col border-t border-gray-400 ">
       <div className="flex flex-col gap-4 w-full py-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">N473,598</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Delivery Fee</span>
            <span className="font-medium">N1,500</span>
          </div>
          <hr className="border-t border-dashed border-gray-300 my-2" />
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>N316,000</span>
          </div>
        </div>
       </div>
      </div>
    );
  }
  