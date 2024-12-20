"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input";
import axios from "axios";
import qs from "query-string"
import AttachMessage from "./modals/Attach-Message";
import { useModal } from "../../hooks/use-modal-store";
import EmojoPicker from "./Emoji-picket";
import { useRouter } from "next/navigation";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel"
}

const formSchema = z.object({
    content: z.string().min(1),
    user:z.any()
})

export default function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
    const {user} = useKindeBrowserClient();
    console.log(user,"35");
    
    const { onOpen } = useModal()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            user:user
        }
    })
    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            })
            await axios.post(url, values);
            form.reset()
            router.refresh()
        } catch (error) {
            console.log("[OnSubmit error]", error);
        }
    }
    return (
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 flex  pb-6">
                                    <div onClick={() => onOpen("messageFile", { apiUrl, query })}>
                                        <AttachMessage />
                                    </div>
                                    <Input
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200"
                                        placeholder={`Message ${type === "conversation" ? name : "# " + name}`}
                                        {...field}
                                    />
                                    <div className="relative right-12 mr-12 top-[14px] ">
                                        <EmojoPicker onChange={(emoji:string)=> field.onChange(`${field.value} ${emoji}`)}/>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}