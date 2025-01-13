import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
    const { details } = await params;
    const productDetailsData = await productById(details);

    return (
        <div className="text-black">
            <CommonDetails item={productDetailsData && productDetailsData.data} />
        </div>
    );
}