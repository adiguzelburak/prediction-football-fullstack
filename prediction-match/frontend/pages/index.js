import MatchList from '@/components/match-list';
import Navbar from '@/components/navbar';
import Result from '@/components/result';
import LeaderShip from '@/components/table';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, dataMatch, dataUser, dataPredictions }) {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(dataUser)
  }, [dataUser])

  return (
    <main
      className={`mx-auto max-w-7xl py-0 lg:py-4  text-sm ${inter.className}`}
    >
      <div><Navbar /></div>
      <div className=' flex flex-col lg:flex-row justify-around'>
        <div className='lg:w-2/5 w-full px-4 lg:px-0'>
          {/* <button onClick={() => addUser()}>add user</button> */}
          <Result data={dataMatch} />
          <LeaderShip users={data} />
        </div>
        <div className='lg:w-[45%] w-full px-2 lg:px-0'>
          <MatchList
            predictions={dataPredictions}
            matches={dataMatch} />
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { req } = context

  try {
    const resUser = await axios.get(`http://localhost:8000/api/profile`, { headers: { "Authorization": `Bearer ${req.cookies.token}` } })
    const res = await fetch(`http://localhost:8000/api/users`)
    const resMatch = await fetch(`http://localhost:8000/api/match`)
    const resPredictions = await axios.get(`http://localhost:8000/api/predictions/${resUser.data.user._id}`)

    const data = await res.json()
    const dataMatch = await resMatch.json()
    const dataUser = await resUser.data.user;
    const dataPredictions = await resPredictions.data;

    return { props: { data, dataMatch, dataUser, dataPredictions } }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}