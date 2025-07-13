import { EmptyState } from '@/components/empty'
import { Button } from '@/components/ui/button'
import { VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const CancelledState = () => {
    return (
        <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
            <EmptyState
                image="/cancelled.svg"
                title="Meeting is cancelled"
                description='This meeting was cancelled'
            />
        


        </div >
    )
}

export default CancelledState