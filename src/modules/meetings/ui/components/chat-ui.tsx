import { LoadingState } from "@/components/loading";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Channel as StreamChannel } from "stream-chat";

import {
useCreateChatClient, 
Chat, 
Channel, 
MessageInput, 
MessageList, 
Thread, 
Window

} from "stream-chat-react"
import "stream-chat-react/dist/css/v2/index.css"

interface ChatUiProps {
    meetingId:string;
    meetingName:string;
    userID:string;
    userName:string;
    userImage:string  | undefined;

}

export const ChatUi = ({meetingId, meetingName, userID, userName, userImage}:ChatUiProps)=>{


    const trpc = useTRPC();
    const {mutateAsync:generateChatToken} = useMutation(trpc.meetings.generateChatToken.mutationOptions());

    const [channel, setChannel] = useState<StreamChannel>()


    const client = useCreateChatClient({
        apiKey:process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!, 
        tokenOrProvider:generateChatToken, 
        userData:{
            id:userID, 
            name:userName, 
            image:userImage
        }
    })

    useEffect(()=>{

        if(!client) return;
        const channel = client.channel("messaging",meetingId, {members:[userID]})

        setChannel(channel)

    },[client, meetingId, meetingName, userID])


    if(!client){
        return <LoadingState description="Loading chat" title="Loading chat" />
    }

    return (

        <div className="bg-white rounded-lg border overflow-hidden">

      
        <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
                <Window>
                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">

                    <MessageList />
                    </div>
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>

          </div>
    )
}