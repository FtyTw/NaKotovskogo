import React from 'react'
import { Toast } from 'react-bootstrap'
import './ToastContainer.scss'

const ToastContainer = ({ toast, onClose }) => (
  <Toast
    //
    className="toast-container"
    show={toast}
    autohide
    onClose={onClose}
    delay={5000}
  >
    <Toast.Body>{toast}</Toast.Body>
  </Toast>
)

export default ToastContainer
