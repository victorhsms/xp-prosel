import { NextApiRequest, NextApiResponse } from 'next'
import actions from '../../mock/actions'

const Actions = (request: NextApiRequest, response: NextApiResponse) => {
  return response.status(200).json(actions)
}

export default Actions
