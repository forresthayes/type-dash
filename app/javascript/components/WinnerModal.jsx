import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'bulma/css/bulma.css'
import 'bulma-modal-fx/dist/css/modal-fx.min.css'
import { Box, Modal, ModalBackground, ModalContent, Field, Label, Control, Button, Title } from 'bloomer'


export default React.forwardRef(({ isActive, wpm, setScores, setIsActive, msg, setMsg }, ref) => {
  const [name, setName] = useState('')
  const handleChange = ({ target }) => setName(target.value)
  const history = useHistory()

  const handleClick = () => {
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      body: JSON.stringify({ score: { name, wpm } })
    };
    fetch('/api/v1/scores/create', requestOptions)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        throw new Error("Unable to save score. Please try again.")
      })
      .then(data => {
        setScores(data)
        setIsActive(false)
        history.push("/high-scores")
      })
      .catch(reason => setMsg(`Error: ${reason.message}. Please try again.`))
  }

  return (
    <Modal isActive={isActive} className="modal-fx-fadeInScale" >
      <ModalBackground />
      <ModalContent>
        <Box>
          <Title hasTextAlign="centered" isSize={4}>{msg}</Title>
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
              <Button isLink className="is-light" onClick={() => setIsActive(false)}>Cancel</Button>
            </Control>
          </Field>
        </Box>
      </ModalContent>
    </Modal >
  )
})