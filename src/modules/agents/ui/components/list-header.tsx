"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./agent-dialog"
import { useState } from "react"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { SearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/constants"

export const AgetListHeader = () => {


    const [filters, setFilters] = useAgentsFilters()

    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const isFilter = !!filters.search;
    const onClear = () => {
        setFilters({
            search: "", page: DEFAULT_PAGE
        })
    }

    return (<>

        <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 ">


            <div className="flex items-center justify-between">
                <h5>My Agent</h5>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Agent</Button>

            </div>

            <div className="flex items-center gap-x-2 p-1">
                <SearchFilter />
                {isFilter && (
                    <Button variant="outline" size="sm" onClick={onClear}>
                        <XCircleIcon />
                    </Button>
                )}
            </div>
        </div>


    </>)
}