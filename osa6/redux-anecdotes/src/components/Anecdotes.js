import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

const AnecdoteList = (props) => {
  return(
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteAnecdote(anecdote)
            props.createNotification(`You voted for "${anecdote.content}"`, 5)
          }}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => 
      anecdote
      .content.toLowerCase()
      .includes(state.filter.toLowerCase())),
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  createNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList