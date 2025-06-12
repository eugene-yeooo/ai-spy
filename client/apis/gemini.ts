import request from 'superagent'

const rootUrl = new URL('/api/v1', document.baseURI)

export async function getGame() {
  const res = await request.get(rootUrl + '/gemini')

  if (res.ok) {
    return res.body as { locations: Location[] }
  }

  throw new Error(res.text)
}
