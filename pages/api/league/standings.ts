// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

import { STANDINGS } from '../../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatStandings = (unformattedStandings: Array<any>) => {
    // Returns a new array of formatted data
    return unformattedStandings.map((team) => {
      return {
        rank: team.rank,
        name: team.team.name,
        id: team.team.id,
        played: team.all.played,
        wins: team.all.win,
        draws: team.all.draw,
        losses: team.all.lose,
        goalsFor: team.all.goals.for,
        goalsAgainst: team.all.goals.against,
        goalsDiff: team.goalsDiff,
        points: team.points,
        form: team.form,
      }
    })
  }
  
  const params = req.query

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: params,
    headers: {
      'X-RapidAPI-Host': process.env.RAPIDAPI_URL,
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    },
  }

  /* OFFICIAL: API Data */
  // const result = await axios
  //   .request(options)
  //   .then((response) => {
  //     const data = response.data.response
      
  //     if (data.length < 1) return []

  //     const standings: Array<any> = response.data.response[0].league.standings[0]
      
  //     return formatStandings(standings)
      
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  // res.status(200).json(result) 

  /* TEST: Static Data */
  res.status(200).json(formatStandings(STANDINGS))    
}

export default handler