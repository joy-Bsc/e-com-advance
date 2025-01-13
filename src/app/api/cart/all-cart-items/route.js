import connectToDb from "@/database/index";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Product from "@/models/product"; // Ensure Product model is imported
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "please log in!",
                });
            }
            const cartItems = await Cart.find({ userID: id });
            if (cartItems.length > 0) {
                // Manually fetch product details
                const productDetails = await Promise.all(
                    cartItems.map(async (item) => {
                        const product = await Product.findById(item.productID);
                        return {
                            ...item.toObject(),
                            productDetails: product,
                        };
                    })
                );
                return NextResponse.json({
                    success: true,
                    message: "All Cart Items",
                    data: productDetails,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to fetch cart items",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Unauthenticated",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        });
    }
}