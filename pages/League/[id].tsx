import axios, { AxiosRequestConfig } from 'axios'
import type { NextPage, GetServerSideProps } from 'next'
import {
  LeagueStandings,
  LeagueTeamsStats,
  LeaguePlayersStats,
} from '../../components'

type Props = {
  name: string
  standings: Array<any>
  statistics: any
}

const League: NextPage<Props> = ({ name, standings, statistics }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="grid w-full grid-cols-12 lg:w-[1012px]">
        <div className="col-span-12 flex flex-col items-stretch justify-start lg:col-span-8">
          <LeagueStandings name={name} standings={standings} />
          <LeagueTeamsStats name={name} statistics={statistics.teams} />
          <LeaguePlayersStats name={name} statistics={statistics.players} />
        </div>
        <div className="col-span-4 hidden items-center justify-center bg-gray-300 lg:flex lg:flex-col">
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

      // Header options for team statistics
      const teamsStatisticsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.BASE_URL}/api/league/statistics/teams`,
        params: {
          league: id,
          season: season,
          teams: standingsData.map((team: any) => team.id),
        },
      }

      // Header options for player statistics
      const urls = ['topscorers', 'topassists', 'topredcards', 'topyellowcards']
      const playersStatisticsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.BASE_URL}/api/league/statistics/players`,
        params: {
          league: id,
          season: season,
          urls: urls,
        },
      }

      // API call for team statistics
      const teamsStatistics: Array<any> = await axios
        .request(teamsStatisticsOptions)
        .then((statisticsResponse) => {
          return statisticsResponse.data
        })
        .catch((error) => {
          console.error(error)
        })

      // API call for player statistics
      const playersStatistics: Array<any> = await axios
        .request(playersStatisticsOptions)
        .then((statisticsResponse) => {
          return statisticsResponse.data
        })

      return {
        standings: standingsData,
        statistics: { 
          teams: teamsStatistics, 
          players: playersStatistics 
        },
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return {
    props: {
      name: name,
      ...data,
    },
  }
}
