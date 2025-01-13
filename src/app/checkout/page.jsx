"use client";
import { GlobalContext } from "@/context";
import { fetchAllAddress } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, Suspense } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dynamic = "force-dynamic";

function CheckoutComponent() {
  const router = useRouter();
  const params = useSearchParams();
  const publishableKey =
    "pk_test_51QaXPfLdFhyPYanaSU6RKhHANdf7so9pwBzNdvK9h4X3a9aeFimtadTUCEDTda5AmlbQD0fYEfTlseQZCwSfUZrh00fZVugfhk";
  const stripePromise = loadStripe(publishableKey);
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  async function getAllAddresses() {
    const res = await fetchAllAddress(user?._id);
    if (res.success) {
      setAddresses(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAllAddresses();
  }, [user]);

  async function createFinalOrder() {
    const isStripe = JSON.parse(localStorage.getItem("stripe"));
    if (
      isStripe &&
      params.get("status") === "success" &&
      cartItems &&
      cartItems.length > 0
    ) {
      setIsOrderProcessing(true);
      const getCheckOutFormData = JSON.parse(
        localStorage.getItem("checkoutFormData")
      );

      const createFinalCheckoutFormData = {
        user: user?._id,
        shippingAddress: getCheckOutFormData.shippingAddress,
        orderItems: cartItems.map((item) => ({
          qty: 1,
          product: item.productDetails,
        })),
        paymentMethod: "Stripe",
        totalPrice: cartItems.reduce(
          (total, item) => item.productDetails.price + total,
          0
        ),
        isPaid: true,
        isProcessing: true,
        paidAt: new Date(),
      };

      try {
        const res = await createNewOrder(createFinalCheckoutFormData);
        console.log(res); // Log the response

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message);
          localStorage.removeItem("cartItems");
          // Clear checkout form data after successful payment
          setCheckoutFormData({
            shippingAddress: {
              fullName: "",
              city: "",
              country: "",
              postalCode: "",
              address: "",
            },
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Error creating order:", error); // Log any errors
        setIsOrderProcessing(false);
        setOrderSuccess(false);
        toast.error("Failed to create order");
      }
    }
  }

  useEffect(() => {
    createFinalOrder();
  }, [params, cartItems, user]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {
          fullName: "",
          city: "",
          country: "",
          postalCode: "",
          address: "",
        },
      });
      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  console.log(checkoutFormData);
  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, 2500);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:0x-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  {" "}
                  Your payment is successful you will be redirecting to orders
                  page in 2 sec
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  async function handleCheckout() {
    const stripe = await stripePromise;
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productDetails.name,
          images: [item.productDetails.imageUrl],
        },
        unit_amount: item.productDetails.price * 100,
      },
      quantity: 1,
    }));

    try {
      const res = await callStripeSession(createLineItems);
      if (!res || !res.id) {
        throw new Error("Failed to create Stripe session");
      }

      setIsOrderProcessing(true);
      localStorage.setItem("stripe", true);
      localStorage.setItem(
        "checkoutFormData",
        JSON.stringify(checkoutFormData)
      );
      console.log(res);

      const { error } = await stripe.redirectToCheckout({
        sessionId: res.id,
      });
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  return (
    <div className="text-black">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item?.productDetails?.imageUrl}
                    alt="Cart Item"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item?.productDetails?.name}
                    </span>
                    <span className="font-semibold">
                      {item?.productDetails?.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>your cart is empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Address details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((address) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={address._id}
                >
                  <div
                    onClick={() => handleSelectedAddress(address)}
                    key={address._id}
                    className={`border p-6 ${
                      address._id === selectedAddress ? "border-red-900" : ""
                    }`}
                  >
                    <span className="font-bold">{address.fullName}</span>
                    <span className="font-semibold">{address.address}</span>
                    <span className="font-semibold">{address.city}</span>
                    <span className="font-semibold">{address.country}</span>
                    <span className="font-semibold">{address.postalCode}</span>
                    <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                      {address._id === selectedAddress
                        ? "Selected Address"
                        : "Select Address"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No address found</div>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Add New Address
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">SubTotal</p>
              <p className="text-lg font-bold text-gray-900">
                ${" "}
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productDetails.price + total,
                      0
                    )
                  : 0}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total</p>
              <p className="text-lg font-bold text-gray-900">
                ${" "}
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productDetails.price + total,
                      0
                    )
                  : 0}
              </p>
            </div>
            <div className="pb-10">
              <button
                onClick={handleCheckout}
                disabled={
                  !cartItems ||
                  cartItems.length === 0 ||
                  !checkoutFormData.shippingAddress ||
                  Object.values(checkoutFormData.shippingAddress).some(
                    (value) => !value
                  )
                }
                className="disabled:opacity-50 mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutComponent />
    </Suspense>
  );
}
