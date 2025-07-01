import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import { auth } from '@/lib/auth';
import { MettingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import MeetingsView from '@/modules/meetings/ui/view/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/sign-in');
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))


    return (
        <>
            <MettingsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title="Loading Meetings..." description="Please wait while we fetch the meetings." />} >
                    <ErrorBoundary fallback={<ErrorState title='Failed to load meetings' description='Please try again later.' />}>

                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Page