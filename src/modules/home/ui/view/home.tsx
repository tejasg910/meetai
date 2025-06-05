"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

const HomeView = () => {
    const trpc = useTRPC();
    const { data, isLoading } = useQuery(trpc.hello.queryOptions({ text: "tejas" }))
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && <p>{data.greeting}</p>}
        </div>
    )
}

export default HomeView