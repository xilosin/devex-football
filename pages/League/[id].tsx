import axios, { AxiosRequestConfig } from 'axios'
import type { NextPage, GetServerSideProps } from 'next'

import { LeagueTable, LeagueStatTable } from '../../components'

type Props = {
  name: string
  standings: Array<any>
  statistics: any
}

const League: NextPage<Props> = ({ name, standings, statistics }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <LeagueTable name={name} standings={standings} />
      <LeagueStatTable
        name="Red Cards"
        accessor="cards.red"
        statistic={statistics.cards.red}
      />
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
