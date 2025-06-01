"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

/**
 * Renders the authentication page, allowing users to sign up, sign in, and sign out.
 *
 * Displays a welcome message and sign-out option if a user session exists. Otherwise, presents forms for user registration and login, handling authentication actions and feedback.
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,

      name,

    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        alert("success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  }

  const {
    data: session,
  //refetch the session
  } = authClient.useSession()

  const handleLogin = () => {
    authClient.signIn.email({
      email,
      password,



    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        alert("success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  }



  if(session){
    return (
      <div>
        <h1>Welcome {session.user.name}</h1>
        <Button type="submit" onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }
  return (
    <div>


      <div className="p-4 flex flex-col gap-y-4">
        <Input

          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input

          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={() => onSubmit()}>
          Submit
        </Button>
      </div>


      <div className="p-4 flex flex-col gap-y-4">

        <Input

          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={() => handleLogin()}>
          Submit
        </Button>
      </div>

    </div>
  );
}
