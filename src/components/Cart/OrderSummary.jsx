import { useNavigate } from "react-router";
const OrderSummary = ({
  subTotal,
  discounts,
  shippingEstimate,
  appliedTax,
  grandTotal,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            <span className="text-sm">{subTotal.currency}</span>{" "}
            {subTotal.value}
          </span>
        </div>
        {discounts.length > 0
          ? discounts.map((discount, index) => (
              <div className="flex justify-between" key={index}>
                <span>{discount.label}</span>
                <span>
                  <span className="text-sm">{`- ${discount.amount.currency} `}</span>
                  {discount.amount.value}
                </span>
              </div>
            ))
          : ""}
        {appliedTax.length > 0
          ? appliedTax.map((tax, index) => (
              <div key={index} className="flex justify-between">
                <label>Tax estimate</label>
                <span>
                  {appliedTax.length > 1 ? (
                    <>
                      <input type="radio" name="" id={index} index />
                      {`${tax.label}`}{" "}
                      <span className="text-sm">{`${tax.amount.currency} `}</span>
                      {`${tax.amount.value}`}
                    </>
                  ) : (
                    <>
                      <span className="text-sm">{`${tax.amount.currency} `}</span>
                      {`${tax.amount.value}`}
                    </>
                  )}
                </span>
              </div>
            ))
          : ""}
        {/* {appliedTax?.length} */}
      </div>

      <div className="border-t mt-6 pt-6 flex justify-between font-semibold">
        <span>Order total</span>
        <span>
          <span className="text-sm">{grandTotal.currency}</span>{" "}
          {grandTotal.value}
        </span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
