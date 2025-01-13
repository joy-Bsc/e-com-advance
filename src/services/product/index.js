import Cookies from "js-cookie";


export const addNewProduct = async (formData) => {

    try {
        console.log(formData, 'addformdata');
        
        const response = await fetch('/api/admin/add-product', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while adding the product.' };
    }
};

export const getAllAdminProducts = async () => {
    try {
        const response = await fetch('https://shoppingtoday-by-joy.vercel.app/api/admin/all-products', {
            method: 'GET',
            cache : 'no-cache',
            
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while fetching all products.' };
    }
} 

export const updateProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/update-product', {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while updating the product.' };
    }
};
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while deleting the product.' };
    }
}

export const productByCategory = async (id) => {
    try {
        const response = await fetch(`https://shoppingtoday-by-joy.vercel.app/api/admin/product-by-category?id=${id}`, {
            method: 'GET',
            cache : 'no-cache',
            
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while fetching products by category.' };
    }
}

export const productById = async (id) => {
    try {
        const response = await fetch(`https://shoppingtoday-by-joy.vercel.app/api/admin/product-by-id?id=${id}`, {
            method: 'GET',
            cache : 'no-cache',
            
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while fetching product by id.' };
    }
}
