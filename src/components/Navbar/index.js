"use client";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../Common Modal";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, isAdminView ,  }) {
    const{currentUpdatedProduct,setCurrentUpdatedProduct} = useContext(GlobalContext);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(pathName !== "/admin-view/add-product" && currentUpdatedProduct !== null){
            setCurrentUpdatedProduct(null);
        }

    }, [pathName]);
    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white
                ${isModalView ? "border-none" : "border border-gray-100"}`}>
                {isAdminView ? adminNavOptions.map(item => (
                    <li onClick={()=> router.push(item.path)}
                     className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 " key={item.id}>
                        {item.label}
                        
                    </li>
                )) : navOptions.map(item => (
                    <li onClick={()=> router.push(item.path)}
                    className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 " key={item.id}>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Navbar = () => {
    const { showModal, setShowModal,showCartModal } = useContext(GlobalContext);
    const { isAuthUser, user, setIsAuthUser, setUser } = useContext(GlobalContext);
    const router = useRouter();
    const pathName = usePathname();
    console.log(isAuthUser, user, 'navbar');
    const isAdminView = pathName.includes("/admin-view");

    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.clear();
        router.push("/");
    }

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div onClick={()=> router.push("/")} className="flex items-center cursor-pointer">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                            E-commerce App
                        </span>
                    </div>
                    <div className="flex md:order-2 gap-2">
                        {isAdminView && isAuthUser ? (
                            <Fragment>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Admin</button>
                            </Fragment>
                            
                        ) : <Fragment>
                                 <button 
                                    onClick={()=> router.push("/account")}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg">Account</button>
                                 <button onClick={()=> router.push("/cart")}
                                 className="bg-red-500 text-white px-4 py-2 rounded-lg">Cart</button>
                            </Fragment>}

                        {user?.role === "admin" ? (
                            isAdminView ? (
                                <button onClick={()=> router.push("/")} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Client View</button>
                            ) : (
                                <button onClick={()=> router.push("/admin-view")} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Admin View</button>
                            )
                        ) : null}
                        {isAuthUser ? (
                            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Logout</button>
                        ) : (
                            <button onClick={() => router.push('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
                        )}
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavItems isAdminView={isAdminView} />
                </div>
            </nav>
            <CommonModal
                show={showModal}
                setShow={setShowModal}
                showModalTitle={false}
                mainContent={<NavItems isModalView={true} isAdminView={isAdminView} router={router} />}
                
            />
            {
                showCartModal && 
                <CartModal />
            }
        </>
    );
};

export default Navbar;