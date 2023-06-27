import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import TopHeader from "@/components/topHeader";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleCategory,
  getCategories,
  getCategory_helper,
} from "@/util/helper";
import { deleteAction } from "@/redux/reducer";
import { useQuery, useQueryClient } from "react-query";
import { getServer } from "@/config";
import { Alert } from "@mui/material";
import { CrudModal } from "@/components/crudModal";
import { useRouter } from "next/router";
import { ViewCategory } from "@/components/viewCategory";
import { UpdateCategory } from "@/components/updateCategory";

export default function Category({ records }) {
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const visible = useSelector((state) => state.app.toggleForm);
  const dispatch = useDispatch();
  const [category_data, setCategoryData] = useState([]);

  const deletehandler = async () => {
    if (deleteId) {
      console.log(deleteId, 'checked')
      const isDeleted = await deleteSingleCategory(deleteId);
      console.log(isDeleted, 'ok --------')
      if (isDeleted) {
        router.replace(`${getServer}/category`)
      }
      // await queryClient.prefetchQuery("category", getCategories);
      dispatch(deleteAction(null));
    }
  };
  const cancelhandler = async () => {
    dispatch(deleteAction(null));
  };

  const onUpdate = async (id) => {
    const results = await getCategory_helper({ categoryId: id });
    if (results) return setCategoryData(results);
  };
  const onDelete = (id) => {
    if (!visible) {
      dispatch(deleteAction(id));
    }
  };
  // handle delete 
  // const HandleDelete = async (id) =>{
  //  const done = await deleteSingleCategory(id)
  //  if(done) router.replace("/category")
  // }
  const { isLoading, isError, data, error } = useQuery(
    "category",
    getCategories
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error detected{error}</div>;

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
        <TopHeader />

        <div className={styles.category}>
          {deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
          <table className={styles.table}>
            <tbody>
              <tr className={styles.header}>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th></th>
              </tr>
              {records.length > 0
                ? records.map(({ id, title, description, image }, a, b) => (
                    <tr className={styles.details} key={a}>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td>
                        <img
                          src={image}
                          alt="category"
                          className={styles.images}
                        />
                      </td>
                      <td className={styles.btn}>
                        <CrudModal
                          data={id}
                          key={a}
                          title={"View Category"}
                          buttonTitle={"View"}
                          className={styles.view}
                          callbackfun={onUpdate}
                        >
                          <ViewCategory data={category_data[0]} />
                        </CrudModal>

                        <CrudModal
                          data={id}
                          key={b}
                          title={"Update Category"}
                          buttonTitle={"Edit"}
                          className={styles.view}
                          callbackfun={onUpdate}
                        >
                          <UpdateCategory data={category_data[0]} />
                        </CrudModal>


                        <button
                          className={styles.delete}
                          onClick={() => onDelete(id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${getServer}/api/Category`);
  const data = await res.json();
  if (res.ok && data.length > 0) {
    return { props: { records: data } };
  }
  return { props: { records: [] } };
};

function DeleteComponent({ deletehandler, cancelhandler }) {
  return (
    <div>
      <Alert>Do you want to Delete?</Alert>
      <Alert onClick={deletehandler}>Yes</Alert>
      <Alert onClick={cancelhandler}>No</Alert>
    </div>
  );
}
