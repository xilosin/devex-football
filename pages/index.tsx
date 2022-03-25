import type { NextPage } from 'next'
import Link from 'next/link'

import { LEAGUES } from '../utils'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {LEAGUES.map((league) => {
        return (
          <Link
            href={{
              pathname: '/League/[id]',
              query: {
                id: league.id,
                name: league.name,
                season: 2021,
              },
            }}
          >
            {league.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Home
