import MatchList from '@/components/match-list';
import Navbar from '@/components/navbar';
import Result from '@/components/result';
import LeaderShip from '@/components/table';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ dataUsers, dataMatch, dataProfile, dataPredictions }) {
  const { user, setUser, setIsAuth, isPredictioned, isMatchDataChanged } = useUser();
  const [predictionsData, setPredictionsData] = useState();
  const [matchesData, setMatchesData] = useState();
  const [openPanelCounter, setOpenPanelCounter] = useState(0);

  const panelCode = async () => {
    if (openPanelCounter <= 5) {
      setOpenPanelCounter(prev => prev + 1);
    } else {
      setOpenPanelCounter(0)
    }
  }

  useEffect(() => {
    if (dataProfile) {
      setIsAuth(true)
      setUser(dataProfile)
      Cookies.set('user', JSON.stringify(dataProfile))
      setPredictionsData(dataPredictions)
      setMatchesData(dataMatch)
    } else {
      setIsAuth(false)
      Cookies.remove('token')
      Cookies.remove('user')
    }
  }, [dataProfile])

  useEffect(() => {
    if (user?._id) {
      axios.get(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/predictions/${user._id}`)
        .then((res) => setPredictionsData(res.data))
    }
  }, [user, isPredictioned])

  useEffect(() => {
    axios.get(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/match`)
      .then((res) => setMatchesData(res.data))

  }, [isMatchDataChanged])


  return (
    <main
      className={`mx-auto max-w-7xl py-0 lg:py-4  text-sm ${inter.className}`}
    >
      <div onClick={() => panelCode()} ><Navbar /></div>
      {openPanelCounter === 5 && <Result data={dataMatch} />}

      <div className=' flex flex-col lg:flex-row justify-around'>
        <div className='lg:w-2/5 w-full px-4 lg:px-0'>
          {/* <button onClick={() => addUser()}>add user</button> */}
          <LeaderShip users={dataUsers} />
        </div>
        <div className='lg:w-[45%] w-full px-2 lg:px-0'>
          <MatchList
            predictions={predictionsData}
            matches={matchesData} />
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  if (req.cookies.token) {
    try {
      const resUsers = await fetch(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/users`)
      const resMatch = await fetch(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/match`)
      const resProfile = await axios.get(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/profile`, { headers: { "Authorization": `Bearer ${req.cookies.token}` } })
      const resPredictions = await axios.get(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/predictions/${resProfile.data.user._id}`)

      const dataUsers = await resUsers.json();
      const dataMatch = await resMatch.json();
      const dataProfile = await resProfile.data.user;
      const dataPredictions = await resPredictions.data;

      return { props: { dataUsers, dataMatch, dataProfile, dataPredictions } }
    } catch (error) {
      return { props: { message: 'Something went wrong' } };
    }
  }
  else {
    try {
      const resUsers = await fetch(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/users`)
      const resMatch = await fetch(`https://prediction-game-backend-bb3bc6afab92.herokuapp.com/api/match`)

      const dataUsers = await resUsers.json();
      const dataMatch = await resMatch.json();

      return { props: { dataUsers, dataMatch } }
    } catch (error) {
      console.log('hello', error)
      return { props: { message: 'Visitor' } };
    }
  }

}