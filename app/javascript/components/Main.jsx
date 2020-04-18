import React, { useState, useEffect, useRef } from 'react'
import 'bulma/css/bulma.css'
import WarningModal from './WarningModal'
import {
  Button,
  Container,
  Column,
  Columns,
  Box,
  Field,
  Section
} from 'bloomer'

export default () => {
  const START_TIME = 200
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(START_TIME)
  const inputEl = useRef(null)
  const [pasteWarning, setPasteWarning] = useState(false)

  const startGame = () => {
    setIsTimeRunning(true)
    inputEl.current.disabled = false
    setText('')
    inputEl.current.focus()
    inputEl.current.onpaste = e => {
      e.preventDefault()
      setPasteWarning(true)
      setTimeout(() => setPasteWarning(false), 900)
      setIsTimeRunning(false)
    }
  }

  useEffect(() => {
    const countWords = (text) => {
      const wordCount = text.trim().split(/\s+/).filter(str => str !== '').length
      setWordCount(wordCount)
    }

    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 15)
    } else if (!isTimeRunning && timeRemaining < START_TIME) {
      setTimeout(() => {
        setTimeRemaining(time => time + 1)
      }, 2)
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false)
      inputEl.current.onpaste = e => null
      countWords(inputEl.current.value)
    }

  }, [timeRemaining, isTimeRunning])

  const progressBarColor = (!isTimeRunning && timeRemaining < START_TIME) ? '' : 'is-info'

  return (
    <Section>
      <Container>
        <Columns isCentered>
          <Column isSize="1/2" hasTextAlign="centered">
            <Box hasTextAlign="centered"><q>But, soft! what light through yonder window breaks? It is the east, and Juliet is the sun.</q></Box>
            <Field>
              <textarea
                className="textarea"
                disabled={!isTimeRunning}
                ref={inputEl}
                onChange={({ target }) => setText(target.value)}
                value={text}
              />
              <WarningModal isActive={pasteWarning}></WarningModal>
            </Field>
            <progress
              className={`progress is-small ${progressBarColor}`}
              value={timeRemaining}
              max={START_TIME}
              style={{ transform: `rotate(0.5turn)` }} />
            <Section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button isSize="large" isColor="success" onClick={startGame} disabled={isTimeRunning || timeRemaining < START_TIME}>START</Button>
              <span className="is-size-4">WORDS: {wordCount}</span>
            </Section>
          </Column>
        </Columns>
      </Container>
    </Section >
  )
}