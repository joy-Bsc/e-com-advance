"use client";

import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { get } from "mongoose";
import { useContext, useEffect } from "react";

export default function AdminView(){
    const {allOrdersForAllUsers , setAllOrdersForAllUsers,user} = useContext(GlobalContext);

    async function extractOrdersForAllUser(){
        const res = await getAllOrdersForAllUsers();
        if(res.success){
            setAllOrdersForAllUsers(res.data && res.data.length ? res.data.filter((item)=> item.user._id !== user._id) : []);
        }
        
    }

    useEffect(()=>{
            if(user !== null){
                extractOrdersForAllUser();
            }
    },[user])

    async function handleUpdateOrderStatus(getItem){
        const res = await updateStatusOfOrder({
            ...getItem,
            isProcessing : false
        });
        if(res.success){
            extractOrdersForAllUser();
        }
        
    }
    return(
        <section className="text-black">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flow-root">
                                {
                                    allOrdersForAllUsers && allOrdersForAllUsers.length ? 
                                    <ul className="flex flex-col gap-4">
                                        {
                                            allOrdersForAllUsers.map(item => 
                                                <li key={item._id} className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                    <div className="flex">
                                                        <h1 className="font-bold text-lg mb-3 flex-1">#order : {item._id}</h1>
                                                        <div className="inline-block bg-black  px-5 py-3 text-xs font-medium tracking-wide  text-white rounded-lg hover:bg-gray-800">
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-white ">User Name : </p>
                                                            <p className="mr-3 text-2xl font-semibold text-white-900 ">{item.user.name}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-white">User Email </p>
                                                            <p className="mr-3 text-2xl font-semibold text-white ">{item.user.email}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-white ">Total paid amount</p>
                                                            <p className="mr-3 text-2xl font-semibold text-white ">{item.totalPrice}</p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {
                                                            item.orderItems.map((orderItem, index)=>
                                                            <div key={index} className="shrink-0">
                                                                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={orderItem && orderItem.product && orderItem.product.imageUrl} alt="product image" />
                                                            </div>)
                                                        }
                                                    </div>
                                                    <div className="flex gap-5">
                                                    <button className="disabled:opacity-50 mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                                                        {item.isProcessing ? 'Order is Processing' : 'Order is Delivered'}
                                                    </button>
                                                    <button onClick={()=>handleUpdateOrderStatus(item)}
                                                    className="disabled:opacity-50 mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                                                        Update order status
                                                            </button>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    : null
                                }
                            </div>
            </div>
        </section>
    )
}
