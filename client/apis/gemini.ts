import request from 'superagent'

const rootUrl = new URL('/api/v1', document.baseURI)

export async function getGameStart(level: string, topic: string) {
  const res = await request.get(
    `${rootUrl}gemini/start?level=${level}&topic=${topic}`,
  )

  if (!res.ok) {
    const err = 'Error starting game'
    throw new Error(err)
  }

  return res.body as Promise<{ answer: string; introMessage: string }>
}

export async function sendGuess(data: SendGuessData) {
  const res = await request.post(`${rootUrl}/gemini/guess`).send(data)

  if (!res.ok) {
    const err = 'Error sending guess'
    throw new Error(err)
  }

  return res.body as { aiResponse: string }
}
