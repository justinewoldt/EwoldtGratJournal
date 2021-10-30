import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import { Auth } from "@supabase/ui"
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'

export default function Home(){

  //gets logged in user from Auth.UserContextProvider
  //if no suer is logged in, user will be null
  //if a user is loggin in, user wll be an object with user info

  const { user } = Auth.useUser()



  return (
    <div className="bg-blue-500 flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Gratitude App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl p-6 font-mono antialiased text-white">Gratitude App</h1>

      <main className="container max-w-prose border-8 rounded-2xl border-color border-green-200">
        {
          user ? (<div>
              <GratitudeApp user = { user }/>
              <button onClick={async() => {
                let {error} = await supabase.auth.signOut()
                if(error) {console.log(error)}
              }} className = "text-pink-300">
              Logout
              </button>
            </div>
          ) : (
            <div className = "bg-white">
              <Auth supabaseClient = {supabase} socialLayout = "horizontal" socialButtonSize = "xlarge" />
            </div>
          )
        }
      </main>

    </div>
  )
}
