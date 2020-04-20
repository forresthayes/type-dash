import React, { useState, useEffect, useRef } from 'react'
import { testPrompt } from '../helpers'
import 'bulma/css/bulma.css'
import WarningModal from './WarningModal'
import {
  Container,
  Column,
  Columns,
  Box,
  Field,
  Section,
} from 'bloomer'


export default () => {
  const [promptGen, setPromptGen] = useState(testPrompt())
  const [prompt, setPrompt] = useState("Sonnet 29 by William Shakespeare")
  const START_TIME = 500
  const [text, setText] = useState('')
  const [wPM, setWPM] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(START_TIME)
  const inputEl = useRef(null)
  const startButton = useRef(null)
  const promptRef = useRef(null)
  const [pasteWarning, setPasteWarning] = useState(false)

  const startGame = () => {
    setPrompt(promptGen.next().value)
    setPromptGen(promptGen)
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

  useEffect(() => startButton.current.focus(), [])

  useEffect(() => {
    const countWPM = (text) => {
      const [line1, _, line2] = prompt.props.children
      const promptText = [line1, line2].join('\n')
      const promptWords = promptText.split(/\s/)
      const charCount = text.split('').length
      const wordsTyped = text.trim().split(/\s/)

      let errors = 0
      wordsTyped.forEach((word, i) => {
        if (word !== promptWords[i]) {
          errors += 1
        }
      })

      const WPM = Math.floor(((charCount / 5) - errors) / (START_TIME * 15 / 1000 / 60))

      setWPM(WPM)
    }

    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 15)
    } else if (!isTimeRunning && timeRemaining < START_TIME) {
      setTimeout(() => {
        setTimeRemaining(time => time + 5)
      }, 2)
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false)
      inputEl.current.onpaste = e => null
      countWPM(inputEl.current.value)
    } else {
      startButton.current.focus()
    }

  }, [timeRemaining, isTimeRunning])

  const progressBarColor = (!isTimeRunning && timeRemaining < START_TIME) ? '' : 'is-info'


  return (
    <Section>
      <Container>
        <Columns isCentered>
          <Column isSize="1/2">
            <Box className="is-size-5">
              {prompt}
            </Box>
            <Field>
              <textarea
                className="textarea"
                disabled={!isTimeRunning}
                ref={inputEl}
                onChange={({ target }) => setText(target.value)}
                value={text}
                style={{ paddingLeft: "1.2rem" }}
              />
              <WarningModal isActive={pasteWarning}></WarningModal>
            </Field>
            <progress
              className={`progress is-small ${progressBarColor}`}
              value={timeRemaining}
              max={START_TIME}
              style={{ transform: `rotate(0.5turn)` }} />
            <Section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                className="button is-large is-success"
                ref={startButton}
                onClick={startGame}
                disabled={isTimeRunning || timeRemaining < START_TIME}
              >START</button>
              <span className="is-size-4">WPM: {wPM}</span>
            </Section>
          </Column>
        </Columns>
      </Container>
    </Section >
  )
}