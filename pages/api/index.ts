import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const data: number[] = []
  data.push(1)

  console.log(`Sending ${data} of type ${typeof data}`)

  res.status(200).json(data)
}

export default handler