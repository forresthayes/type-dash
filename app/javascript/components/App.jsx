import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Header from './Header'
import Main from './Main'
import Scoreboard from './Scoreboard'

function App() {

  const [scores, setScores] = useState([])
  const [promptIndex, setPromptIndex] = useState(0)
  const [highlightLatestScore, setHighlightLatestScore] = useState(false)

  useEffect(() => {
    const url = "/api/v1/scores/index"
    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        throw new Error("Unable to load high scores.")
      })
      .then(data => {
        setScores(data)
      })
      .catch((reason) => console.error(reason.message))
  }, [])

  const scoreToBeat = Math.min(scores.map(({ wpm }) => wpm))

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main
              goal={scoreToBeat}
              setScores={setScores}
              promptIndex={promptIndex}
              setPromptIndex={setPromptIndex}
              setHighlightLatestScore={setHighlightLatestScore}
            />
          </Route>
          <Route path="/high-scores">
            <Scoreboard scores={scores} highlightLatestScore={highlightLatestScore} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App

