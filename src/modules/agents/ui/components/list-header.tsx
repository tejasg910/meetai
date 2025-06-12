"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentDialog } from "./agent-dialog"
import { useState } from "react"

export const AgetListHeader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (<>

        <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 ">


            <div className="flex items-center justify-between">
                <h5>My Agent</h5>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Agent</Button>

            </div>
        </div>


    </>)
}