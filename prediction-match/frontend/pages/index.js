import MatchList from '@/components/match-list'
import LeaderShip from '@/components/table'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, dataMatch }) {
  return (
    <main
      className={`mx-auto max-w-6xl w-full py-20 justify-between text-sm flex flex-col lg:flex-row ${inter.className}`}
    >
      <div className=''>
        <LeaderShip users={data} />
      </div>
      <div className='w-full'>
        <MatchList matches={dataMatch} />
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8000/api/users`)
  const resMatch = await fetch(`http://localhost:8000/api/match`)

  const data = await res.json()
  const dataMatch = await resMatch.json()

  return { props: { data, dataMatch } }
}