import connectToDb from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDb();

    const { name, email, password, role } = await req.json();

    //validate the schema
    const { error } = schema.validate({ name, email, password, role });
    if(error){
        return NextResponse.json({
            success : false,
            message : email.details[0]
        })
    }
    try {
        //check if the user already exists
        const isUserAlreadyExists = await User.findOne({email});
        if(isUserAlreadyExists){
            return NextResponse.json({
                success : false,
                message : "User already exists please try with another email"
            })
        }
        else{
            const hashPassword = await hash(password, 12);
            const newlyCreatedUser = await User.create({
                name,
                email,
                password : hashPassword,
                role
            });
            if(newlyCreatedUser){
                return NextResponse.json({
                    success : true,
                    message : "account created successfully"
                })
            }

        }
        
    } catch (error) {
        console.log('error in new user registration', error.message);
        return NextResponse.json({
            success : false,
            message : "Error in new user registration"
        
    })
} 
} 
