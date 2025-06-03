"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'

const HomeView = () => {
    const router = useRouter();
    const session = authClient.useSession();
    if (!session) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <p>Logged in as {session.data?.user.email}</p>
            <Button type="submit" onClick={() => authClient.signOut({fetchOptions:{onSuccess:()=>router.push("/sign-in")}})}>
                Sign Out
            </Button>
        </div>
    )
}

export default HomeView