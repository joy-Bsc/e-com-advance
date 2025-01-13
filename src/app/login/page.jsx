"use client";
import { loginFormControls } from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { set } from "mongoose";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialFormData = {
    email: "",
    password: ""
};

export default function Login( ) {
    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();
    const {isAuthUser, setIsAuthUser, user, setUser,  componentLevelLoader,
        setComponentLevelLoader, } = useContext(GlobalContext);

    function isValidForm(){
        return formData && formData.email && formData.email.trim() !== "" 
        && formData.password && formData.password.trim() !== "" ? true : false;

    }

    async function handleLogin(){
        setComponentLevelLoader({loading: true, id: ""});
        const res = await login(formData);
        if(res && res.success){
            console.log("Logged in successfully", res.data);
            setIsAuthUser(true);
            setUser(res?.data.user);
            setFormData(initialFormData);
            Cookies.set("token", res?.data.token);
            localStorage.setItem("user", JSON.stringify(res?.data.user));
            setComponentLevelLoader({loading: false, id: ""});
            toast.success(res.message);
            

        }
        else{
            setIsAuthUser(false);
            setUser(null);
            setComponentLevelLoader({loading: false, id: ""});
            toast.error(res.message);
        }
    }

    useEffect(()=>{
        if(isAuthUser){
            router.push("/");
        }
    }, [isAuthUser]);
    
    return (
        <div className="bg-white relative">
                    <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
                        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                                <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 ">
                                    <p className="w-full text-4xl font-medium text-center font-serif">
                                        Login
                                    </p>
                                    
                                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                                {
                                                    loginFormControls.map((controlItem)=>
                                                    controlItem.componentType === "input" ? (
                                                        <InputComponent
                                                        type = {controlItem.type}
                                                        placeholder = {controlItem.placeholder}
                                                        label = {controlItem.label}
                                                        value = {formData[controlItem.id]}
                                                        onChange = {(e)=> setFormData({...formData, [controlItem.id]: e.target.value})}
                                                        key = {controlItem.id}
                                                        />
                                                    ): null
                                                      )
                                                    
                                                      
                                                }
                                                <button className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                                disabled = {!isValidForm()}
                                                onClick={handleLogin}
                                                >
                                                   { 
                                                   ComponentLevelLoader && ComponentLevelLoader.loading ? <ComponentLevelLoader
                                                    text ={"Logging in"}
                                                    color = {"#ffffff"}
                                                    loading = {componentLevelLoader && componentLevelLoader.loading}
                                                    /> : 
                                                   'Login'}
                                                </button>
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-black"> New to website ?</p>
                                                    <Link href="/register">
                                                    <button className="inline-flex mt-5 w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                                                        Register
                                                    </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <Notification />
                </div>
    )
}