import axios, { AxiosRequestConfig } from 'axios'
import type { NextPage, GetServerSideProps } from 'next'

import { LeagueStandings, LeagueTeamsStatistics } from '../../components'

type Props = {
  name: string
  standings: Array<any>
  statistics: any
}

const League: NextPage<Props> = ({ name, standings, statistics }: Props) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='grid grid-cols-12 w-full lg:w-[1012px]'>
        <div className="col-span-12 lg:col-span-8 flex flex-col items-stretch justify-start">
          <LeagueStandings name={name} standings={standings} />
          <LeagueTeamsStatistics name={name} statistics={statistics}/>
        </div>
        <div className="col-span-4 hidden lg:flex lg:flex-col bg-gray-300 items-center justify-center">
          Hello
        </div>
      </div>
    </div>
  )
}

export default League

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id
  const name = query.name
  const season = query.season

  // Header options for standings
  const standingsOptions: AxiosRequestConfig = {
    method: 'GET',
    url: `${process.env.BASE_URL}/api/league/standings`,
    params: {
      league: id,
      season: season,
    },
  }

  const data: any = await axios
    .request(standingsOptions)
    .then(async (standingsResponse) => {
      const standingsData = standingsResponse.data
      
      // Header options for statistics
      const statisticsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.BASE_URL}/api/league/statistics`,
        params: {
          league: id,
          season: season,
          team: standingsData.map((team: any) => team.id)
        }
      }

      const statistics: Array<any> = await axios
        .request(statisticsOptions)
        .then((statisticsResponse) => {
          return statisticsResponse.data
        })
        .catch((error) => {
          console.error(error)
        })

      return { standings: standingsData, statistics: statistics }
    })
    .catch((error) => {
      console.error(error)
    })
  
  return {
    props: {
      name: name,
      standings: data.standings,
      statistics: data.statistics,
    },
  }
}
