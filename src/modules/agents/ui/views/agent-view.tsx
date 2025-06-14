"use client"


import { ErrorState } from "@/components/error"
import { LoadingState } from "@/components/loading"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "../components/data-table"
import { columns } from "../components/column"
import { EmptyState } from "@/components/empty"

export const AgentView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())


    return (
        <div className=" flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 ">
            <DataTable columns={columns} data={data} />

            {
                data.length === 0 && (
                    <EmptyState
                        description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participents during the call."
                        title="Create your first agent"
                    />
                )
            }

        </div>
    )
}