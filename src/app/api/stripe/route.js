
import { NextResponse } from 'next/server';

const stripe = require('stripe')('sk_test_51QaXPfLdFhyPYanalJb6VjZjlEIDWUhbP7vbkuRh1YZFSHCGjHoUBHackjHiyn7o2IZM9mhDOplUksoZmoxhevNy00S7JqKfQt')
export const dynamic = 'force-dynamic';

export async function POST(req){
    try {
        const res = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: res,
            mode: 'payment',
            success_url: 'http://localhost:3000/checkout' + '?status=success',
            cancel_url: 'http://localhost:3000/checkout' + '?status=cancel',
        })
        return NextResponse.json({
            success: true,
            status: 200,
            id : session.id
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        })
    }
}