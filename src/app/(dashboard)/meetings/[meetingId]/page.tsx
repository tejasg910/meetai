import { ErrorState } from '@/components/error';
import { LoadingState } from '@/components/loading';
import { auth } from '@/lib/auth';
import { MeetingIdView } from '@/modules/meetings/ui/view/meeting-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
interface IProps {
  params: Promise<{ meetingId: string }>
}
const Page = async ({ params }: IProps) => {
  const { meetingId } = await params;


  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/sign-in")
  }


  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))
  //TODO: Prefech meetings.getTranscript
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState description='Loading meeting, please wait ' title="Loading Meeting" />}>
        <ErrorBoundary fallback={<ErrorState description='Somethign went wrong' title={"Error while fetching data"} />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page