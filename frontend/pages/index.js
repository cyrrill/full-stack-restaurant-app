import { useState } from 'react'
import Head from 'next/head'
import { Form, InputGroup, Image } from 'react-bootstrap'
import RestaurantsArray from '../components/restaurants-array'

function Home(data) {

  const [restaurants, setRestaurants] = useState(data.restaurants)

  function doSearch() {
    const val = document.getElementById('search').value
    if (val) {
      const filtered = restaurants.filter(r => r.name.toLowerCase().includes(val.toLowerCase()))
      setRestaurants(filtered)
    } else {
      setRestaurants(data.restaurants)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Full Stack Restaurants App</title>
        <meta name="description" content="Order online with this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h2>Welcome to Cyril&apos;s Restaurants</h2>
      </div>
      <div className="description">
        Curated dishes from selected restaurants to order online
      </div>
      <main className="main">
        <div>
        <InputGroup className="pe-5">
          <InputGroup.Text id="basic-addon1">
            <Image src="/images/search-icon.png" alt="search" width="50px" height="50px" />
          </InputGroup.Text>
          <Form.Control id="search" type="text" onChange={() => doSearch()} autoComplete="off" style={{fontSize:"24px"}}/>
        </InputGroup>
        </div>
        <RestaurantsArray data={{restaurants}} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BACKEND_URL}/restaurants`)
  const data = await res.json()
  return { props: { restaurants: data } }
}

export default Home