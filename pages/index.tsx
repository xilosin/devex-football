import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

import { LEAGUES } from '../utils'
import { LeagueStatTable } from '../components'

type Params = {
  hello: string
}

const Home: NextPage = () => {
  const [data, setData] = useState('')

  const handleClick = async () => {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: '/api/hello',
      params: { hello: 'hello' },
    }

    const x: Params = await axios
      .request(options)
      .then((response) => {
        console.log(response)
        return response.data
      })
      .catch((error) => {
        console.error(error)
      })

    setData(x.hello)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {LEAGUES.map((league) => {
        return (
          <Link
            key={ league.id }
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
      <button
        onClick={handleClick}
      >
        Button {data}
      </button>
    </div>
  )
}

export default Home
