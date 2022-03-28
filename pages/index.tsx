import type { NextPage } from 'next'
import Link from 'next/link'

import { LEAGUES } from '../utils'

const Home: NextPage = () => {

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {LEAGUES.map((league) => {
        return (
          <Link
            key={ league.id }
            href={{
              pathname: '/League/[id]',
              query: {
                id: league.id,
                name: league.name,
                season: 2020,
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
