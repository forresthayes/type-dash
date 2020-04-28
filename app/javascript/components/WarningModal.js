import React from 'react'
import 'bulma/css/bulma.css'
import 'bulma-modal-fx/dist/css/modal-fx.min.css'
import { Modal, ModalBackground, ModalContent, Notification } from 'bloomer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

export default ({ isActive }) => {
  return (
    <Modal isActive={isActive} className="modal-fx-fadeInScale">
      <ModalBackground />
      <ModalContent>
        <Notification isColor="danger" hasTextAlign="centered" className="is-size-3 is-uppercase" >
          <FontAwesomeIcon icon={faSkullCrossbones} style={{ marginRight: "1rem" }} />
            No Cheating
          <FontAwesomeIcon icon={faSkullCrossbones} style={{ marginLeft: "1rem" }} />
        </Notification>
      </ModalContent>
    </Modal>
  )
}