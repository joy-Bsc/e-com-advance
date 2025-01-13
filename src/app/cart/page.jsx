"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Cart(){
    const{user,cartItems,setCartItems} = useContext(GlobalContext);
        const router = useRouter();
    
        async function extractAllCartItems(){
            const res = await getAllCartItems(user._id);
           
            
            if(res.success){
                setCartItems(res.data)
                localStorage.setItem('cartItems', JSON.stringify(res.data));
            }
        }
    
        async function handleDelete(cartItem){
            console.log(cartItem);
            const res = await deleteCartItem(cartItem);
            if(res.success){
                extractAllCartItems();
                router.refresh();
                toast.success('Item removed from cart',{
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            
        }
    
        useEffect(() => {
            if(user !== null){
                extractAllCartItems();
            }
        } , [user]);
    return(
        <div>
            <CommonCart 
            cartItems={cartItems}
            handleDeleteCartItem={handleDelete}
            />
        </div>
    )
}