import connectToDb from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req){
    try {
        await connectToDb();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(!id){
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Id is required",
            })
        } 
        const getData = await Product.find({_id: id});
        if(getData && getData.length){
            return NextResponse.json({
                success: true,
                data: getData[0],
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "No data found",
            })
        }
    } catch (error) {
        console.log(error);
        return  NextResponse.json({
            success: false,
            message: "Something went wrong",
        })
    }
}