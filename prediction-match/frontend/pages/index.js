import MatchList from '@/components/match-list';
import Result from '@/components/result';
import LeaderShip from '@/components/table';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, dataMatch }) {
  const { user } = useUser();
  const [userPredictions, setUserPredictions] = useState()
  let randomNumber = Math.random() * 100;
  let counter = Math.floor(randomNumber)




  useEffect(() => {
    axios.get(`http://localhost:8000/api/predictions/${user._id}`)
      .then(res => setUserPredictions(res.data))
  }, [user])

  const addMatch = () => {
    axios.post('http://localhost:8000/api/match', {
      homeTeam: 'team' + counter,
      homeTeamScore: 4 + counter,
      guestTeam: 'guest' + counter,
      guestTeamScore: 3 + counter,
      status: 'waiting'
    })
    counter += 1;
  }

  const addUser = () => {
    axios.post('http://localhost:8000/api/add-user', {
      username: 'user' + counter,
      email: 'guest@gmail.com' + counter,
      age: 10 + counter,
      favouriteTeam: 'team' + counter,
      totalPoint: 0
    })
    counter += 1;
  }
  return (
    <main
      className={`mx-auto max-w-6xl w-full py-20 justify-between text-sm flex flex-col lg:flex-row ${inter.className}`}
    >
      <div className=''>
        <button onClick={() => addMatch()}>add match</button>
        <button onClick={() => addUser()}>add user</button>
        <Result data={dataMatch} />
        <LeaderShip users={data} />
      </div>
      <div className='w-full'>
        <MatchList
          predictions={userPredictions}
          matches={dataMatch} />
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  // const { query } = context
  const res = await fetch(`http://localhost:8000/api/users`)
  const resMatch = await fetch(`http://localhost:8000/api/match`)

  const data = await res.json()
  const dataMatch = await resMatch.json()

  return { props: { data, dataMatch } }
}