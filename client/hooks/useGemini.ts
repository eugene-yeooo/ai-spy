import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import { getGame } from '../apis/gemini'

export async function useGameStart() {
  return useQuery({
    queryKey: ['game-start'],
    queryFn: () => getGame(),
  })
}
