import type { NextPage, GetStaticProps } from 'next'
import { useCallback, useMemo } from 'react'

import { StandingsTable } from '../../components'
import { DATA } from '../../utils'

interface Props {
  standings: Array<any>
}

const League: NextPage<Props> = ({ standings }: Props) => {
  
  const formatStandings = useCallback(
    (unformattedData: typeof standings) => {
      let formattedData = []

      for (let team of unformattedData) {
        formattedData.push(
          {
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
            form: team.form
          }
        )
      }
      
      return formattedData
    }, 
    []
  )

  const formattedStandings = useMemo(() => formatStandings(standings), [standings])
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <StandingsTable standings={formattedStandings} />
    </div>
  )
}

export default League

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      standings: DATA,
    },
  }
}