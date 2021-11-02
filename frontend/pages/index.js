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
      <main className="main">
        <CardsArray data={data} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8080/restaurants`)
  const data = await res.json()
  return { props: { restaurants: data } }
}

export default home