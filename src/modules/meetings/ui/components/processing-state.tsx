import { EmptyState } from '@/components/empty'
import React from 'react'



const ProcessingState = () => {
    return (
        <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center'>
            <EmptyState
                image="/processing.svg"
                title="Meeting is completed"
                description='This meeting was completed, summary will be appear soon'
            />



        </div >
    )
}

export default ProcessingState