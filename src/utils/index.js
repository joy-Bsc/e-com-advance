export const navOptions = [
    {
        id: "home",
        label: "Home",
        path: "/"
    },
    {
        id: "listing",
        label:"All Products",
        path:"/product/listing/all-products"
    },
    {
        id:"listingMen",
        label:"Men",
        path:"/product/listing/men",
    },
    {
        id:"listingWomen",
        label:"Women",
        path:"/product/listing/women",
    },
    {
        id:"listingKids",
        label:"Kids",
        path:"/product/listing/kids",
    },
];

export const adminNavOptions = [
    {
        id:"adminListing",
        label:"Manage All Products",
        path:"/admin-view/all-product",
    },
    {
        id:"adminNewProduct",
        label:"Add New Product",
        path:"/admin-view/add-product",
    },
]

export const registrationFormControls = [
    {
        id: "name",
        type:"text",
        placeholder:"Enter your name",
        label:"Name",
        componentType : "input"
    },
    {
        id: "email",
        type:"email",
        placeholder:"Enter your email",
        label:"email",
        componentType : "input"
    },
    {
        id: "password",
        type:"password",
        placeholder:"Enter your password",
        label:"password",
        componentType : "input"
    },
    {
        id: "role",
        type:"",
        placeholder:"",
        label:"Role",
        componentType : "select",
        options:[
            {
                id:"admin",
                label:"Admin"
            },
            {
                id:"customer",
                label:"Customer"
            }
        ]
    },

]

export const loginFormControls = [
    {
        id: "email",
        type:"email",
        placeholder:"Enter your email",
        label:"email",
        componentType : "input"
    },
    {
        id: "password",
        type:"password",
        placeholder:"Enter your password",
        label:"password",
        componentType : "input"
    },

]

export const adminAddProductFormControls = [
    {
        id: "name",
        type:"text",
        placeholder:"Enter product name",
        label:"Name",
        componentType : "input"
    },
    {
        id: "price",
        type:"number",
        placeholder:"Enter product price",
        label:"Price",
        componentType : "input"
    },
    {
        id: "description",
        type:"text",
        placeholder:"Enter product description",
        label:"Description",
        componentType : "input",
    },
    {
        id: "category",
        type:"",
        placeholder:"",
        label:"Category",
        componentType : "select",
        options:[
            {
                id:"men",
                label:"Men",
            },
            {
                id:"women",
                label:"Women",
            },
            {
                id:"kids",
                label:"Kids",
            }
        ]
    },
    {
        id:"deliveryInfo",
        type:"text",
        placeholder:"Enter delivery info",
        label:"Delivery Info",
        componentType:"input"
    },
    {
        id:"onSale",
        type:"",
        placeholder:"",
        label:"On Sale",
        componentType:"select",
        options:[
            {
                id:"Yes",
                label:"Yes",
            },
            {
                id:"No",
                label:"No",
            }
        ]
    },
    {
        id:"priceDrop",
        type:"number",
        placeholder:"Enter price drop",
        label:"Price Drop",
        componentType:"input"
    }
];

export const AvailableSizes = [
    {
        id:"XS",
        label:"XS"
    },
    {
        id:"S",
        label:"S"
    },
    {
        id:"M",
        label:"M"
    },
    {
        id:"L",
        label:"L"
    },
    {
        id:"XL",
        label:"XL"
    },
    {
        id:"XXL",
        label:"XXL"
    }
]

export const firebaseConfig = {
    apiKey: "AIzaSyCvUUVEr5_ieBR7BVjeeqATBxRMfCmdTz0",
    authDomain: "joy-ict-19d48.firebaseapp.com",
    projectId: "joy-ict-19d48",
    storageBucket: "joy-ict-19d48.firebasestorage.app",
    messagingSenderId: "1085322045009",
    appId: "1:1085322045009:web:5294c6b07aaf2ebe163a70",
    measurementId: "G-85GS8F15L7"
  };

  export const firebaseStorageURL = "gs://joy-ict-19d48.firebasestorage.app";


  export const addNewAddressFormControls = [
    {
        id: "fullName",
        type:"input",
        placeholder:"Enter your full name",
        label:"Full Name",
        componentType : "input"
    },
    {
        id: "address",
        type:"input",
        placeholder:"Enter your address",
        label:"Address",
        componentType : "input"
    },
    {
        id: "city",
        type:"input",
        placeholder:"Enter your city",
        label:"City",
        componentType : "input"
    },
    {
        id: "country",
        type:"input",
        placeholder:"Enter your country",
        label:"Country",
        componentType : "input"
    },
    {
        id: "postalCode",
        type:"input",
        placeholder:"Enter your postal code",
        label:"Postal Code",
        componentType : "input"
    }
  ]
