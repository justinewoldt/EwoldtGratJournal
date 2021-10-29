import Greeting from './Greeting'
import Input from "./Input"
import History from './History'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState} from 'react'


export default function GratitudeApp({user}) {
  const [gratitudes, setGratitudes] = useState([])
  const [hasSubmittedToday, sethasSubmittedToday] = useState({
    "hasSubmittedToday": false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    //run the fetchGratitudes() function
    // after the initial render of the app
    // so we have access to the logged in user
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    //get gratitudes data from supabase
    // set value of gratitudes state to that data
    let { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('entry, date_insert_ts')
    if(!error){
      //See if time since last submission > 24 hours
      // if not, set submittedToday to true
      let currentTime = new Date().getTime()
      let mostRecentRecordTime = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
      let hoursSinceLastSubmission = (mostRecentRecordTime - currentTime)/3600000
      let didSubmitToday = hoursSinceLastSubmission < 24
      setSubmittedToday(didSubmitToday)

      setGratitudes(gratitudes)
      setLoading(false)
    } else {
      //was an error
      console.log(error)
      setLoading(false)
      setError(error)
    }
  }


  const addGratitude = async (entry) => {
    const { data, error } = await supabase
    .from('gratitudes')
    .insert([
    { id: user.id },
    { entry: entry },
  ])
  setLoading(true)
  if (error){
    console.log(error)
    setError(error)
  }
  else{
    setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null}])
    setLoading(false)
    setSubmittedToday(true)

    }
  }

  if(loading) {
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return(
    <div className = "bg-gray-700 min-h-screen min-w-screen">
      <main className = "container mx-auto max-w-prose px-4 pt-12">
        <Greeting color = "text-pink-300" user = {user} gratitudes = {gratitudes} hasSubmittedToday={hasSubmittedToday}></Greeting>
        <div className = "spacer" />
        {
          !hasSubmittedToday && <Input handleSubmit={addGratitude}/>
        }
        <div className = "spacer" />
        {
          gratitudes.length > 0 &&
          <History gratitudes={gratitudes} />
        }
      </main>
      <style jsx>{`
        .spacer {
          height: 20px;
        }
      `}
      </style>
    </div>
  )
}
