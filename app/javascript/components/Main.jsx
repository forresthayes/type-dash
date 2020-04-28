import React, { useState, useEffect, useRef } from 'react'
import { prompts } from '../helpers'
import 'bulma/css/bulma.css'
import WarningModal from './WarningModal'
import WinnerModal from './WinnerModal'
import { Container, Content, Column, Columns, Box, Field, Section, Modal, Button } from 'bloomer'
import Confetti from 'react-dom-confetti';


export default ({ goal, setScores, promptIndex, setPromptIndex, setHighlightLatestScore }) => {
  const timeLimit = 5 // seconds
  // Progress intervals calibrate progress bar animation.
  const progressUpdateInterval = 15 // milliseconds
  const progressResetInterval = 2 // ms
  const maxTime = Math.floor(timeLimit * 1000 / progressUpdateInterval)

  const [text, setText] = useState('')
  const [WPM, setWPM] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(maxTime)
  const [pasteWarning, setPasteWarning] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [msg, setMsg] = useState('')
  const inputEl = useRef(null)
  const startButton = useRef(null)
  const winnerNameInput = useRef(null)

  const startGame = () => {
    setIsTimeRunning(true)
    setConfetti(false)
    inputEl.current.disabled = false
    setText('')
    inputEl.current.focus()
    setHighlightLatestScore(false)
    inputEl.current.onpaste = e => {
      e.preventDefault()
      setPasteWarning(true)
      setTimeout(() => setPasteWarning(false), 900)
      setIsTimeRunning(false)
    }
  }

  useEffect(() => {

    const countWPM = (text) => {
      const [line1, _, line2] = prompts[promptIndex].props.children
      const promptText = [line1, line2].join('\n')
      const promptWords = promptText.split(/\s/)
      const wordsTyped = text.trim().split(/\s/)

      let correctWords = 0
      wordsTyped.forEach((word, i) => {
        if (word === promptWords[i]) {
          correctWords += 1
        }
      })

      const netWPM = Math.floor(correctWords / (timeLimit / 60))

      setWPM(netWPM)
      console.log(goal, netWPM)

      if (netWPM > goal) {
        setConfetti(true)
        setMsg(`Congrats, ${netWPM} WPM is a new high score!`)
        setTimeout(() => setIsWinner(true), 1400)
        setHighlightLatestScore(true)
        setTimeout(() => winnerNameInput.current.focus(), 1800)
      } else {
        setTimeout(() => startButton.current.focus(), 1000)
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
      setPromptIndex(i => i === prompts.length - 1 ? 0 : i + 1)
    }

  }, [timeRemaining, isTimeRunning])

  const progressBarColor = (!isTimeRunning && timeRemaining < maxTime) ? '' : 'is-info'

  return (
    <Section>
      <Container>
        <Modal>
          <Columns isCentered>
            <Column isOffset="1/2">
              <Confetti active={confetti} config={{ duration: 3000 }} />
            </Column>
          </Columns>
        </Modal>
        <Columns isCentered>
          <Column isSize="1/2">
            <Content>
              <p className="is-size-5">Press START and try your hand at Sonnet 29 by William Shakespeare.</p>
            </Content>
            <Box className="is-size-5">
              {prompts[promptIndex]}
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
                setIsActive={setIsWinner}
                msg={msg}
                setMsg={setMsg}
                wpm={WPM}
                setScores={setScores}
                ref={winnerNameInput}
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
                autoFocus={true}
              >START</button>
              <span className="is-size-4">WPM: {WPM}</span>
            </Section>
          </Column>
        </Columns>
      </Container>
    </Section >
  )
}