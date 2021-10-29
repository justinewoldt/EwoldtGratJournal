import Head from 'next/head'
import GratitudeApp from '../components/GratitudeApp'
import { Auth } from "@supabase/ui"
import { supabase } from '../utils/supabaseClient'

export default function Home(){

  //gets logged in user from Auth.UserContextProvider
  //if no suer is logged in, user will be null
  //if a user is loggin in, user wll be an object with user info

  const { user } = Auth.useUser()



  return (
    <div className="bg-blue-700 flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Gratitude App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        user ? (<div>
            <GratitudeApp user = {user}/>
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
      </main>

      </div>
  )
}
