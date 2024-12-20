"use client";
import React, { useState } from "react";
import { ShootingStars } from "../../../../components/ui/shooting-stars";
import { StarsBackground } from "../../../../components/ui/stars-background";
import { Card, CardHeader } from "../../../../../components/ui/card";
import Image from "next/image";
import { Separator } from "../../../../../components/ui/separator";
import ph from "../../../../../../public/a89add_3d73f7e43cff4f37bdf0af4772ef6595~mv2.gif";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";
import { Text, Video } from "lucide-react";
import { UploadDropzone } from "../../../../../app/components/Uploadthing";
import Editor from "../../../../components/Editor";

const rules = [
    { id: 1, text: "Remember the human" },
    { id: 2, text: "Behave like you would in real life" },
    { id: 3, text: "Look for the original source of content" },
    { id: 4, text: "Search for duplication before posting" },
    { id: 5, text: "Read the community guidelines" },
];

export default function CreatePostRoute({ params }: { params: { id: string } }) {
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-black w-full px-4 sm:px-6 md:px-12 lg:px-24 gap-6 lg:gap-10 pt-6 lg:pt-12 relative">
            {/* Left Section */}
            <div className="w-full lg:w-[65%] flex flex-col gap-y-6">
                <h1 className="z-50 text-lg sm:text-xl">
                    Subreddit :{" "}
                    <Link
                        href={`/r/${params.id}`}
                        className="text-orange-400 pl-2 hover:underline hover:cursor-pointer underline-offset-4"
                    >
                        r/{params.id}
                    </Link>
                </h1>
                <Tabs defaultValue="post" className="w-full z-50">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">
                            <Text className="h-4 w-4 mr-2" /> Post
                        </TabsTrigger>
                        <TabsTrigger value="image">
                            <Video className="h-4 w-4 mr-2" />
                            Image & Video
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <Editor imageUrl={imageUrl} subName={params.id} />
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                            <CardHeader>
                                {imageUrl === null ? (
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            setImageUrl(res[0].url);
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert("Error");
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={imageUrl}
                                        alt="uploaded image"
                                        width={500}
                                        height={400}
                                        className="h-80 rounded-lg w-full object-contain"
                                    />
                                )}
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image
                            className="h-16 w-16 sm:h-20 sm:w-20"
                            src={ph}
                            alt="pfp"
                            height={350}
                            width={400}
                        />
                        <h1 className="text-base sm:text-lg font-medium">Posting to Reddit</h1>
                    </div>
                    <Separator className="mt-2" />
                    <div className="flex flex-col gap-y-4 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm sm:text-base font-medium">
                                    {item.id}. {item.text}
                                </p>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <ShootingStars />
            <StarsBackground />
        </div>
    );
}
