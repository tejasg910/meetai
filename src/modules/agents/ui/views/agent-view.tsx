"use client"


import { ErrorState } from "@/components/error"
import { LoadingState } from "@/components/loading"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { columns } from "../components/column"
import { EmptyState } from "@/components/empty"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { DataPagination } from "../../../../components/data-pagination"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/data-table"

export const AgentView = () => {
    const router = useRouter()
    const [filters, setFilters] = useAgentsFilters();

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))


    return (
        <div className=" flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 ">
            <DataTable columns={columns} data={data.items} onRowClick={(row) => router.push(`/agents/${row.id}`)} />
            <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />
            {
                data.items.length === 0 && (
                    <EmptyState
                        description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participents during the call."
                        title="Create your first agent"
                    />
                )
            }

        </div>
    )
}