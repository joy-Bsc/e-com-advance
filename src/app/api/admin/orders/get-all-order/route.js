import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import User from "@/models/user"; // Import the User model
import Product from "@/models/product"; // Import the Product model
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === 'admin') {
            const orders = await Order.find({});
            if (orders.length > 0) {
                // Manually join the data
                const ordersWithDetails = await Promise.all(orders.map(async (order) => {
                    const user = await User.findById(order.user);
                    const orderItemsWithProducts = await Promise.all(order.orderItems.map(async (item) => {
                        const product = await Product.findById(item.product);
                        return {
                            ...item.toObject(),
                            product: product ? product.toObject() : null
                        };
                    }));
                    return {
                        ...order.toObject(),
                        user: user ? user.toObject() : null,
                        orderItems: orderItemsWithProducts
                    };
                }));

                return NextResponse.json({
                    status: 200,
                    success: true,
                    message: "All Orders",
                    data: ordersWithDetails
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    success: false,
                    message: "Failed to fetch the orders",
                });
            }
        } else {
            return NextResponse.json({
                status: 401,
                success: false,
                message: "Unauthorized",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
        });
    }
}