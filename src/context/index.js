"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { set } from 'mongoose';

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
    shippingAddress : {},
    paymentMethod:'',
    totalPrice : 0,
    isPaid : false,
    paidAt: new Date(),
    isProcessing: true
}

export default function GlobalState({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [ componentLevelLoader, setComponentLevelLoader] = useState({loading: false, id : ""});
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [user, setUser] = useState(null);
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const[showCartModal , setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const[addresses , setAddresses] = useState([]);
    const [addressFormData , setAddressFormData] = useState({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
    });


    const protectedRoutes = [
        '/cart',
        '/checkout',
        '/account',
        '/orders',
        '/admin-view',
        '/admin-view/add-product',
        '/admin-view/all-product'
    ]
    const protectedAdminRoutes = [
        
        '/admin-view',
        '/admin-view/add-product',
        '/admin-view/all-product'
    ]
    const [checkoutFormData , setCheckoutFormData] = useState(initialCheckoutFormData);
    const [allOrdersForUser , setAllOrdersForUser] = useState([]);
    const [orderDetails ,setOrderDetails] = useState(null);
    const [allOrdersForAllUsers , setAllOrdersForAllUsers] = useState([]);
    const router = useRouter();
    const pathName = usePathname();

    console.log(Cookies.get("token"));
    
    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem("user")) || {};
            const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            setUser(userData);
            setCartItems(getCartItems);
        } else {
            setIsAuthUser(false);
            setUser({});
        }
    }, []); 

    useEffect(()=>{
        if((user && Object.keys(user).length === 0) && protectedRoutes.indexOf(pathName) > -1){
            router.push('/login');
        }
    },[user, pathName]);

    useEffect(()=>{
        if(user !== null && user && Object.keys(user).length > 0 && user?.role !== 'admin' && protectedAdminRoutes.indexOf(pathName) > -1){
            router.push('/unauthorized-page');
        }
    },[user, pathName]);

    return (
        <GlobalContext.Provider value={{ showModal, 
        setShowModal,
        pageLevelLoader, 
        setPageLevelLoader, 
        componentLevelLoader,
        setComponentLevelLoader,
        isAuthUser, 
        setIsAuthUser, 
        user, 
        setUser,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers}}>
            {children}
        </GlobalContext.Provider>
    );
}