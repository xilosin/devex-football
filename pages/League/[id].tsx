import axios, { AxiosRequestConfig } from 'axios'
import type { NextPage, GetServerSideProps } from 'next'
import { useCallback, useMemo } from 'react'

import { StandingsTable } from '../../components'
import { DATA } from '../../utils'

type Props = {
  name: string
  standings: Array<any>
}

const League: NextPage<Props> = ({ name, standings }: Props) => {
  const formatStandings = useCallback((unformattedData: typeof standings) => {
    let formattedData = []

    for (let team of unformattedData) {
      formattedData.push({
        rank: team.rank,
        team: team.team.name,
        played: team.all.played,
        wins: team.all.win,
        draws: team.all.draw,
        losses: team.all.lose,
        goalsFor: team.all.goals.for,
        goalsAgainst: team.all.goals.against,
        goalsDiff: team.goalsDiff,
        points: team.points,
        form: team.form,
      })
    }

    return formattedData
  }, [])

  const formattedStandings = useMemo(
    () => formatStandings(standings),
    [standings]
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <StandingsTable name={name} standings={formattedStandings} />
    </div>
  )
}

export default League

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id
  const name = query.name
  const season = query.season

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: { season: season, league: id },
    headers: {
      'X-RapidAPI-Host': process.env.RAPIDAPI_URL,
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    },
  }

  /* API Call */
  // const data = await axios
  //   .request(options)
  //   .then((response) => {
  //     if (response.data.response.length < 1) return []

  //     return response.data.response[0].league.standings[0]
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  // return {
  //   props: {
  //     name: name,
  //     standings: data,
  //   },
  // }
  

  /* Static Data */
  return {
    props: {
      name: 'League',
      standings: DATA,
    },
  }
}
