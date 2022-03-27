import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const withLeague = async (handler: NextApiHandler) => {
  

  return (req: NextApiRequest,  res: NextApiResponse) => {
    
    return handler(req, res)
  }
}

export default withLeague
