import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        console.log("req order");

        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const data = await req.json();
            const { user, shippingAddress, orderItems, paymentMethod, totalPrice, isPaid, isProcessing, paidAt } = data;

            // Ensure all required fields are provided
            if (!user || !shippingAddress || !orderItems || !paymentMethod || !totalPrice || isPaid === undefined || isProcessing === undefined || !paidAt) {
                return new NextResponse(JSON.stringify({
                    success: false,
                    message: "Missing required fields"
                }), { status: 400 });
            }

            const saveNewOrder = await Order.create(data);
            if (saveNewOrder) {
                await Cart.deleteMany({ userID: user });
                return new NextResponse(JSON.stringify({
                    success: true,
                    message: "Order created successfully",
                    data: saveNewOrder
                }), { status: 201 });
            } else {
                return new NextResponse(JSON.stringify({
                    success: false,
                    message: "Failed to create order"
                }), { status: 500 });
            }
        } else {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Unauthorized"
            }), { status: 401 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Server Error"
        }), { status: 500 });
    }
}