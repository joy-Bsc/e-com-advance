import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req){
    try {
        await connectToDb();
        const user = await AuthUser(req); // This should be replaced with actual user authentication logic
        if (user?.role === 'admin') {
            const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        if(! id){
            return NextResponse.json({
                success: false,
                message: "Product not found"
            })
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(deletedProduct){
            return NextResponse.json({
                success: true,
                message: "Product deleted successfully",
                data: deletedProduct
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            })
        } 
        } else {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            })
        }
        
    } catch (error) {
        console.log(error);
                 return NextResponse.json({
                    success: false,
                    message: "Something went wrong",
                })
    }
}