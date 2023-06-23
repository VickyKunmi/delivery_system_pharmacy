import RiderHeader from "@/components/riderHeader";
import Sidebar from "@/components/sidebar";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Rider.module.css";
import { getServer } from "@/config";
import { Alert, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { deleteSingleRider, getRider_helper, getRiders } from "@/util/helper";
import { deleteAction } from "@/redux/reducer";
import { useQuery } from "react-query";
import { CrudModal } from "@/components/crudModal";
import { ViewRider } from "@/components/viewRider";
import { UpdateRider } from "@/components/updateRider";
export default function Rider({ records }) {
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const router = useRouter();
  const visible = useSelector((state) => state.app.toggleForm);
  const dispatch = useDispatch();
  const [rider_data, setRiderData] = useState([]);
  const deletehandler = async () => {
    if (deleteId) {
      const isDeleted = await deleteSingleRider(deleteId);
      if (isDeleted) {
        router.replace(`${getServer}/riders`);
      }
      dispatch(deleteAction(null));
    }
  };
  const cancelhandler = async () => {
    dispatch(deleteAction(null));
  };
  const onUpdate = async (id) => {
    const results = await getRider_helper({ riderId: id });
    if (results) return setRiderData(results);
  };
  const onDelete = (id) => {
    if (!visible) {
      dispatch(deleteAction(id));
    }
  };

  const { isLoading, isError, data, error } = useQuery("rider", getRiders);
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error detected {error}</div>;

  return (
    <>
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get Pills web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className={styles.containers}>
        <Sidebar />
        <div className={styles.head}>
          <RiderHeader />
        </div>
        <div className={styles.rider}>
          {deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
          <table className={styles.table}>
            <tbody>
              <tr className={styles.header}>
                <th>Name</th>
                <th>Username</th>
                <th>Phone number</th>
                <th>Status</th>
                <th></th>
              </tr>
              {records.length > 0
                ? records.map(
                    (
                      { id, name, username, phone_number, available_status },
                      a,
                      b
                    ) => (
                      <tr className={styles.details} key={a}>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{phone_number}</td>
                        <td>
                          <Switch checked={available_status} color="warning" />
                        </td>
                        <td className={styles.btn}>
                          <CrudModal
                            data={id}
                            key={a}
                            title={"View Rider Details"}
                            buttonTitle={"View"}
                            className={styles.view}
                            callbackfun={onUpdate}
                          >
                            <ViewRider data={rider_data[0]} />
                          </CrudModal>
                          <CrudModal
                            data={id}
                            key={b}
                            title={"Update Rider details"}
                            buttonTitle={"Edit"}
                            className={styles.view}
                            callbackfun={onUpdate}
                          >
                            <UpdateRider data={rider_data[0]} />
                          </CrudModal>
                          <button
                            className={styles.delete}
                            onClick={() => onDelete(id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
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
  const res = await fetch(`${getServer}/api/Rider`);
  const data = await res.json();
  if (res.ok && data.length > 0) {
    return { props: { records: data } };
  }
  return { props: { records: [] } };
};

function DeleteComponent({ deletehandler, cancelhandler }) {
  return (
    <div>
      <Alert>Do you want to delete?</Alert>
      <Alert onClick={deletehandler}>Yes</Alert>
      <Alert onClick={cancelhandler}>No</Alert>
    </div>
  );
}
