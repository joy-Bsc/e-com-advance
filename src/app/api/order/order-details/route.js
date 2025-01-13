import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import Product from "@/models/product"; // Import the Product model
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");

            console.log(`Fetching orders for user ID: ${id}`); // Log the user ID

            const orders = await Order.find({ _id: id });
            console.log(`Orders found: ${orders.length}`); // Log the number of orders found

            if (orders.length > 0) {
                // Manually join the data
                const ordersWithProducts = await Promise.all(orders.map(async (order) => {
                    const orderItemsWithProducts = await Promise.all(order.orderItems.map(async (item) => {
                        const product = await Product.findById(item.product);
                        return {
                            ...item.toObject(),
                            product: product ? product.toObject() : null
                        };
                    }));
                    return {
                        ...order.toObject(),
                        orderItems: orderItemsWithProducts
                    };
                }));

                return NextResponse.json({
                    status: 200,
                    success: true,
                    data: ordersWithProducts
                });
            } else {
                console.log(`No orders found for user ID: ${id}`); // Log if no orders are found
                return NextResponse.json({
                    status: 200,
                    success: true,
                    data: []
                });
            }
        } else {
            return NextResponse.json({
                status: 401,
                success: false,
                message: "Unauthorized"
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Server Error"
        });
    }
}