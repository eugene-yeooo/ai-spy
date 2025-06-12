import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'

console.log('Gemini route file loaded')

const router = Router()

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

router.get('/', async (req, res) => {
  console.log(`SERVER LOG: HIT ENDPOINT '/' ON ROUTE 'proxy/gemini'`) // SERVER TEST LOG

  try {
    const level = req.query.level
    const topic = req.query.topic
    // const guesses = req.query.guesses

    if (!level || !topic)
      throw new Error(
        `Query parameter(s): ${!level ? 'level' : ''}${!level && !topic ? ', ' : ''}${!topic ? 'topic' : ''} are undefined or cannot be used.`,
      )

    const initialResponse = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are playing a 20 Questions game with the user.

            1. You must secretly select ${topic}. Do not tell the user what the answer is unless they guess it correctly.
            2. The user will ask up to 20 yes/no questions to try to figure out which ${topic} you're thinking of.
            3. Only respond to the user's questions with short, clear answers such as:
              - "Yes"
              - "No"
              - "Sometimes"
              - "I don't know"
              - Brief clarifications if needed (e.g., "Yes, it's in the South Island.")
            4. Keep track of how many questions have been asked and how close the user is.
            5. If the user correctly guesses the ${topic}, respond with a celebratory message like "Yes! The ${topic} is [Answer]! You got it!". Take note how many questions/guesses the user took to get the right answer.
            6. If the user reaches 20 questions without guessing correctly, reveal the correct answer.
            7. 
            
            Additional logic:
            - If the user asks a misleading or confusing question, you can gently ask them to rephrase.
            - If they ask for a hint, they are allowed three, provide them with a hint based on the selected difficulty (e.g., "It's near a major river").

            Begin the game by saying:
            "I've picked a ${topic} — start asking your yes/no questions!"`,
    })

    if (
      !initialResponse ||
      !initialResponse.candidates ||
      !initialResponse.candidates[0] ||
      !initialResponse.candidates[0].content ||
      !initialResponse.candidates[0].content.parts ||
      !initialResponse.candidates[0].content.parts[0] ||
      !initialResponse.candidates[0].content.parts[0].text ||
      typeof initialResponse.candidates[0].content.parts[0].text !== 'string'
    ) {
      throw new Error('Unexpected data structure in API response.')
    }
    const aiMessage = initialResponse.candidates[0].content.parts[0].text

    const formattedHeading = aiMessage.split('\n')[0].replace(/\*\*/g, '')
    const formattedBody = aiMessage
      .replace(/\*\*/g, '')
      .split('\n')
      .slice(1)
      .join('\n')

    const dataObj = {
      heading: formattedHeading,
      body: formattedBody,
    }

    return res.status(200).json(dataObj)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`SERVER ERROR: ${error.message}`) // SERVER TEST LOG
      return res.status(500).json({ error: error.message })
    } else {
      console.log(`SERVER ERROR: Unknown`) // SERVER TEST LOG
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }
})

export default router
