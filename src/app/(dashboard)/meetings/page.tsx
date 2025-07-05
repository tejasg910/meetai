import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/meetings/params';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import MeetingsView from '@/modules/meetings/ui/view/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { SearchParams } from 'nuqs/server';

interface PageProps {
    searchParams: SearchParams;
}
const Page = async ({ searchParams }: PageProps) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const filters = await loadSearchParams(searchParams);
    if (!session) {
        redirect('/sign-in');
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({ ...filters }))


    return (
        <>
            <MeetingsListHeader />
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