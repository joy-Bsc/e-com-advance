import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req) {
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "Unauthenticated",
            });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Please log in!",
            });
        }

        const deleteCartItem = await Cart.findByIdAndDelete(id);
        if (deleteCartItem) {
            return NextResponse.json({
                success: true,
                message: "Item deleted successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to delete item",
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