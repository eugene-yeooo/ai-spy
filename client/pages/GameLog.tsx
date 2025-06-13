import { useGetAllLogsWithUsername, useDeleteLogWithId } from '../hooks/useGame'
import * as fn from '../components/Functions.tsx'
import { useState } from 'react'
function GameLog() {
  const allUsers = useGetAllLogsWithUsername()
  const deleteMutation = useDeleteLogWithId()
  if (allUsers.isPending) {
    return <p>Loading....</p>
  }
  if (allUsers.isError || !allUsers.data) {
    return <p>There was an error...</p>
  }
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }
  return (
    <div className="gamelog">
      <h1>Game Log</h1>
      {allUsers.data.map((user) => (
        <div className="gamesLog" key={user.gameslog_id}>
          Created at: {user.created_at}, Player ID: {user.users_id}, Game
          status: {fn.convertStatus(user.status)}, No. of Guesses:{' '}
          {user.question_used}, Question: {user.question_text}, Answer:{' '}
          {user.ai_answer}{' '}
          <button onClick={() => handleDelete(user.gameslog_id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default GameLog
