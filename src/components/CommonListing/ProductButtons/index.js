"use client"

import { GlobalContext } from "@/context"
import { addToCart } from "@/services/cart"
import { deleteProduct } from "@/services/product"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { toast,ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function ProductButtons({ item }) {
    const pathName = usePathname()
    const {setCurrentUpdatedProduct,user,showCartModal,setShowCartModal} = useContext(GlobalContext);
    const router = useRouter();

    const isAdminView = pathName.includes('admin-view')

    const handleDelete = async(id) => {
        console.log(id);
        const res =await deleteProduct(id);
        if(res){
            router.refresh();
        }
        
        
    }

    async function handleAddToCart(getItem){
        console.log(getItem._id , user._id);
        
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


    return isAdminView ? (
        <><button
            onClick={() =>{ setCurrentUpdatedProduct(item)
            router.push('/admin-view/add-product')
            }}
         className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            Update
        </button>
            <button
            onClick={() =>{ handleDelete(item._id)}}
             className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                Delete
            </button> 
        </>
    ) : (
        <button onClick={()=> handleAddToCart(item)}
         className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            Add to cart
        </button>
    )
}