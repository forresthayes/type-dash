import React, { useState, useEffect, useRef } from 'react'
import { prompter } from '../helpers'
import 'bulma/css/bulma.css'
import WarningModal from './WarningModal'
import WinnerModal from './WinnerModal'
import {
  Container,
  Column,
  Columns,
  Box,
  Field,
  Section
} from 'bloomer'


export default ({ goal, setScores }) => {
  const timeLimit = 5 // seconds
  // Progress intervals calibrate progress bar animation.
  const progressUpdateInterval = 15 // milliseconds
  const progressResetInterval = 2 // ms
  const maxTime = Math.floor(timeLimit * 1000 / progressUpdateInterval)

  const [prompt, setPrompt] = useState(<p>Sonnet 29<br />by William Shakespeare</p>)
  const [promptGen, setPromptGen] = useState(prompter())
  const [text, setText] = useState('')
  const [WPM, setWPM] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(maxTime)
  const [pasteWarning, setPasteWarning] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const inputEl = useRef(null)
  const startButton = useRef(null)

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

  useEffect(() => {
    const recordHighScore = score => {
      setIsWinner(isWinner => !isWinner)
    }

    const countWPM = (text) => {
      const [line1, _, line2] = prompt.props.children
      const promptText = [line1, line2].join('\n')
      const promptWords = promptText.split(/\s/)
      const charsTyped = text.split('').length
      const wordsTyped = text.trim().split(/\s/)

      let errors = 0
      wordsTyped.forEach((word, i) => {
        if (word !== promptWords[i]) {
          errors += 1
        }
      })

      const grossWPM = charsTyped / 5
      let netWPM = 0
      if (grossWPM > errors) {
        netWPM = Math.floor((grossWPM - errors) / (timeLimit / 60))
      }

      setWPM(netWPM)

      if (netWPM > goal) {
        recordHighScore(netWPM)
      }
    }

    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, progressUpdateInterval)
    } else if (!isTimeRunning && timeRemaining < maxTime) {
      setTimeout(() => {
        setTimeRemaining(time => time + 2)
      }, progressResetInterval)
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false)
      inputEl.current.onpaste = e => null
      countWPM(inputEl.current.value)
    } else {
      startButton.current.focus()
    }

  }, [timeRemaining, isTimeRunning])

  const progressBarColor = (!isTimeRunning && timeRemaining < maxTime) ? '' : 'is-info'

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
              <WinnerModal
                isActive={isWinner}
                wpm={WPM}
                setIsWinner={setIsWinner}
                setScores={setScores}
              ></WinnerModal>
            </Field>
            <progress
              className={`progress is-small ${progressBarColor}`}
              value={timeRemaining}
              max={maxTime}
              style={{ transform: `rotate(0.5turn)` }} />
            <Section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                className="button is-large is-success"
                ref={startButton}
                onClick={startGame}
                disabled={isTimeRunning || timeRemaining < maxTime}
              >START</button>
              <span className="is-size-4">WPM: {WPM}</span>
            </Section>
          </Column>
        </Columns>
      </Container>
    </Section >
  )
}