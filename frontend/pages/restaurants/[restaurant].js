import { useRouter } from 'next/router'
import nookies from 'nookies'

function Restaurant(data) {
  return (
    <main className="main">
        Restaurant

        {JSON.stringify(data)}
    </main>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {

  const accessToken = nookies.get(ctx).token
  const { restaurant } = ctx.query

  console.log(restaurant)

  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/restaurants/${restaurant}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
  })
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Restaurant