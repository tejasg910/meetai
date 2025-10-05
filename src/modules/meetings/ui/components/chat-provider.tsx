"use client"
import { LoadingState } from "@/components/loading";
import { authClient } from "@/lib/auth-client";
import { ChatUi } from "./chat-ui";

interface Props {
    meetingId: string;
    meetingName: string;
}


export const ChatProvider = ({meetingId, meetingName}:Props)=>{

    const {data, isPending} = authClient.useSession()
    if(isPending || !data) {
        return (
            <LoadingState description="Loading chat..."  title="Chat"/>
        );
    }


    return <ChatUi

        meetingId={meetingId}
        meetingName={meetingName}
        userID={data.user.id}
        userName={data.user?.name}
        userImage={data.user.image ?? ""}

    />
}