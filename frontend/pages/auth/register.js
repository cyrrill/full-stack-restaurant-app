import { useState } from 'react'
import router from 'next/router'
import { Form, Button, Toast } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {

  const [showToast, setShowToast] = useState(false)

  function firebaseRegister(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => resolve(true))
      .catch(() => reject(false))
    })
  }

  function doRegister() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    firebaseRegister(email, password)
      .then(() => router.push('/'))
      .catch(() => setShowToast(true))
  }

  return (
    <main className="main">
      <div className="col-md-7 col-lg-4 col-xl-4 mx-auto" style={{borderRadius: "0.5rem", border: "1px solid #e0e0e0"}}>
        <Form className="py-5 px-5">
          <div className="mb-3">
            <Form.Control type="email" id="email" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <Form.Control type="password" id="password" placeholder="Password" required />
          </div>
          <div className="d-grid gap-2">
            <Button variant="dark" onClick={doRegister} size="lg">Login</Button>
          </div>
        </Form>
      </div>

      <div className="toast-container position-absolute bottom-0 start-0 p-3" style={{zIndex: 11}}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
          <Toast.Header className="text-danger">
            <strong className="me-auto">Login Failed</strong>
          </Toast.Header>
          <Toast.Body>There was an error registering, please try again.</Toast.Body>
        </Toast>
      </div>
    </main>
  )
}