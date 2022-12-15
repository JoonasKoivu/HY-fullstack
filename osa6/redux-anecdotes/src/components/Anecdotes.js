import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li>
            <div>
              {anecdote.content}
            </div>
            votes: {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes )
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return(
    <ul>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote))
            dispatch(createNotification(`You voted for "${anecdote.content}"`, 5))
          }}
        />
      )}
    </ul>
  )
}

export default AnecdoteList