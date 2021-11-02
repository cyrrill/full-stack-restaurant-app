import Head from 'next/head'
import CardsArray from '../components/cards-array'

const home = function Home(data) {
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
        <CardsArray data={data} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://backend:8080/restaurants`)
  const data = await res.json()
  return { props: { restaurants: data } }
}

export default home