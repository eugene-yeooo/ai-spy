import express from 'express'
import { getAllLogsWithUsername } from '../db/games_users'

const router = express.Router()

// GET /api/v1/gamelogs
router.get('/', async (req, res) => {
  try {
    const logs = await getAllLogsWithUsername()
    res.json(logs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get game logs' })
  }
})

export default router