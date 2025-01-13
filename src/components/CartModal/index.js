import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../Common Modal";
import { GlobalContext } from "@/context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function CartModal(){
    const{showCartModal,setShowCartModal,user,cartItems,setCartItems} = useContext(GlobalContext);
    const router = useRouter();

    async function extractAllCartItems(){
        const res = await getAllCartItems(user._id);
        console.log(res);
        
        if(res.success){
            setCartItems(res.data)
            localStorage.setItem('cartItems', JSON.stringify(res.data));
        }
    }

    async function handleDelete(cartItem){
        console.log(cartItem._id);
        const res = await deleteCartItem(cartItem._id);
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
        <CommonModal
        showButtons={true}
        show={showCartModal}
        setShow={setShowCartModal}
        mainContent={
            cartItems && cartItems.length ? 
            <ul role="list" className="-my-6 divide-y divide-gray-300">
                {
                    cartItems.map(cartItem => 
                        <li key={cartItem._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={cartItem && cartItem.productDetails && cartItem.productDetails.imageUrl} alt={cartItem.productDetails.name}
                                className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a>
                                                {cartItem && cartItem.productDetails && cartItem.productDetails.name}
                                            </a>
                                        </h3>
                                        
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                            {`$ ${cartItem && cartItem.productDetails && cartItem.productDetails.price}`}
                                        </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <button type="button" className="font-medium text-yellow-700 sm-order-2"
                                    onClick={() => handleDelete(cartItem)}
                                    >Remove</button>
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
             : null
        }
        buttonComponent={
            <Fragment >
                <button
                className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide" 
                onClick={() => {
                    router.push('/cart')
                    setShowCartModal(false)
                }}
                >Go To Cart</button> <br/>
                <button
                 onClick={()=>router.push('/checkout')}
                 disabled={cartItems && cartItems.length === 0}
                className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >Checkout</button>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                    <button
                    onClick={()=> router.push('/product/listing/all-products')}
                     type="button" className="font-medium text-gray-700">
                        continue shopping
                        <span aria-hidden='true'> &rarr;</span>
                    </button>
                </div>
            </Fragment>
        }
        />
    )
}