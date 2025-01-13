import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDb();
        const user = await AuthUser(req);
        if (user?.role === 'admin') {
            const extractData = await req.json();

            const { _id, name, price, description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl } = extractData;

            // Convert onSale to boolean before updating
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: _id },
                {
                    name,
                    price,
                    description,
                    category,
                    sizes,
                    deliveryInfo,
                    onSale: onSale === "Yes",
                    priceDrop,
                    imageUrl
                },
                { new: true }
            );

            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product updated successfully",
                    data: updatedProduct
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Product not found"
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        });
    }
}