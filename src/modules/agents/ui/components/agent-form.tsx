import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { agentInsertSchema } from "../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { GenerateAvatar } from "@/components/generate-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface AgentFormProps {
    onSucces?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne
}


export const AgentForm = ({ onSucces, onCancel, initialValues }: AgentFormProps) => {


    const trpc = useTRPC();
    const queryClient = useQueryClient()

    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: async() => {
         await    queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());


            if(initialValues?.id){
              await   queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }))
            }

            onSucces?.();
            
        },
        onError: (error) => {
            toast.error(error.message)
            //TODO check if error code is forbidden redirect to /upgrade 

        }
    }))



    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",

        }
    })


    const isEdit = !!initialValues?.id;
    const pending = createAgent.isPending;


    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("update agent")
        }
        else {

            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4 " onSubmit={form.handleSubmit(onSubmit)}>

                <GenerateAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
                <FormField
                    name="name"
                    control={form.control}


                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math tutor" />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}


                />
                <FormField
                    name="instructions"
                    control={form.control}


                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="You are a helpfull assistant that can answer questions and help with assignments " />

                            </FormControl>
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
    )
}