
import db from './connection.ts'

export async function getAllLogsWithUsername() {

const logs = await db('gameslog')
.join('users', 'gameslog.user_id', 'users.id')
.select('gameslog.id as gameslog_id',
   'user.id as user_id', 
   'gameslog.status',
   'gameslog.question_used',
   'gameslog.hint_used',
   'gameslog.ai_answer',
   'gameslog.question_text',
   'gameslog.ai_response',
   'gameslog.created_at'
  )
.orderBy('gameslog.created_at')
return logs
}