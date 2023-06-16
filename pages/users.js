import Header from '@/components/categoryHeader'
import Sidebar from '@/components/sidebar'
import Head from 'next/head'
import React from 'react'
import styles from "../styles/User.module.css"
export default function Users() {
  return (
    <>
    <Head>
    <title>Get Pills</title>
        <meta name="description" content="Get Pills web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
    </Head>
    <div className={styles.container}>
        <Sidebar />
        <Header child={"Users"} />
        <div className={styles.tableDetails}>
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone No</th>
                
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}
