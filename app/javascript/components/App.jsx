import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Header from './Header'
import Main from './Main'
import Scoreboard from './Scoreboard'

function App() {

  const [scores, setScores] = useState([])
  const [promptIndex, setPromptIndex] = useState(0)
  const [highlightLatestScore, setHighlightLatestScore] = useState(false)

  useEffect(() => {
    fetch("/api/v1/scores/index")
      .then(resp => {
        return resp.ok ? resp.json() : []
      })
      .then(data => setScores(data))
  }, [])

  let goal = 0
  if (scores.length !== 0) {
    goal = Math.min(...scores.map(({ wpm }) => wpm))
  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main
            {...{
              goal,
              setScores,
              promptIndex,
              setPromptIndex,
              setHighlightLatestScore
            }}
          />
        </Route>
        <Route path="/high-scores">
          <Scoreboard {...{ scores, highlightLatestScore }} />
        </Route>
      </Switch>
    </>
  );
}

export default App

