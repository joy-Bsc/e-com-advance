import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(req){
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const data = await req.json();
            const {_id , fullName ,city ,address ,country , postalCode} = data;
            const updatedAddress = await Address.findOneAndUpdate({
                _id : _id
            },{fullName ,city ,address ,country , postalCode},{new:true});
            if(updatedAddress){
                return NextResponse.json({
                    success: true,
                    status: 200,
                    message: "Address updated successfully",
                    data: updatedAddress
                })
            } else {
                return NextResponse.json({
                    success: false,
                    status: 400,
                    message: "Error in updating address"
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
            message: "Error in updating address"
        })
    }
}