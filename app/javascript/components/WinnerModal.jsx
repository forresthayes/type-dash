import React, { useState } from 'react'
import 'bulma/css/bulma.css'
import 'bulma-modal-fx/dist/css/modal-fx.min.css'
import { Box, Modal, ModalBackground, ModalContent, Field, Label, Control, Input, Button } from 'bloomer'


export default ({ isActive, wpm, setScores, setIsWinner }) => {
  const [name, setName] = useState('')
  const handleChange = ({ target }) => setName(target.value)

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
  }

  return (
    <Modal isActive={isActive} className="modal-fx-fadeInScale">
      <ModalBackground />
      <ModalContent>
        <Box>

          <Field>
            <Label>Name</Label>
            <Control>
              <Input type="text" name="name" onChange={handleChange} />
            </Control>
          </Field>
          <Field isGrouped>
            <Control>
              <Button isColor='primary' onClick={handleClick}>Submit</Button>
            </Control>
            <Control>
              <Button isLink>Cancel</Button>
            </Control>
          </Field>
        </Box>
      </ModalContent>
    </Modal>
  )
}