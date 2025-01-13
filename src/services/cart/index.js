import Cookies from "js-cookie"

export const addToCart = async(formData) =>{
    console.log(formData);
    
    try {
        
        const res =  await fetch('/api/cart/add-to-cart',{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllCartItems = async(id) =>{
   
   
    
    try {
        const res = await fetch(`https://e-com-advance.vercel.app/api/cart/all-cart-items?id=${id}`,{
            method:'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteCartItem = async(id) =>{
    try {
        const res = await fetch(`/api/cart/delete-from-cart?id=${id}`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
