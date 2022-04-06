// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

import { STANDINGS } from '../../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatData = (data: string) => {
    const unformattedData = JSON.parse(data)
    const standings = unformattedData.response[0].league.standings[0]

    // Returns a new array of formatted data
    const formattedData = standings.map((team: any) => {
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

    return JSON.stringify(formattedData)
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
    transformResponse: [formatData]
  }

  /* OFFICIAL: API Data */
  // const result = await axios
  //   .request(options)
  //   .then((response) => {
  //     return JSON.parse(response.data)
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  // res.status(200).json(result) 

  /* TEST: Static Data */
  const staticData = {
    response: [
      {
        league: {
          standings: [STANDINGS]
        }
      }
    ]
  }
  res.status(200).json(JSON.parse(formatData(JSON.stringify(staticData))))    
}

export default handler