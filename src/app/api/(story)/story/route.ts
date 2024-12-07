import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.aIOutput.findMany({
            select:{
               content:true,
               prompt:true,
               createdBy:true,
               id:true,
               User:true,
               createdAt:true,
               StoryVote:true,
               follow:true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({
            data: data,
            message: "Post query Fetched!",
            status: "green",
        })
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}