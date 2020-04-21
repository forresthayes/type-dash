import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import Header from './Header'
import Main from './Main'
// import Scores from './Scores'

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
        console.log(data)
        setScores(data)
      })
      .catch((reason) => console.error(reason.message))
  }, [])

  // const scoreToBeat = scores.reduce((min, score) => )

  const highScores = scores.map(
    ({ name, wpm }) => <p key={name}>{name} WPM: {wpm}</p>
  )

  return (
    <>
      <Header />
      <Main />
      {highScores}
    </>
  );
}

export default App