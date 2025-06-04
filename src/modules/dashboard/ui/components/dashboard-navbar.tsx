"use client"
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftIcon, PanelRightIcon, Search, SearchIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { DashboardCommand } from './dashboard-command'

export const DashboardNavbar = () => {

    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = React.useState<boolean>(false)
    useEffect(() => {
        const down = (e: KeyboardEvent) => {

            console.log(e.metaKey, e.ctrlKey, e.key)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        }
        document.addEventListener('keydown', down);
        return () => {
            document.removeEventListener('keydown', down);
        }


    }, []);
    return (
        <>

            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className='flex px-4 gap-x-2 items-center py-3 border-b bg-background'>


                <Button className='size-9' variant="outline" onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile) ? <PanelLeftIcon className='size-4' /> : <PanelRightIcon className='size-4' />}
                </Button>

                <Button variant="outline" className='h-9 w-[240px] font-normal justify-start text-muted-foreground hover:text-muted-foreground' size="sm" onClick={() => setCommandOpen((open) => !open)}>
                    <SearchIcon className='size-4' /> Search
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-mutated px-1.5 font-mono text-[10px] text-muted-foreground'><span className='text-xs'>&#8984;</span>K</kbd>
                </Button>
            </nav ></>
    )
}
