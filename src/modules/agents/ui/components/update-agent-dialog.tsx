import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}


export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog title="Edit Agent" description="Edit agent details" open={open} onOpenChange={onOpenChange}>
            <AgentForm onCancel={() => onOpenChange(false)} onSucces={() => onOpenChange(false)} initialValues={initialValues} />
        </ResponsiveDialog>
    )
}