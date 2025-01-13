"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { GlobalContext } from "@/context";
import { addNewAddress, deleteAddress, fetchAllAddress, updateAddress } from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { user, addresses, setAddresses, addressFormData, setAddressFormData } =
    useContext(GlobalContext);
    const router = useRouter();

  const [showAddress, setShowAddress] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);

  async function handleAddOrUpdateAddress() {
    
    
    const res = currentEditedAddressId !== null ? await updateAddress({
        ...addressFormData,
        _id: currentEditedAddressId,

    }):await addNewAddress({...addressFormData, userID: user._id});
    
    if(res.success){
        toast.success(res.message,{
            position: "top-right"
             
        })
        setAddressFormData({
            fullName: "",
            city: "",
            country: "",
            postalCode: "",
            address: "",
        })
        extractAllAddresses();
        setCurrentEditedAddressId(null);
    } else {
        toast.error(res.message,{
            position: "top-right"
             
        })
        setAddressFormData({
            fullName: "",
            city: "",
            country: "",
            postalCode: "",
            address: "",
        })
    }
    
  }

  async function extractAllAddresses(){
    const res = await fetchAllAddress(user._id);
    if(res.success){
        setAddresses(res.data);
    }
  }

  async function handleUpdateAddress(getCurrentAddress){
    setShowAddress(true);
    setAddressFormData({
        fullName: getCurrentAddress.fullName,
        city: getCurrentAddress.city,
        country: getCurrentAddress.country,
        postalCode: getCurrentAddress.postalCode,
        address: getCurrentAddress.address,
    })
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDeleteAddress(id){
    const res = await deleteAddress(id)
    if(res.success){
        toast.success(res.message,{
            position: "top-right"
             
        })
        extractAllAddresses();
    } else {
        toast.error(res.message,{
            position: "top-right"
             
        })
    }
  }

  useEffect(() => {
    if(user !== null) 
    extractAllAddresses();
  }, [user]);
  return (
    <section className="text-black">
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-12">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            {/* we have render user image here */}
          </div>
          <div className="flex flex-col flex-1">
            <h4 className="text-lg font-semibold text-center md:text-left">
              Welcome, {user?.name}
            </h4>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
          <button
          onClick={() => router.push("/orders")}
           className="mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
            {" "}
            View Your Orders
          </button>
          <div className="mt-6">
            <h1 className="font-bold text-lg">Your Addresses : </h1>
            <div className="mt-4">
              {addresses && addresses.length ? (
                addresses.map((item) => (
                  <div key={item._id}>
                    <p>Name : {item.fullName}</p>
                    <p>Address : {item.address}</p>
                    <p>City : {item.city}</p>
                    <p>Country : {item.country}</p>
                    <p>Postal Code : {item.postalCode}</p>
                    <button onClick={()=> handleUpdateAddress(item)}
                    className="mt-5 mr-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                      Update
                    </button>
                    <button
                        onClick={() => handleDeleteAddress(item._id)}
                     className="mt-5 ml-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No address found ! please add a new address below</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800"
            >
              {showAddress ? "Hide Address Form" : "Add New Address"}
            </button>
          </div>
          {showAddress ? (
            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
              <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                {addNewAddressFormControls.map((controlItem) => (
                  <InputComponent
                    type={controlItem.type}
                    key={controlItem.id}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={addressFormData[controlItem.id]}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        [controlItem.id]: e.target.value,
                      })
                    }
                  />
                ))}
              </div>
              <button 
                onClick={handleAddOrUpdateAddress}
              className="mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
