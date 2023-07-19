import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Anectode = ({ anectode, anectodeVote }) => {
  //console.log("anectode", anectode)
  //console.log("anectodeVote", anectodeVote)
  const anectodeSelect = anectode.select
  const votes = anectodeVote[anectodeSelect] ? anectodeVote[anectodeSelect] : 0
  // console.log("anectodeSelect", anectodeSelect)
  // console.log("votes", votes)
  // console.log("votespec", anectodeVote[3])
  // console.log("anectodeVote.anectodeSelect", anectodeVote[anectodeSelect])
  return (
    <>
      <h1>Todays anecdote</h1>
      <p>{anectode.text}<br />
        Votes for this quote {votes}</p>
    </>
  )
}
const MostVotedAnectode = ({ anecdotes, anectodeVote }) => {
  console.log("anecdotes", anecdotes)
  console.log("anectodeVote", anectodeVote)

  let keys = Object.keys(anectodeVote)
  console.log("keys", keys)
  let mostVotes = 0
  let mostVotesSelect = 0
  keys.forEach(keys => {
    console.log(anectodeVote[keys], anectodeVote[keys])
    if (anectodeVote[keys] > mostVotes) {
      mostVotes = anectodeVote[keys]
      mostVotesSelect = [keys]
    }

    console.log("mostVotes", mostVotes)
    console.log("mostVotesSelect", mostVotesSelect)

  });

  return (
    <>
      <h1>Most voted anecdote</h1>
      <p>{anecdotes[mostVotesSelect]}<br />
        Votes for this quote {mostVotes}</p >
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomAnectode = () => {
    const randomAnectode = {}
    randomAnectode.select = Math.floor(Math.random() * anecdotes.length)
    randomAnectode.text = anecdotes[randomAnectode.select]
    return (randomAnectode)
  }

  const [anecdote, setAnecdote] = useState(randomAnectode)
  const [anecdoteVotes, setAnecdoteVotes] = useState({})

  const getNextQuote = () => {
    setAnecdote(randomAnectode())
  }

  const voteThisQuote = () => {
    const votes = { ...anecdoteVotes }
    votes[anecdote.select] = votes[anecdote.select] ? (votes[anecdote.select] += 1) : 1
    setAnecdoteVotes(votes)
  }


  return (
    <div>
      <Anectode
        anectode={anecdote}
        anectodeVote={anecdoteVotes}
      />
      <Button text="🎲 random quote" handleClick={getNextQuote} />
      <Button text="🗳️ vote for quote" handleClick={voteThisQuote} />
      <MostVotedAnectode
        anecdotes={anecdotes}
        anectodeVote={anecdoteVotes} />
    </div>
  )
}

export default App