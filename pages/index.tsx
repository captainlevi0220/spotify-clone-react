import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>This is an awesome Spotify build!</h1>

      <main>
        <Sidebar />

        {/* Center */}
      </main>

      <div>{/* Player  */}</div>
    </div>
  )
}

export default Home
