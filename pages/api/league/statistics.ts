// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

import { STATISTICS } from '../../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatTeams = (unformattedTeams: Array<any>) => {
    const formatCards = (unformattedCards: Object) => {
      let total: number = 0
      Object.values(unformattedCards).forEach((cards) => {
        if (cards.total === null) return 
        
        total += parseInt(cards.total)
      })
      return total
    }

    const formatMatchGoals = (unformattedGoals: any) => {
      const highestGoals =
        unformattedGoals.home > unformattedGoals.away
          ? unformattedGoals.home
          : unformattedGoals.away
      return {
        ...unformattedGoals,
        highest: highestGoals,
      }
    }

    /* Returns a new array of formatted data */
    const formattedTeams = unformattedTeams.map((team) => {
      return {
        id: team.team.id,
        name: team.team.name,
        cards: {
          red: formatCards(team.cards.red),
          yellow: formatCards(team.cards.yellow),
        },
        cleanSheets: team.clean_sheet,
        failedToScore: team.failed_to_score,
        fixtures: team.fixtures,
        goals: {
          against: {
            average: team.goals.against.average,
            match: formatMatchGoals(team.biggest.goals.against),
            season: team.goals.against.total,
          },
          for: {
            average: team.goals.for.average,
            match: formatMatchGoals(team.biggest.goals.for),
            season: team.goals.for.total,
          },
        },
        penalty: {
          missed: team.penalty.missed.total,
          scored: team.penalty.scored.total,
          total: team.penalty.total
        },
        streak: team.biggest.streak,
      }
    })

    return formattedTeams.sort((a, b) => a.name - b.name)
  }

  const generateStatistics = (teams: Array<any>) => {
    const getStat = (stat: string) => {
      return teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
          played: team.fixtures.played, 
          [stat]: team[stat],
        }
      })
    }

    // Returns statistics
    return {
      cards: {
        red: getStat('cards').sort(
          (a, b) => parseInt(b.cards.red) - parseInt(a.cards.red)
        ),
        yellow: getStat('cards').sort(
          (a, b) => parseInt(b.cards.yellow) - parseInt(a.cards.yellow)
        ),
      },
      cleanSheet: getStat('cleanSheets').sort(
        (a, b) => parseInt(b.cleanSheets.total) - parseInt(a.cleanSheets.total)
      ),
      goals: {
        against: {
          average: getStat('goals').sort(
            (a, b) =>
              parseFloat(b.goals.against.average.total) -
              parseFloat(a.goals.against.average.total)
          ),
          match: getStat('goals').sort(
            (a, b) =>
              parseInt(b.goals.against.match.highest) -
              parseInt(a.goals.against.match.highest)
          ),
          season: getStat('goals').sort(
            (a, b) =>
              parseInt(b.goals.against.season.total) -
              parseInt(a.goals.against.season.total)
          ),
        },
        for: {
          average: getStat('goals').sort(
            (a, b) =>
              parseFloat(b.goals.for.average.total) -
              parseFloat(a.goals.for.average.total)
          ),
          match: getStat('goals').sort(
            (a, b) =>
              parseInt(b.goals.for.match.highest) -
              parseInt(a.goals.for.match.highest)
          ),
          season: getStat('goals').sort(
            (a, b) =>
              parseInt(b.goals.for.season.total) -
              parseInt(a.goals.for.season.total)
          ),
        },
      },
      failedToScore: getStat('failedToScore').sort(
        (a, b) =>
          parseInt(b.failedToScore.total) - parseInt(a.failedToScore.total)
      ),
      penalty: {
        missed: getStat('penalty').sort(
          (a, b) =>
            parseInt(b.penalty.missed) - parseInt(a.penalty.missed)
        ),
        scored: getStat('penalty').sort(
          (a, b) =>
            parseInt(b.penalty.scored) - parseInt(a.penalty.scored)
        ),
        total: getStat('penalty').sort(
          (a, b) =>
            parseInt(b.penalty.total) - parseInt(a.penalty.total)
        ),
      },
      streak: {
        draws: getStat('streak').sort(
          (a, b) =>
            parseInt(b.streak.draws) - parseInt(a.streak.draws)
        ),
        losses: getStat('streak').sort(
          (a, b) =>
            parseInt(b.streak.losses) - parseInt(a.streak.losses)
        ),
        wins: getStat('streak').sort(
          (a, b) =>
            parseInt(b.streak.wins) - parseInt(a.streak.wins)
        ),
      },
      wins: getStat('fixtures').sort(
        (a, b) =>
          parseInt(b.fixtures.wins.total) - parseInt(a.fixtures.wins.total)
      ),
      losses: getStat('fixtures').sort(
        (a, b) =>
          parseInt(b.fixtures.loses.total) - parseInt(a.fixtures.loses.total)
      ),
    }
  }

  /* req.query of Type { league: number, season: number, team: Array<number>} */
  const params = req.query
  const teamIds = params['team[]']

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
    }
  })

  /* OFFICIAL: API Data */
  // const result = await axios
  //   .all(options.map((option) => axios.request(option)))
  //   .then((responses) => {
  //       const data = responses.map((response) => response.data.response)
  //       const teams = formatTeams(data)

  //       return generateStatistics(teams)
  //     }
  //   )
  //   .catch((errors) => {
  //     console.log(errors)
  //   })
  
  // res.status(200).json(result)

  /* TEST: Static Data */
  res.status(200).json(STATISTICS)
}

export default handler
