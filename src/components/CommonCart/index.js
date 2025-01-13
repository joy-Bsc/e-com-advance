"use client";

import { useRouter } from "next/navigation";

export default function CommonCart({ cartItems = [],handleDeleteCartItem,}){
    const router = useRouter();
    return(
        <section className="h-screen bg-gray-100 text-black">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">
                            {
                                cartItems && cartItems.length ?
                                <ul className="-my-8">
                                    {
                                        cartItems.map(cartItem => 
                                            <li className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0" key={cartItem._id}>
                                                <div className="shrink-0">
                                                    <img src={cartItem && cartItem.productDetails && cartItem.productDetails.imageUrl} alt={cartItem.productDetails.name}
                                                    className="w-25 h-24 object-center object-cover rounded-lg border border-gray-200"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                        <div className="pr-2 sm-pr-4">
                                                            <p className="text-base font-semibold text-gray-900">{cartItem && cartItem.productDetails && cartItem.productDetails.name}</p>
                                                        </div>
                                                        <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">$ {cartItem && cartItem.productDetails && cartItem.productDetails.price}</p>
                                                            <button onClick={()=>handleDeleteCartItem(cartItem._id)} type="button" className="font-medium text-yellow-700 sm:order-2">Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                            
                                    }
                                </ul>
                                 : null
                                
                            }
                        </div>
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-start justify-between">
                                <p className="text-sm text-gray-600">Subtotal</p>
                                <p className="text-lg text-gray-700 font-semibold">
                                    $ {cartItems && cartItems.length ? cartItems.reduce((acc, item) => acc + item.productDetails.price, 0) : 0}
                                </p>
                            </div>
                            <div className="flex items-start justify-between">
                                <p className="text-sm text-gray-600">Shipping</p>
                                <p className="text-lg text-gray-700 font-semibold">
                                    $ 0.00
                                </p>

                            </div>
                            <div className="flex items-start justify-between">
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-lg text-gray-700 font-semibold">
                                    $ {cartItems && cartItems.length ? cartItems.reduce((acc, item) => acc + item.productDetails.price, 0) : 0}
                                </p>
                            </div>
                            <div className="mt-5 text-ellipsis">
                                <button onClick={()=>router.push('/checkout')}
                                       disabled={cartItems && cartItems.length === 0}
                                 className="group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}