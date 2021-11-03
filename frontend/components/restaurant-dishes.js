import { useState } from 'react'
import { Card, Button, Row, Col, Image, Toast } from 'react-bootstrap';
import router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken } from '../store/auth-slice'
import { addDish, removeDish } from '../store/cart-slice'

export default function RestaurantDishes(data) {

  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [showToast, setShowToast] = useState(false)

  const addToCart = (dish, e) => {
    if (!!token) {

      setShowToast(true)
      e.target.classList.add('animate__animated', 'animate__headShake')
      e.target.addEventListener('animationend', () => {
        e.target.classList.remove('animate__animated', 'animate__headShake')
      })

      dispatch(addDish(dish))

    } else {
      router.push('/auth/login')
    }
  }

  const dishesArray = data.dishes.map(dish => (
    <Col key={dish._id}>
      <Card style={{height: "450px"}}>
        <Card.Img variant="top" src={dish.imageUrl} style={{height: "170px"}} />
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
          </div>
          <div className="d-grid gap-2 b-0">
            <Button size="lg" variant="dark" onClick={(e) => addToCart(dish, e)}>Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))

  return (
    <>

      <Row xs={1} md={4}>
        {dishesArray}
      </Row>

      <div className="toast-container position-fixed bottom-0 start-0 p-3" style={{zIndex: 11}}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header className="text-success">
            <strong className="me-auto">Added to Cart!</strong>
          </Toast.Header>
          <Toast.Body>Your dish was added to the cart, check out the toolbar up top</Toast.Body>
        </Toast>
      </div>

    </>
  )
}
