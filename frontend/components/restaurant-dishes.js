import { useState } from 'react'
import { Card, Button, Row, Col, Toast } from 'react-bootstrap';
import Image from 'next/image';
import router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken } from '../store/auth-slice'
import { addDish, removeDish } from '../store/cart-slice'

export default function RestaurantDishes(data) {

  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [showToast, setShowToast] = useState(false)

  const addToCart = (dish) => {
    if (!!token) {

      setShowToast(true)
      dispatch(addDish(dish))

    } else {
      router.push('/auth/login')
    }
  }

  const blur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/WZ/PQAIdwMX3sUQzwAAAABJRU5ErkJggg==';

  const dishesArray = data.dishes.map(dish => (
    <Col key={dish._id}>
      <Card style={{height: "450px"}}>
        <Card.Img as={Image} alt={dish.name} variant="top" src={dish.imageUrl} height="170px" width="170px" placeholder={blur} />
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
          </div>
          <div className="d-grid gap-2 b-0">
            <Button size="lg" variant="dark" onClick={() => addToCart(dish)}>Add to Cart</Button>
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
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide animation={false}>
          <Toast.Header className="text-success">
            <strong className="me-auto">Added to Cart!</strong>
          </Toast.Header>
          <Toast.Body>Your dish was added to the cart, check out the toolbar up top</Toast.Body>
        </Toast>
      </div>

    </>
  )
}
