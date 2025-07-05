import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CommandSelect } from "./command-select";
import { GenerateAvatar } from "@/components/generate-avatar";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { useState } from "react";
export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();


    const [agentSearch, setAgentSearch] = useState("");


    const { data } = useQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch
    }));

    return (
        <CommandSelect
            placeholder="Agent"
            className="h-9"
            value={filters.agentId ?? ""}
            onSelect={(value) => setFilters({ agentId: value })}

            onSearch={setAgentSearch}
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GenerateAvatar seed={agent.name} variant="botttsNeutral" className="size-4" />
                        {agent.name}
                    </div>
                )
            })) || []
            }


        />
    );
}
