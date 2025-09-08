import React from 'react'
import {MeetingGetOne} from "../../types"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Scrollbar } from '@radix-ui/react-scroll-area'
import { BookOpenTextIcon, BookTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import { GenerateAvatar } from '@/components/generate-avatar'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { formatDuration } from '@/lib/utils'
import MarkDown from "react-markdown"

interface CompeltedStateProps {
data: MeetingGetOne
}
export const CompletedState = ({data}:CompeltedStateProps) => {
  return (
    <div className='flex flex-col gap-y-4'>
      


      <Tabs defaultValue='Summary'>

        <div className='bg-white rounded-lg border px-3'>
          <ScrollArea>

            <TabsList className='p-0 bg-background justify-start rounded-none h-13'>

              <TabsTrigger value='summary'
              
              
              className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <BookOpenTextIcon/>
                Summary
              </TabsTrigger>


              <TabsTrigger value='transcript'
              
              
              className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <FileTextIcon/>
                Transcript
              </TabsTrigger>



              
              <TabsTrigger value='recording'
              
              
              className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <FileVideoIcon/>
                Recording
              </TabsTrigger>


                      <TabsTrigger value='chat'
              
              
              className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <SparkleIcon/>
                Chat Ai
              </TabsTrigger>

            </TabsList>
            <Scrollbar orientation='horizontal' />
          </ScrollArea>

        </div>

        <TabsContent value='recording'>
          <div className='bg-white rounded-lg border px-4 py-5'>



            <video
            src={data.recordingUrl!}
            className='w-full rounded-lg'
            controls
            
            />
          </div>

        </TabsContent>



        
        <TabsContent value='summary'>
          <div className='bg-white rounded-lg border px-4 py-5'>


<div className='px-4 py-5 gap-y-5 flex-col col-span-5'>

  <h2 className='text-2xl font-medium capitalize'>{data.name}</h2>

  <div className='flex gap-x-2 items-center'>

    <Link href={`/agents/${data.agent.id}`}
    
    className='flex items-center gap-x-2 underline underline-offset-4 capitalize'
    >


      <GenerateAvatar variant='botttsNeutral' seed={data.agent.name} className='size-5'/>
      {data.agent.name}
    </Link>{" "}

    <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>

  </div>

  <div className='flex gap-x-2 items-center'>

    <SparkleIcon className='size-4' />
    <p>General summary</p>

  </div>

  <Badge variant="outline" className='flex items-center gap-x-2 [&>svg]:size-4'>

    <ClockFadingIcon className='text-blue-700'/>
{data.duration ? formatDuration(data.duration): "No duration"}

  </Badge>

  <div>
    <MarkDown 
    
    components={{
      
      h1:(props)=>(<h1 className='text-2xl font-medium mb-6'{...props}/>),
      h2:(props)=>(<h1 className='text-xl font-medium mb-6'{...props}/>),
      h3:(props)=>(<h1 className='text-lg font-medium mb-6'{...props}/>),
      h4:(props)=>(<h1 className='text-base font-medium mb-6'{...props}/>),
      p:(props)=>(<p className='mb-6 leading-relaxed'{...props}/>),
      ul:(props)=>(<ul className='list-disc list-inside mb-6'{...props}/>),
      ol:(props)=>(<ol className='list-decimal list-inside mb-6'{...props}/>),
      li:(props)=>(<li className=' mb-6'{...props}/>),
      strong:(props)=>(<strong className='font-semibold'{...props}/>),
      code:(props)=>(<code className='bg-gray-100 px-1 py-0.5 rounded'{...props}/>),
      blockquote:(props)=>(<blockquote className='border-l pl-4 italic my-4'{...props}/>),
    
    
    
    
    
    }
      
      
      }>
      {data.summary}
    </MarkDown>
  </div>

</div>


          </div>

        </TabsContent>

      </Tabs>
    </div>
  )
}
