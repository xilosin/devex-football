import React from 'react'
import { StatisticTable } from '.'

type Props = {
  name: string
  statistics: any
}

const LeagueTeamsStatistics = ({ name, statistics }: Props) => {
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold">{name} Statistics</h1>
      <div className="w-full flex flex-row flex-wrap mb-4">
        <StatisticTable
          name="Clean sheets"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-green-500'
          statistic={statistics.cleanSheets}
        />
        <StatisticTable
          name="Red cards"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-red-600'
          statistic={statistics.cards.red}
        />
        <StatisticTable
          name="Yellow cards"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-yellow-400'
          statistic={statistics.cards.yellow}
        />
        <StatisticTable
          name="Goals scored p/g"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-green-500'
          statistic={statistics.goals.for.average}
        />
        <StatisticTable
          name="Goals conceded p/g"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-orange-400'
          statistic={statistics.goals.against.average}
        />
        <StatisticTable
          name="Penalties scored"
          headerAccessor="team.name"
          cellAccessor="stat.total"
          cellClassName='bg-green-500'
          statistic={statistics.penalties.scored}
        />
      </div>
    </>
  )
}

export default LeagueTeamsStatistics
