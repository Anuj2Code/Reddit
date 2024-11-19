"use client"
import { AppWindow, Heart, MessageCircle, PersonStanding } from "lucide-react";
import { AnimatedTooltip } from "../../app/components/ui/animated-tooltip"

interface props {
    articleId:string
}

const FloatDock = ({articleId}:props) => {

    const links = [
        {
            title: "Author",
            id:1,
            icon: (
                <PersonStanding className="h-full w-full text-neutral-300" />
            ),
            href: "/dashboard",
        },
        {
            title: "All Story",
            id:2,
            icon: (
                <AppWindow className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "View Comment",
            id:3,
            icon: (
                <MessageCircle className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
    ];
    return (
        <div className="flex flex-row items-center bg-black justify-center mb-10 w-full gap-x-12">
             <AnimatedTooltip items={links} articleId={articleId} />
        </div>
    )
}

export default FloatDock