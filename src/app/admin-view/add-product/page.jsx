"use client";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { GlobalContext } from "@/context";
import { addNewProduct, updateProduct } from "@/services/product";
import { adminAddProductFormControls, AvailableSizes, firebaseConfig, firebaseStorageURL } from "@/utils";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFieName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2);
    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFieName(file);
    const storageReference = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed',
            (snapshot) => { },
            (error) => {
                reject(error);
            }, () => {
                getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => resolve(downloadURL)).catch((error) => reject(error));
            }
        )
    })
}

const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    sizes: [],
    deliveryInfo: "",
    onSale: "No",
    imageUrl: "",
    priceDrop: 0,
}

export default function AddProduct() {
    const [formData, setFormData] = useState(initialFormData);
    const { currentUpdatedProduct } = useContext(GlobalContext);
    const router = useRouter();
    console.log({ currentUpdatedProduct });

    useEffect(() => {
        console.log("useEffect triggered with currentUpdatedProduct:", currentUpdatedProduct);
        if (currentUpdatedProduct !== null && currentUpdatedProduct._id !== formData._id) {
            console.log("Setting form data with:", currentUpdatedProduct);
            setFormData({ ...currentUpdatedProduct });
        } else {
            console.log("currentUpdatedProduct is null or already set");
        }
    }, [currentUpdatedProduct]);

    useEffect(() => {
        console.log("Form data updated to:", formData);
    }, [formData]);

    async function handleImage(e) {
        console.log(e.target.files[0]);
        const extractImageUrl = await helperForUploadingImageToFirebase(e.target.files[0]);
        console.log(extractImageUrl);
        if (extractImageUrl !== '') {
            setFormData({
                ...formData,
                imageUrl: extractImageUrl
            });
        }
    }

    function handleTileClick(getCurrentItem) {
        console.log(getCurrentItem);

        let cpySizes = [...formData.sizes];
        const index = cpySizes.indexOf(getCurrentItem.id);
        if (index === -1) {
            cpySizes.push(getCurrentItem.id);
        } else {
            cpySizes = cpySizes.filter((id) => id !== getCurrentItem.id);
        }
        setFormData({
            ...formData,
            sizes: cpySizes
        });
    }

    async function handleAddProduct() {
        const res = currentUpdatedProduct!==null ?await updateProduct(formData) : await addNewProduct(formData);
        console.log(res);
        toast.success(res.message);
        setFormData(initialFormData);
        router.push("/admin-view/all-product");
    }
    console.log(formData.name);
    

    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative text-black">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                    <input
                        accept="image/*"
                        max="1000000"
                        type="file"
                        onChange={handleImage}
                    />
                    <div className="flex gap-2 flex-col">
                        <label className="text-black">Available sizes</label>
                        <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes} />
                    </div>
                    {
                        adminAddProductFormControls.map(controlItem =>
                            controlItem.componentType === "input" ? <InputComponent
                                key={controlItem.id}
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })}
                            /> :
                                controlItem.componentType === "select" ? <SelectComponent
                                    key={controlItem.id}
                                    options={controlItem.options}
                                    label={controlItem.label}
                                    value={formData[controlItem.id]}
                                    onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })}
                                /> : null
                        )
                    }
                    <button onClick={handleAddProduct} className="inline-flex w-full bg-black text-white px-4 py-2 rounded-lg text-lg items-center font-medium uppercase tracking-wide justify-center">
                        {currentUpdatedProduct ? "Update" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    )
}