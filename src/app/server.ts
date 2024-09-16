"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma } from "@prisma/client";

export async function UpdateUsername(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const username = formData.get('username') as string;
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                userName: username
            }
        })
        return {
            message: "Succesfully Updated name",
            status: "green",
        };

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This username is alredy used",
                    status: "error",
                };
            }
        }
        throw e;
    }
}

export async function UpdateEmail(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const email = formData.get("email") as string;
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: email
            }
        })
        return {
            message: "Succesfully Updated Email",
            status: "green",
        };
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function CreateCommunity(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const name = formData.get("name") as string;
    try {
        await prisma.subbreddits.create({
            data: {
                name: name,
                userId: user.id
            }
        })
        return redirect('/')
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This Name is alredy used !",
                    status: "error",
                };
            }
        }
    }
}

export async function updateSubDes(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    const name = formData.get("Subname") as string
    const desc = formData.get("description") as string
    try {
        await prisma.subbreddits.update({
            where: {
                name: name
            },
            data: {
                description: desc
            }
        })
        return {
            message: "Succesfully Updated Description",
            status: "green",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function addSubscription(redditId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    try {
        const subExist = await prisma.subscription.findFirst({
            where: {
                subRedditId: redditId,
                userId: user.id
            }
        })
        if (subExist) {
            return {
                message: "You already Subscribed",
            }
        }
        await prisma.subscription.create({
            data: {
                subRedditId: redditId,
                userId: user.id
            }
        })
        return {
            message: "subscribed",
            status: "green",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}