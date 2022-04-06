// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import fs from 'fs'

import { PLAYERS } from '../../../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req.query
  const urls = params['urls[]']

  // @ts-ignore
  const options: Array<AxiosRequestConfig> = urls.map((url) => {
    return {
      method: 'GET',
      url: `https://api-football-v1.p.rapidapi.com/v3/players/${url}`,
      params: {
        league: params.league,
        season: params.season,
      },
      headers: {
        'X-RapidAPI-Host': process.env.RAPIDAPI_URL,
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      }
    }
  })

  // const result = await axios
  //   .all(options.map((option) => axios.request(option)))
  //   .then((responses) => {
  //     return {
  //       goals: responses[0].data.response.slice(0,5),
  //       assists: responses[1].data.response.slice(0,5),
  //       cards: { 
  //         red: responses[2].data.response.slice(0,5),
  //         yellow: responses[3].data.response.slice(0,5),
  //       }
  //     }
  //   })

  
  // fs.writeFile ("PLAYERS.json", JSON.stringify(result), function(err) {
  //   if (err) throw err;
  //   console.log('complete');
  // });

  /* TESTING Static data */
  res.status(200).json(PLAYERS)
}

export default handler