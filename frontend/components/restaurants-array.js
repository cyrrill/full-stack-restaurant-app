import { Card, Button, Row, Col } from 'react-bootstrap';

export default function RestaurantsArray(props) {

  const restaurantsArray = props.data.restaurants.map(restaurant => (
    <Col key={restaurant._id}>
      <Card style={{height: "450px"}}>
        <Card.Img variant="top" src={restaurant.imageUrl} style={{height: "170px"}} />
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>{restaurant.description}</Card.Text>
          </div>
          <div className="d-grid gap-2 b-0">
            <Button size="lg" variant="dark" href={`/restaurants/${restaurant._id}`}>View</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))

  return (
    <Row xs={1} md={3}>
     {restaurantsArray}
    </Row>
  )
}
