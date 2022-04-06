import React from 'react'

import { StatTable } from '.'

type Props = {
  name: string
  statistics: any
}

const LeaguePlayersStats = ({ name, statistics }: Props) => {
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold">{name} Players Statistics</h1>
      <div className="w-full flex flex-row flex-wrap mb-4">
        <StatTable
          name="Assists"
          headerAccessor="player.name"
          cellAccessor="statistics[0].goals.assists"
          cellClassName='bg-blue-600'
          statistic={statistics.assists}
        />
        <StatTable
          name="Red cards"
          headerAccessor="player.name"
          cellAccessor="statistics[0].cards.red"
          cellClassName='bg-red-600'
          statistic={statistics.cards.red}
        />
        <StatTable
          name="Yellow cards"
          headerAccessor="player.name"
          cellAccessor="statistics[0].cards.yellow"
          cellClassName='bg-yellow-400'
          statistic={statistics.cards.yellow}
        />
      </div>  
    </>
  )
}

export default LeaguePlayersStats