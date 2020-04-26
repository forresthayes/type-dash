import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'bulma/css/bulma.css'
import 'bulma-modal-fx/dist/css/modal-fx.min.css'
import { Box, Modal, ModalBackground, ModalContent, Field, Label, Control, Button, Title } from 'bloomer'


export default React.forwardRef(({ isActive, wpm, setScores, setIsWinner }, ref) => {
  const [name, setName] = useState('')
  const handleChange = ({ target }) => setName(target.value)
  const history = useHistory()

  const handleClick = () => {
    setIsWinner(false)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: { name, wpm } })
    };
    fetch('/api/v1/scores/create', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setScores(data)
      })
    history.push("/high-scores")
  }

  return (
    <Modal isActive={isActive} className="modal-fx-fadeInScale" >
      <ModalBackground />
      <ModalContent>
        <Box>
          <Title>Congrats, you set a new record!</Title>
          <Field>
            <Label>Name</Label>
            <Control>
              <input ref={ref} className="input" type="text" name="name" onChange={handleChange} />
            </Control>
          </Field>
          <Field isGrouped>
            <Control>
              <Button isColor='primary' onClick={handleClick}>Submit</Button>
            </Control>
            <Control>
              <Button isLink className="is-light">Cancel</Button>
            </Control>
          </Field>
        </Box>
      </ModalContent>
    </Modal >
  )
})