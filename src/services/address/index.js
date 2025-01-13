import Cookies from "js-cookie";

export const addNewAddress = async (formData) => {
    try {
         const res = await fetch('/api/address/add-new-address', {
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

export const fetchAllAddress = async (id) => {
    try {
            const res = await fetch(`/api/address/get-all-address?id=${id}`, {
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
}

export const updateAddress = async (formData) => {
    try {
            const res = await fetch('/api/address/update-address', {
                    method: 'PUT',
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

export const deleteAddress = async (id) => {
    try {
            const res = await fetch(`/api/address/delete-address?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
            });
                const data = await res.json();
                return data;
    } catch (error) {
         console.log(error);
         
    }
}