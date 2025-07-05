"use client"
import { DataTable } from '@/components/data-table';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from '../components/column';
import { EmptyState } from '@/components/empty';
import { DataPagination } from '@/components/data-pagination';
import { useRouter } from 'next/navigation';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';

const MeetingsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }))
  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>

      <DataTable onRowClick={(row) => router.push(`/meetings/${row.id}`)} columns={columns} data={data.items} />

      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {
        data.items.length === 0 && (
          <EmptyState
            description="Create a meeting to get started. Each agent will follow your instructions and can interact with participants during the call."
            title="Create your first meeting"
          />
        )
      }
    </div>
  )
}

export default MeetingsView