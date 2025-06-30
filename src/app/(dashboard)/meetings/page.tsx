import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import MeetingsView from '@/modules/meetings/ui/view/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = () => {


    const queryCLient = getQueryClient();
    void queryCLient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))


    return (
        <div>

            <HydrationBoundary state={dehydrate(queryCLient)}>
                <Suspense fallback={<LoadingState title="Loading Agents..." description="Please wait while we fetch the agents." />} >
                    <ErrorBoundary fallback={<ErrorState title='Failed to load agents' description='Please try again later.' />}>

                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default Page