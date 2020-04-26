import React, { useState } from 'react'
import 'bulma/css/bulma.css'
import { Section, Container, Columns, Column, Table, Title } from 'bloomer'

export default ({ scores }) => {
  let scoreboardRows
  if (scores.length !== 0) {
    const latestScore = scores.reduce((acc, score) => score.created_at > acc.created_at ? score : acc)
    const latestScoreIndex = scores.findIndex(score => score === latestScore)
    scoreboardRows = scores.map(
      ({ name, wpm }, i) => (
        <tr key={i} className={i === latestScoreIndex ? 'is-selected' : undefined}>
          <td className="is-capitalized">{name}</td>
          <td>{wpm}</td>
        </tr>
      )
    )
  }

  return (
    <Section>
      <Container>
        <Columns isCentered>
          <Column isSize="1/2" className="is-narrow">
            <Title className="is-capitalized">today's high scores</Title>
            <Table isBordered isStriped isFullWidth>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>WPM</th>
                </tr>
              </thead>
              <tbody>
                {scoreboardRows}
              </tbody>
            </Table>
          </Column>
        </Columns>
      </Container>
    </Section >
  )
}
