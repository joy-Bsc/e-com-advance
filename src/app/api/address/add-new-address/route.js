import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
    fullName : Joi.string().required(),
    address : Joi.string().required(),
    city : Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required()
});

export const dynamic = 'force-dynamic';

export async function POST(req){
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const data = await req.json();
            const { userID, fullName, address, city, country, postalCode } = data;
            const { error } = AddNewAddress.validate({ fullName, address, city, country, postalCode, userID });
            

            if(error){
                return NextResponse.json({
                    success: false,
                    status: 400,
                    message: error.details[0].message
                });
            }
            const newlyAddedAddress = await Address.create(data);
            if(newlyAddedAddress){
                return NextResponse.json({
                    success: true,
                    status: 200,
                    message: "New address added successfully",
                    data: newlyAddedAddress
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 400,
                    message: "Error in adding new address"
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Unauthorized user"
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Error in adding new address"
        });
    }
}