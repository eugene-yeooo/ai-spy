import express from 'express'

import * as db from '../db/games_users'

const router = express.Router()

// GET /api/v1/gamelogs
router.get('/', async (req, res) => {
  try {
    const logs = await db.getAllLogsWithUsername()
    res.json(logs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get game logs' })
  }
})



// GET /api/v1/gamelogs/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!id) 
    return res.status(400).json({ error: 'Invalid ID' })

  try {
    const deleted = await db.deleteGameLogById(id)
    
    if (deleted === 0){
      res.status(404).json({ error: 'Game log not found' })
    } else {
      res.json({ message: 'Game log deleted' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete game log' })
  }
})
    
export default router