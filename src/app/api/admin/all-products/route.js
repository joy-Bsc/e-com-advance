import connectToDb from "@/database";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export const dynamic = "force-dynamic";

export async function GET(req){
    try {
        await connectToDb();
        const user = "admin";
        if(user==='admin'){
            const extractAllProducts =  await Product.find({});
            if(extractAllProducts){
                return NextResponse.json({
                    success:"true",
                    message:"all products",
                    data:extractAllProducts
                })
            }else{
                return NextResponse.json({
                    success:"false",
                    status:204,
                    message:"no products found",
                    
                })
            }

        }else{
            return NextResponse.json({
                success:"false",
                message:"you are not authorized",
            })
        }
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:"false",
            message:"you are not authorized",
        })
        
    }
}