import Head from 'next/head'

import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Water quality monitoring system on different locations using IoT || Mobile & Pervasive Computing Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </>
  )
}
