import Head from 'next/head'
import Greeting from '../components/Greeting'
import Button from '../components/Button'

export default function Home() {
    const [user, setUser] = useState({
    "name": "Justin",
    "email": "ewoldt@chapman.edu",
  })
  setUser({"NewUser": "newuseremail"})
  const [gratitudes, setGratitudes] = useState({
    "gratitude": "Life"
  })
  const [hasSubmittedToday, sethasSubmittedToday] = useState({
    "hasSubmittedToday": false
  })
  const addGratitude = (entry) => {
    let newGratitudes = [...gratitudes, entry]
    setGratitudes(newGratitudes)
  }

  <Input />

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Greeting name ="Justin"></Greeting>
        <Button color='green' text='Hello' />
      </main>


    </div>
  )
}
