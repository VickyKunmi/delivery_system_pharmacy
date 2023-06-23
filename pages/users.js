import Header from '@/components/categoryHeader'
import Sidebar from '@/components/sidebar'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from "../styles/User.module.css"
import { getServer } from '@/config'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { deleteAction } from '@/redux/reducer'


export default function Users({records}) {
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const router = useRouter();
  const visible = useSelector((state) => state.app.toggleForm);
  const dispatch = useDispatch();
  const [user_data, setUserData] = useState(records);

 

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${getServer}/api/Signup/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Optionally, handle the response data
        router.replace(`${getServer}/users`);
      } else {
        console.error('Failed to delete user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const cancelhandler = async () => {
    dispatch(deleteAction(null))
  }

  const deletehandler = async () => {
    if(deleteId){
      const isDeleted = await deleteUser(deleteId);
      if(isDeleted) {
        router.replace(`${getServer}/users`)
      }
      dispatch(deleteAction(null))
    }
  }
  const onDelete = (id) => {
    if(!visible) {
      dispatch(deleteAction(id))
    }
  }
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
        <div>
        <Header child={"Users"} />
        </div>
        <div className={styles.tableDetails}>
        {deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
       
          <table className={styles.table}>
            <tbody>
              <tr className={styles.header}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Action</th>
              </tr>

              {records.length > 0
              ? records.map(
                (
                  {id, first_name, last_name, email, phone_number}, a,b
                
              ) => (

              <tr key={id}>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{phone_number}</td>
                <td><button onClick={() => onDelete(id)}>Delete</button></td>
              </tr>
             ) ): <tr>
             <td colSpan={5}>No users found.</td>
           </tr>}
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}



export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if(myCookie.token !== process.env.TOKEN){
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  try {
    const res = await fetch(`${getServer}/api/Signup`);
    const data = await res.json();

    if (res.ok) {
      return { props: { records: data.users } };
    }
  } catch (error) {
    console.error(error);
  }

  return { props: { records: [] } };
};


function DeleteComponent ({deletehandler, cancelhandler}) {
  return (
    <div>
      <Alert>Do you want to delete?</Alert>
      <Alert onClick={deletehandler}>Yes</Alert>
      <Alert onClick={cancelhandler}>No</Alert>
    </div>
  )
}


