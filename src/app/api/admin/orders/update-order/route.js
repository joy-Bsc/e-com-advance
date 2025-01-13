import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(req) {
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        const data = await req.json();
        if (isAuthUser?.role === 'admin') {
            const {
                _id,
                shippingAddress,
                orderItems,
                paymentMethod,
                isPaid,
                paidAt,
                isProcessing
            } = data;

            const updateOrder = await Order.findByIdAndUpdate({ _id: _id }, {
                shippingAddress,
                orderItems,
                paymentMethod,
                isPaid,
                paidAt,
                isProcessing
            }, { new: true });

            if(updateOrder){
                return NextResponse.json({
                    status: 200,
                    success: true,
                    message: "Order Updated",
                    data: updateOrder
                })
            } else{
                return NextResponse.json({
                    status: 404,
                    success: false,
                    message: "fail to update the order",
                })
            }
            
        }
        else {
            return NextResponse.json({
                status: 401,
                success: false,
                message: "Unauthorized",
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
        })

    }
}