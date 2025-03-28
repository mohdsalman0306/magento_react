import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGuestEmailOnCart } from "../../redux/slices/cartSlice";
import Card from "../../components/ui/card";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import RadioGroup from "../../components/ui/radio-group";
import Select from "../../components/ui/select";
import Loader from "../../components/Loader";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { guestCartId, cartData } = useSelector((state) => state.cart);
  const { items, available_payment_methods, prices, selected_payment_method } =
    cartData;
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState(
    selected_payment_method.code
  );

  const [addressData, setAddressData] = useState({
    firstname: "",
    lastname: "",
    street: [],
    city: "",
    region: "",
    postcode: "",
    country_code: "",
    telephone: "",
    company: "",
  });

  const [guestEmail, setGuestEmail] = useState(cartData.email);
  useEffect(() => {
    console.log(guestEmail, guestCartId);
    if (guestEmail) {
      console.log("Email available hai.", guestEmail);
      dispatch(setGuestEmailOnCart({ guestCartId, emailId: guestEmail }));
    }
  }, [guestCartId, guestEmail, dispatch]);

  const handleBlur = () => {
    if (guestEmail) {
      setGuestEmail(guestEmail);
    } else {
      setGuestEmail(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // setAddressData((prev) => ({ ...prev, [name]: value }));
    // console.log(addressData);
    setAddressData((prev) => {
      if (name.startsWith("street[")) {
        const index = parseInt(name.match(/\d+/)[0], 10);

        const updatedStreet = [...prev.street];
        console.log(">>>>>", index, updatedStreet);
        updatedStreet[index] = value;
        console.log("<<<<", index, updatedStreet);
        return { ...prev, street: updatedStreet };
      } else {
        return { ...prev, [name]: value };
      }
    });
    setAddressData({country_code: "AE"})
    console.log(addressData);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* <Loader /> */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <Input
            type="email"
            placeholder={"Email Address"}
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            onBlur={() => handleBlur()}
          />
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Shipping information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="firstname"
              value={addressData.firstname}
              onChange={handleChange}
              onKeyUp={handleChange}
              placeholder="First name"
            />
            <Input
              type="text"
              name="lastname"
              value={addressData.lastname}
              onChange={handleChange}
              onKeyUp={handleChange}
              placeholder="Last name"
            />
          </div>
          <Input
            type="text"
            name="company"
            value={addressData.company}
            onChange={handleChange}
            onKeyUp={handleChange}
            placeholder="Company"
          />
          <Input
            type="text"
            name="street[0]"
            value={addressData?.street.length > 0 ? addressData?.street[0] : ""}
            onChange={handleChange}
            onKeyUp={handleChange}
            placeholder="Street"
          />
          <Input
            type="text"
            name="street[1]"
            value={addressData?.street[1] || ""}
            onChange={handleChange}
            onKeyUp={handleChange}
            placeholder="Apartment, suite, etc."
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="city"
              value={addressData.city}
              onChange={handleChange}
              onKeyUp={handleChange}
              placeholder="City"
            />
            <Select
              placeholder="Country"
              options={["United States", "Canada"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="region"
              value={addressData.region}
              onKeyUp={handleChange}
              onChange={handleChange}
              placeholder="State / Province"
            />
            <Input
              type="text"
              name="postcode"
              value={addressData.postcode}
              onKeyUp={handleChange}
              onChange={handleChange}
              placeholder="Postal code"
            />
          </div>
          <Input
            type="text"
            name="telephone"
            value={addressData.telephone}
            onKeyUp={handleChange}
            onChange={handleChange}
            placeholder="Phone"
          />
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Delivery method</h2>
          {/* <RadioGroup
            name={"shipping"}
            value={deliveryMethod}
            onChange={setDeliveryMethod}
            options={[
              {
                label: "Standard (4-10 business days) - $5.00",
                value: "standard",
              },
              {
                label: "Express (2-5 business days) - $16.00",
                value: "express",
              },
            ]}
          /> */}
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$64.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>$5.52</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$75.52</span>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg mt-4 mb-4 font-semibold">{"Payment"}</h2>
          {/* {available_payment_methods} */}
          {available_payment_methods.length > 0 ? (
            <RadioGroup
              name={"payment"}
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={available_payment_methods}
            />
          ) : (
            <span className="text-red-400">No Payment Method Available.</span>
          )}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Confirm order
          </Button>
        </Card>
      </div>
    </div>
  );
}
