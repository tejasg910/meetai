import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth';
import { Signin } from '@/modules/auth/ui/view/sign-in-view'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {

  const session = await auth.api.getSession({ headers: await headers() });

  if (!!session) {
    redirect('/');
  }
  return (

    <div>




      <Signin />

    </div>


  )
}

export default Page