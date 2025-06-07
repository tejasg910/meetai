import {  CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from '@/components/ui/command'
import React from 'react'
interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder='Find a meeting or agent ' />

            <CommandList>

                <CommandItem>
                    Test
                </CommandItem>
            </CommandList></CommandResponsiveDialog>
    )
}
