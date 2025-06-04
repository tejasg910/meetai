import { authClient } from '@/lib/auth-client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { GenerateAvatar } from '@/components/generate-avatar';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
export const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile()
    const { data, isPending } = authClient.useSession();

    if (isPending || !data?.user) {
        return null;
    }


    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className='rounded-lg border gap-1 border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
                    {data.user.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} alt="User Avatar" />
                        </Avatar>) : <GenerateAvatar seed={data.user.name} variant='initials' className='size-9 mr-3' />}

                    <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                        <p className='text-sm truncate w-full'>{data.user.name}</p>
                        <p className='text-xs truncate w-full'>{data.user.email}</p>
                    </div>

                    <ChevronDownIcon className='size-4  shrink-0' />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className='flex flex-col gap-1'>
                            {data.user.name}
                        </DrawerTitle>
                        <DrawerDescription>
                            {data.user.email}
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter className='flex flex-col gap-2'>
                        <Button variant="outline" onClick={() => { }}>
                            <CreditCardIcon className='size-4 text-black' />
                            Billing
                        </Button>
                        <Button variant="outline" onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") } })}>
                            <LogOutIcon className='size-4 text-black' />
                            Logout
                        </Button>
                    </DrawerFooter>

                    <DrawerClose />
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-lg border gap-1 border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden'>
                {data.user.image ? (
                    <Avatar >
                        <AvatarImage src={data.user.image} alt="User Avatar" />
                    </Avatar>) : <GenerateAvatar seed={data.user.name} variant='initials' className='size-9 mr-3' />}

                <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                    <p className='text-sm truncate w-full'>{data.user.name}</p>
                    <p className='text-xs truncate w-full'>{data.user.email}</p>
                </div>

                <ChevronDownIcon className='size-4  shrink-0' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side="right" className='w-72'>
                <DropdownMenuLabel>
                    <div className='flex flex-col gap-1'>
                        <span className='font-medium truncate'>{data.user.name}</span>
                        <span className='text-sm font-normal truncate text-muted-foreground'>{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
                    Billing
                    <CreditCardIcon className='size-4' />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer flex items-center justify-between' onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/sign-in") } })}>
                    Logout
                    <LogOutIcon className='size-4' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

