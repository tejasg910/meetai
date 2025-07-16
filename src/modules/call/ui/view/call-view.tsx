"use client"
import { ErrorState } from "@/components/error";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface Props {
    meetingId: string;
}


export const CallView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));


    if (data.status === "completed") {
        return (
            <div
                className="flex h-screen justify-center items-center">

                <ErrorState
                    description="You can no longer join this meeting"
                    title="Meeting has ended"
                />
            </div>
        )
    }
    return <CallProvider meetingId={meetingId} meetingName={data.name} />
}