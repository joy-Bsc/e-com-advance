export const registerNewUser = async (formData) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
        }
     catch (error) {
        console.log('error ', error.message);
        
    }
}