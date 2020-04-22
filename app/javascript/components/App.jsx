import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import Header from './Header'
import Main from './Main'

function App() {

  const [scores, setScores] = useState([])

  useEffect(() => {
    const url = "/api/v1/scores/index"
    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        throw new Error("We have a problem.")
      })
      .then(data => {
        setScores(data)
      })
      .catch((reason) => console.error(reason.message))
  }, [])

  const scoreToBeat = Math.min(...scores.map(({ wpm }) => wpm))

  const highScores = scores.map(
    ({ name, wpm }, i) => <p key={i}>{name} WPM: {wpm}</p>
  )

  return (
    <>
      <Header />
      <Main goal={scoreToBeat} setScores={setScores} />
      {highScores}
    </>
  );
}

export default App