import connectToDb from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
    productID: Joi.string().required(),
    userID: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req){
    try {
        await connectToDb();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const data = await req.json();
            const{productID, userID} = data;

            const {error} = AddToCart.validate({productID, userID});
            if(error){
                return NextResponse.json({
                    success : false,
                    message : error.details[0].message,
                })
            }

            const isCurrentCartItemAlreadyExists =  await Cart.findOne({userID, productID});
            if(isCurrentCartItemAlreadyExists){
                return NextResponse.json({
                    success : false,
                    message : "This product is already in your cart ! Please check your cart",
                })
            }

            const saveProductToCart = await Cart.create(data); 
            if(saveProductToCart){
                return NextResponse.json({
                    success : true,
                    message : "Product added to cart successfully",
                })
            } else{
                return NextResponse.json({
                    success : false,
                    message : "Failed to add product to cart",
                })
            }

        } else{
            return NextResponse.json({
                success : false,
                message : "Unauthenticated",
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Internal Server Error",
        })
        
    }
}