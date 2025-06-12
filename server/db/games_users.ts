
import db from './connection.ts'

export async function getAllLogsWithUsername() {

const logs = await db('game_logs')
.join('users', 'game_logs.user_id', 'users.id')
.select('game_logs', 'users.username')
.orderBy('game_logs.created_at')
return logs
}