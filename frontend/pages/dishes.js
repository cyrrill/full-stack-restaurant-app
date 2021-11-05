import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Form, InputGroup, Image, Button } from 'react-bootstrap'
import RestaurantDishes from '../components/restaurant-dishes'

function Dishes(data) {

  const useDishes = data.dishes.filter(d => !!d.name)
  const [dishes, setDishes] = useState(useDishes)

  function doSearch() {
    const val = document.getElementById('search').value
    if (val) {
      const filtered = useDishes.filter(r => r.name.toLowerCase().includes(val.toLowerCase()))
      setDishes(filtered)
    } else {
      setDishes(useDishes)
    }
  }

  // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
  function lucky() {
    document.getElementById('search').value = ''

    let rand = Math.random()
    console.log('lucky : '+rand + document.getElementById('search').value)
    let item = useDishes[Math.floor(rand*useDishes.length)]

    document.getElementById('search').value = item.name
    doSearch()
  }

  // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  function doShuffle() {
    document.getElementById('search').value = ''
    setDishes(shuffleArray([...useDishes]))
  }

  useEffect(() => doShuffle(), [])

  return (
    <div className="container">
      <div className="title">
        <h2>All Dishes</h2>
      </div>
      <div className="description">
        Select any dishes from all our restaurants<br/>
        <Button onClick={() => doShuffle()}>Shuffle Dishes</Button>
        &nbsp;
        <Button variant="secondary" onClick={() => setDishes(useDishes)}>By Restaurant</Button>
        &nbsp;
        <Button onClick={() => lucky()} variant="success">I&lsquo;m Feeling Luck &#8482;</Button>
      </div>
      <main className="main">
        <div>
        <InputGroup className="pe-5">
          <InputGroup.Text id="basic-addon1"><Image src="/images/search-icon.png" /></InputGroup.Text>
          <Form.Control id="search" type="text" onChange={() => doSearch()} autoComplete="off" style={{fontSize:"24px"}}/>
        </InputGroup>
        </div>
        <RestaurantDishes dishes={dishes} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://backend:8080/restaurants/dishes`)
  const data = await res.json()
  return { props: { dishes: data } }
}

export default Dishes