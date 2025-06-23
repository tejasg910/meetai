import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import AgentIdView from '@/modules/agents/ui/views/agent-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
interface Props {
    params: Promise<{ agentId: string }>
}
const page = async ({ params }: Props) => {
    const { agentId } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }))


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            <Suspense fallback={<LoadingState title="Loading Agent..." description="Please wait while we fetch the agent." />}>

                <ErrorBoundary fallback={<ErrorState title='Failed to load agent' description='Please try again later.' />}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>

        </HydrationBoundary>
    )
}

export default page