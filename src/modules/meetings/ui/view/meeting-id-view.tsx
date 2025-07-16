"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-header"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { UpdateMeetingDialog } from "../components/update-meeting-dialog"
import { useState } from "react"
import UpcommingState from "../components/upcomming-state"
import ActiveState from "../components/active-state"
import CancelledState from "../components/cancelled-state"
import ProcessingState from "../components/processing-state"

interface Props {
    meetingId: string


}


export const MeetingIdView = ({ meetingId }: Props) => {

    const router = useRouter()
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))
    const [RemoveConfirmation, confirmRemoveMethod] = useConfirm("Are you sure?", `Following actions will remove meeting`);

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                //INVALIDATE FOR FREE TIER
                router.push('/meetings')
            }
        })

    )


    const handleRemoveMeeting = async () => {

        const ok = await confirmRemoveMethod();
        if (!ok) {
            return;
        }
        await removeMeeting.mutateAsync({ id: meetingId })

    }


    const isActive = data.status === "active";
    const isUpcomming = data.status === "upcomming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";

    return (
        <>

            <RemoveConfirmation />

            <UpdateMeetingDialog
                initialValues={data}
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}

            />
            <div className="flex-1 py-4 px-4 md:px-8 flex-col flex gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />

                {isCancelled && (<CancelledState />)}
                {isUpcomming && (<UpcommingState meetingId={meetingId} onCancelMeeting={() => { }} isCancelling={false} />)}
                {isActive && (<ActiveState meetingId={meetingId} />)}
                {isProcessing && (<ProcessingState />)}
            </div>
        </>
    )
}