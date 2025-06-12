export interface SendGuessData {
  answer: string
  topic: string
  conversation: { sender: 'user' | 'ai'; text: string }[]
  userInput: string
}
