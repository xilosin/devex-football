import axios, { AxiosRequestConfig, AxiosResponseTransformer } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'

import { LEAGUES } from '../utils'

const Home: NextPage = () => {

  /* TESTING Middleware */
  const handleClick = async () => {
    const transformFunc: AxiosResponseTransformer = (data) => { 
      let currData = JSON.parse(data)

      currData.push(2)
      console.log(`${currData} is of type ${typeof currData}`)
      
      return JSON.stringify(currData)
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: '/api',
      transformResponse: [transformFunc, transformFunc]
    }
    
    await axios
      .request(options)
      .then((response) => {
        const data = JSON.parse(response.data)
        console.log(`Client got ${data} of type ${typeof data}`)
        console.log(`Testing data: ${data[0]}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
      <button className='curson-pointer hover:underline' onClick={handleClick}>Test Feature</button>
    </div>
  )
}

export default Home
