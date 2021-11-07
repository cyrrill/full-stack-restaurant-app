import { useState } from 'react'
import { Form, InputGroup, Image } from 'react-bootstrap'
import nookies from 'nookies'
import RestaurantDishes from '../../components/restaurant-dishes';

function Restaurant(data) {

  const [dishes, setDishes] = useState(data.restaurant.dishes)

  function doSearch() {
    const val = document.getElementById('search').value
    if (val) {
      const filtered = dishes.filter(r => r.name.toLowerCase().includes(val.toLowerCase()))
      setDishes(filtered)
    } else {
      setDishes(data.restaurant.dishes)
    }
  }

  return (
    <div className="container">
      <br/>
      <div>
        <h2 className="title">{data.restaurant.name}</h2>
        <br/>
        <div style={{textAlign: "center"}}>
          <Image src={data.restaurant.imageUrl} alt={data.restaurant.name} fluid  style={{
            maxWidth:"400px",
            maxHeight:"400px",
            filter: "drop-shadow(0 0 0.75rem #111)"
          }}/>
          <br/><br/>
          <div>{data.restaurant.description}</div>
        </div>
      </div>

      <main className="main">
        <div>
          <InputGroup className="px-5">
            <InputGroup.Text id="basic-addon1">
              <Image src="/images/search-icon.png" alt="search" width="50px" height="50px" />
            </InputGroup.Text>
            <Form.Control id="search" type="text" onChange={() => doSearch()} autoComplete="off" style={{fontSize:"24px"}}/>
          </InputGroup>
        </div>
        <RestaurantDishes dishes={dishes} />
      </main>

    </div>
  )
}

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx).token
  const { restaurant } = ctx.query
  const res = await fetch(`${process.env.BACKEND_URL}/restaurants/${restaurant}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
  })
  const data = await res.json()
  return { props: { restaurant: data } }
}

export default Restaurant