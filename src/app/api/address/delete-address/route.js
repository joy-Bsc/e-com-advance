import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function DELETE(req){
    try {
        await connectToDb();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(!id){
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Address ID is required"
            })
        }
        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const deletedAddress = await Address.findByIdAndDelete(id);
        if(deletedAddress){
            return NextResponse.json({
                success: true,
                status: 200,
                message: "Address deleted successfully",
                data: deletedAddress
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Error in deleting address"
            })
        }
        } else {
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Unauthorized user"
            })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            status: 500,
            message: "Error in deleting address"
        })
    }
}