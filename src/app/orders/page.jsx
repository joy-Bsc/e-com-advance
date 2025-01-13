'use client'

import { GlobalContext } from "@/context"
import { getAllOrdersForUser } from "@/services/order"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
    const { user, allOrdersForUser, setAllOrdersForUser } = useContext(GlobalContext)
    const router = useRouter()

    async function extractAllOrders() {
        try {
            const res = await getAllOrdersForUser(user._id)
            if (res.success) {
                setAllOrdersForUser(res.data)
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast.error("Failed to fetch orders")
        }
    }

    useEffect(() => {
        if (user !== null) extractAllOrders()
    }, [user])
    console.log(allOrdersForUser);
    

    return (
        <div className="text-black">
            <section className="h-screen bg-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    allOrdersForUser && allOrdersForUser.length ? 
                                    <ul className="flex flex-col gap-4">
                                        {
                                            allOrdersForUser.map(item => 
                                                <li key={item._id} className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                    <div className="flex">
                                                        <h1 className="font-bold text-lg mb-3 flex-1">#order : {item._id}</h1>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900 ">Total paid amount</p>
                                                            <p className="mr-3 text-2xl font-semibold text-gray-900 ">{item.totalPrice}</p>
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
                                                    <button  onClick={()=>router.push(`/orders/${item._id}`)}
                                                    className="disabled:opacity-50 mt-5 inline-block -ml-1  bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-lg hover:bg-gray-800">
                                                        View Order Details
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
                    </div>
                </div>
            </section>
        </div>
    )
}