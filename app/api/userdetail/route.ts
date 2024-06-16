import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { userName} = body;
        
        
        if (!userName) {
            return new NextResponse("Missing Username", { status: 402 });
        }

        const user = await db.user.findUnique({
            where: {
                username: userName
            }
        })


        if (!user) {
            return new NextResponse("invalid username", { status: 400 });
        }
        return NextResponse.json(user);
    }
    catch (error) {
        console.log(error, "Error");
        return new NextResponse('internal error', { status: 500 })
    }
}

export async function PATCH(
    request: Request
) {
    try {
        const body = await request.json();
        const { userName ,values} = body;
        console.log(userName)
        if (!userName) {
            return new NextResponse("Missing Username", { status: 402 });
        }

        const user = await db.user.update({
            where: {
                username: userName
            },
            data:{
                name: values?.name,
                password: values?.password,
                location: values?.location,
                collegeName: values?.collegeName,
                socialLinks: values?.socialLinks,
                skills: values?.skills
            }
        })

        return NextResponse.json(user);
    }
    catch (error) {
        console.log(error, "Error");
        return new NextResponse('internal error', { status: 500 })
    }
}