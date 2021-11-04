import { Image } from 'react-bootstrap';
import nookies from 'nookies'
import RestaurantDishes from '../../components/restaurant-dishes';

function Restaurant(data) {

  return (
    <>
      <br/>
      <div style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <h2 className="title">{data.restaurant.name}</h2>
        <br/>
        <div style={{textAlign: "center"}}>
          <Image src={data.restaurant.imageUrl} alt={data.restaurant.name} fluid  style={{
            maxWidth:"300px",
            maxHeight:"300px",
            filter: "drop-shadow(0 0 0.75rem #111)"
          }}/>
          <br/><br/>
          <div>{data.restaurant.description}</div>
          <br/>
        </div>
      </div>

      <main className="main">
        <RestaurantDishes dishes={data.restaurant.dishes} />
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