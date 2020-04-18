import React, { useEffect, useState } from "react"

export default () => {
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
      .then(data => setScores(data))
      .catch((reason) => console.error(reason.message))
  }, [])

  const highScores = scores.map(
    ({ name, word_count }) => <p key={name}>{name} {word_count} words</p>
  )

  return <div>{highScores}</div>
}