import { productByCategory } from "@/services/product";
import CommonListing from "@/components/CommonListing";

export default async function KidsAllProducts(){
    const getAllProducts = await productByCategory('men');
    return (
        <CommonListing data={getAllProducts.data && getAllProducts.data} />
    )
}