import React from 'react'

import { StatTable } from '.'

type Props = {
  name: string
  statistics: any
}

const LeaguePlayersStats = ({ name, statistics }: Props) => {
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold">{name} Statistics</h1>
      <div className="w-full flex flex-row flex-wrap mb-4">
        <StatTable
            name="Assists"
            headerAccessor="player.name"
            cellAccessor="stat.total"
            cellClassName='bg-green-500'
            statistic={statistics.cleanSheets}
          />
          <StatTable
            name="Red cards"
            headerAccessor="player.name"
            cellAccessor="stat.total"
            cellClassName='bg-red-600'
            statistic={statistics.cards.red}
          />
          <StatTable
            name="Yellow cards"
            headerAccessor="player.name"
            cellAccessor="stat.total"
            cellClassName='bg-yellow-400'
            statistic={statistics.cards.yellow}
          />
      </div>  
    </>
  )
}

export default LeaguePlayersStats