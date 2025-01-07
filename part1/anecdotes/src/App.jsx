import { useState } from 'react'

const Header = ({text}) => (
  <h1>
    {text}
  </h1>
)

const MostVotedAnecdotes = ({anecdoteLength, anecdotes, votes}) => {
  let mostVoted = 0
    for (let i = 1; i < anecdoteLength; i++){
      if(votes[i] > votes[mostVoted]){
        mostVoted = i
      } 
    }
    return (
      <>
        {anecdotes[mostVoted]}
        <div>
          has {votes[mostVoted]} votes
        </div>
      </>
    )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdoteLength = anecdotes.length;
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdoteLength).fill(0))

  const randomizeAnecdote = () => () => {
    setSelected(Math.floor(Math.random() * anecdoteLength))
  }

  const voteForAnecdote = (index) => () => {
    const voteCopy = {...votes}
    voteCopy[index] += 1
    setVote(voteCopy)
  }

  return (
    <>
      <>
        <Header text="Anecdote of the day" />
        {anecdotes[selected]}
        <div>
          has {votes[selected]} votes
        </div>
        <button onClick={voteForAnecdote(selected)}>vote</button>
        <button onClick={randomizeAnecdote()}>next anecdote</button>
      </>

      <>
        <Header text="Anecdote with most votes" />
        <MostVotedAnecdotes anecdoteLength={anecdoteLength} anecdotes={anecdotes} votes = {votes}/>
      </>
    </>
  )
}

export default App