import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Head from 'next/head'
import React from 'react'

export default function Orders() {
  return (
    <>
    <Head>
    <title>Get Pills</title>
        <meta name="description" content="Get Pills web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
    </Head>
    <div>
        <Sidebar />
        <Header />
    </div>
    </>
  )
}
