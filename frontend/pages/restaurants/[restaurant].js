import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import nookies from 'nookies'

function Restaurant(data) {

  function addToCart(id) {
    // alert(id);
  }

  const cardsArray = data.restaurant.dishes.map(dish => (
    <Col key={dish._id}>
      <Card style={{height: "450px"}}>
        <Card.Img variant="top" src={dish.imageUrl} style={{height: "170px"}} />
        <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
          </div>
          <div className="d-grid gap-2 b-0">
            <Button size="lg" variant="dark" onClick={addToCart(dish._id)}>Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))

  return (
    <>
      <br/>
      <div style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <h1 className="title">{data.restaurant.name}</h1>
        <br/>
        <div style={{textAlign: "center"}}>
          <Image src={data.restaurant.imageUrl} alt={data.restaurant.name} fluid roundedCircle style={{
            maxWidth:"400px",
            maxHeight:"400px",
            filter: "drop-shadow(0 0 0.75rem #111)"
          }}/>
          <br/><br/>
          <div>{data.restaurant.description}</div>
          <br/>
        </div>
      </div>

      <main className="main">
        <Row xs={1} md={4}>
          {cardsArray}
        </Row>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const { restaurant } = ctx.query
  const res = await fetch(`http://backend:8080/restaurants/${restaurant}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
  })
  const data = await res.json()
  return { props: { restaurant: data } }
}

export default Restaurant