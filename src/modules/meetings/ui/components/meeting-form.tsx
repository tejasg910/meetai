import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,

    FormDescription,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CommandSelect } from "./command-select";
import { GenerateAvatar } from "@/components/generate-avatar";
import { MeetingGetOne } from "../../types";
import { meetingInsertSchema } from "../../schema";
import { useState } from "react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
    onSucces?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne
}


export const MeetingForm = ({ onSucces, onCancel, initialValues }: MeetingFormProps) => {


    const trpc = useTRPC();
    const queryClient = useQueryClient()

    const [agentSearch, setAgentSearch] = useState("");
    const [openAgentForm, setOpenAgentForm] = useState(false);
    const agents = useQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch
    }))

    const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
        onSuccess: async (data) => {
            await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));


            //   TODO invalidte free tier usage

            onSucces?.(data.id);

        },
        onError: (error) => {
            toast.error(error.message)
            //TODO check if error code is forbidden redirect to /upgrade 

        }
    }))

    const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));


            if (initialValues?.id) {
                await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }))
            }

            onSucces?.();

        },
        onError: (error) => {
            toast.error(error.message)
            //TODO check if error code is forbidden redirect to /upgrade 

        }
    }))

    const form = useForm<z.infer<typeof meetingInsertSchema>>({
        resolver: zodResolver(meetingInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? "",

        }
    })


    const isEdit = !!initialValues?.id;
    const pending = createMeeting.isPending || updateMeeting.isPending


    const onSubmit = (values: z.infer<typeof meetingInsertSchema>) => {
        if (isEdit) {
            console.log("update meeting")
            updateMeeting.mutate({ ...values, id: initialValues.id })
        }
        else {

            createMeeting.mutate(values)
        }
    }

    return (

        <>

            <NewAgentDialog open={openAgentForm} onOpenChange={setOpenAgentForm} />
            <Form {...form}>
                <form className="space-y-4 " onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        name="name"
                        control={form.control}


                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. Math Consultations" />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}


                    />

                    <FormField
                        name="agentId"
                        control={form.control}


                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <CommandSelect

                                        options={(agents.data?.items ?? []).map((agent) => ({
                                            id: agent?.id,
                                            value: agent?.id,
                                            children: (
                                                <div className="flex items-center gap-x-2">
                                                    <GenerateAvatar seed={agent.name} variant="botttsNeutral" className="border size-6" />
                                                    <span>{agent.name}</span>

                                                </div>
                                            )
                                        }))}

                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                    />

                                </FormControl>

                                <FormDescription>   Not found what you were looking for?{" "}
                                    <button className="text-primary hover:underline" onClick={() => setOpenAgentForm(true)} type="button">
                                        Create new agent
                                    </button></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}


                    />

                    <div className="flex justify-between gap-2">
                        {
                            onCancel && (<Button variant="ghost" onClick={onCancel} disabled={pending} type="button">
                                Cancel
                            </Button>)
                        }

                        <Button disabled={pending}>{isEdit ? "Update" : "Create"}</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}