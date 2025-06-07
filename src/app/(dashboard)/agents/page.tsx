import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import { AgentView } from '@/modules/agents/ui/views/agent-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary"



const Agents = async () => {


    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title="Loading Agents..." description="Please wait while we fetch the agents." />}>

                <ErrorBoundary fallback={<ErrorState title='Failed to load agents' description='Please try again later.' />}>
                    <AgentView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>

    )
}

export default Agents