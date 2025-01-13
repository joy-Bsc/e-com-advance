import Cookies from "js-cookie";

export const createNewOrder = async(formData)=>{
    console.log("formdata",formData); 
    try {
          
        
        const res = await fetch('/api/order/create-order',{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
         
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
    
}

export const getAllOrdersForUser = async(id)=>{
    try {
         const res = await fetch(`api/order/get-all-orders?id=${id}`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
};

export const getOrderDetails = async (id) => {
    try {
        console.log("id",id);
        
        const res = await fetch(`/api/order/order-details?id=${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};

export const getAllOrdersForAllUsers = async()=>{
    try {
        const res = await fetch('/api/admin/orders/get-all-order',{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
};

export const updateStatusOfOrder = async(formData) =>{
        try {
            const res = await fetch('/api/admin/orders/update-order',{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            
        }
};