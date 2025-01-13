"use client";

import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function CommonDetails({ item }) {
     const router = useRouter();
     const{user,setShowCartModal} = useContext(GlobalContext);
     async function handleAddToCart(getItem){
            
            const res = await addToCart({ productID : getItem._id, userID : user._id });
            console.log(res);
             if(res.success){
               toast.success(res.message,{
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
                  setShowCartModal(true);
                router.push('/cart');
            
        } else{
            toast.error(res.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
           });
        setShowCartModal(true);
        }
        }
    return (
        <div className="text-black">
            <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px:8">
                <div className=" container mx-auto px-4">
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full max-w-full object-cover" />
                                    </div>
                                </div>
                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                        >
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full  object-cover" />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                        >
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full  object-cover" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3 lg:row-end-1">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {item && item.name}
                            </h1>
                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className={`text-3xl font-bold ${item.onSale === 'Yes' ? 'line-through' : ''}`}>{item && item.price}</h1>
                                    {
                                        item.onSale === 'Yes' ? (<p className="mr-3 text-sm font-semibold text-red-800">{`$ ${(item.price - item.price * (item.priceDrop / 100)).toFixed(2)}`}</p>) : null
                                    }
                                    {
                                        item.onSale === 'Yes' ? (<p className="mr-3 text-sm font-semibold text-black">{`$ (${item.priceDrop})% off`}</p>
                                        ) : null
                                    }
                                </div>
                                <button type="button"
                                onClick={() => handleAddToCart(item)}
                                    className="mt-1.5 inline-block ml-10 bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <ul className="mt-8 space-y-2">
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">{item && item.deliveryInfo}</li>
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">{'Cancel anytime'}</li>

                            </ul>
                            <div className="lg:col-span-3">
                                <div className="border-b border-gray-400">
                                    <nav className="flex gap-4">
                                        <a
                                            href="#"
                                            className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                                        >Description</a>
                                    </nav>
                                </div>
                                <div className="mt-8 flow-root sm:mt-12">
                                    {item && item.description}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}