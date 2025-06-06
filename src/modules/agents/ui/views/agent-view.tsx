"use client"


import { ErrorState } from "@/components/error"
import { LoadingState } from "@/components/loading"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export const AgentView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())


    return (
        <div>
            <h1>Agents</h1>
            <ul>
                {JSON.stringify(data, null, 2)}
            </ul>
        </div>
    )
}