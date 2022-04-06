// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import fs from 'fs'

import { TEAMS } from '../../../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatData = (data: string) => {
    const unformattedData = JSON.parse(data)
    const team = unformattedData.response

    const countCards = (unformattedCards: Object) => {
      let total: number = 0
      Object.values(unformattedCards).forEach((cards) => {
        if (cards.total === null) return

        total += parseInt(cards.total)
      })
      return total
    }

    /* Returns a new array of formatted data */
    const formattedData = {
      id: team.team.id,
      name: team.team.name,
      cards: {
        red: {
          total: countCards(team.cards.red),
        },
        yellow: {
          total: countCards(team.cards.yellow),
        },
      },
      cleanSheets: team.clean_sheet,
      failedToScore: team.failed_to_score,
      fixtures: team.fixtures,
      goals: {
        against: {
          average: team.goals.against.average,
          season: team.goals.against.total,
        },
        for: {
          average: team.goals.for.average,
          season: team.goals.for.total,
        },
      },
      penalties: {
        missed: {
          total: team.penalty.missed.total,
        },
        scored: {
          total: team.penalty.scored.total,
        },
        awarded: {
          total: team.penalty.total,
        },
      },
    }

    return JSON.stringify(formattedData)
   
  }

  const generateStatistics = (teams: Array<any>) => {
    const getStat = (statKey: string) => {
      const keys: Array<string> = statKey.split('.')
  
      return teams.map((team) => {
        let value = team

        keys.forEach((key) => {
          value = value[key]
        })

        return {
          team: {
            id: team.id,
            name: team.name,
          },
          stat: value,
          fixtures: team.fixtures,
        }
      })
    }

    // Compare functions
    const compareStat = (a: any, b: any) => b.stat.total - a.stat.total

    // Returns statistics
    return {
      cards: {
        red: getStat('cards.red').sort(compareStat),
        yellow: getStat('cards.yellow').sort(compareStat),
      },
      cleanSheets: getStat('cleanSheets').sort(compareStat),
      goals: {
        against: {
          average: getStat('goals.against.average').sort(compareStat),
          season: getStat('goals.against.season').sort(compareStat),
        },
        for: {
          average: getStat('goals.for.average').sort(compareStat),
          season: getStat('goals.for.season').sort(compareStat),
        },
      },
      failedToScore: getStat('failedToScore').sort(compareStat),
      penalties: {
        missed: getStat('penalties.missed').sort(compareStat),
        scored: getStat('penalties.scored').sort(compareStat),
        awarded: getStat('penalties.awarded').sort(compareStat),
      },
    }
  }

  /* req.query of Type { league: number, season: number, team: Array<number>} */
  const params = req.query
  const teamIds = params['teams[]']

  // @ts-ignore
  const options: Array<AxiosRequestConfig> = teamIds.map((id) => {
    return {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
      params: {
        league: params.league,
        season: params.season,
        team: id,
      },
      headers: {
        'X-RapidAPI-Host': process.env.RAPIDAPI_URL,
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
      transformResponse: [formatData],
    }
  })

  /* OFFICIAL: API Data */
  // const result = await axios
  //   .all(options.map((option) => axios.request(option)))
  //   .then((responses) => {
  //     const data = responses.map((response) => JSON.parse(response.data))
  //     return generateStatistics(data)
  //   })
  //   .catch((errors) => {
  //     console.log(errors)
  //   })
  
  // res.status(200).json(result)

  /* TESTING: Static Data */
  const teams = TEAMS.map((team) => JSON.stringify({ response: team}))
  res.status(200).json(generateStatistics(teams.map((team) => JSON.parse(formatData(team)))))
}

export default handler
