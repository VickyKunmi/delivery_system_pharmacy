import DrugHeader from "@/components/drugHeader";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import styles from "../styles/Drug.module.css";
import Head from "next/head";
import { getServer } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { deleteSingleDrug, getDrug_helper, getDrugs } from "@/util/helper";
import { deleteAction } from "@/redux/reducer";
import { useQuery } from "react-query";
import { Alert } from "@mui/material";
import { CrudModal } from "@/components/crudModal";
import { UpdateDrug } from "@/components/updateDrug";
import { ViewDrug } from "@/components/viewDrug";
import axios from "axios";

export default function drug({ cat, records }) {
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const router = useRouter();
  // console.log(cat, "Cat")
  const visible = useSelector((state) => state.app.toggleForm);
  const dispatch = useDispatch();
  const [drug_data, setDrugData] = useState([]);
  const deletehandler = async () => {
    if (deleteId) {
      const isDeleted = await deleteSingleDrug(deleteId);
      if (isDeleted) {
        router.replace(`${getServer}/drug`);
      }
      dispatch(deleteAction(null));
    }
  };
  const cancelhandler = async () => {
    dispatch(deleteAction(null));
  };


  const onUpdate = async (id) => {
    const results = await getDrug_helper({ drugId: id });
    if (results) return setDrugData(results);
  };

  
  const onDelete = (id) => {
    if (!visible) {
      dispatch(deleteAction(id));
    }
  };
  const { isLoading, isError, data, error } = useQuery("drug", getDrugs);

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
          <DrugHeader cat={cat} />
        </div>
        <div className={styles.category}>
          {deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
          <table className={styles.table}>
            <tbody>
              <tr className={styles.header}>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th></th>
              </tr>

              {records.length > 0
                ? records.map(
                    (
                      {
                        id,
                        name,
                        description,
                        price,
                        category,
                        price_symbol,
                        image,
                      },
                      a,
                      b
                    ) => (
                      <tr className={styles.details} key={a}>
                        <td>{name}</td>
                        <td>{description}</td>
                        <td>{category}</td>
                        <td>
                          {price_symbol}
                          {price}
                        </td>
                        <td>
                          <img
                            src={image}
                            alt="image"
                            width={100}
                            height={100}
                          />
                        </td>
                        <td className={styles.btn}>
                          <CrudModal
                            // data={id}
                            data={id}
                            key={a}
                            title={"View Drug details"}
                            buttonTitle={"View"}
                            className={styles.view}
                            callbackfun={onUpdate}
                          >
                            <ViewDrug data={drug_data[0]} />
                            {/* {drug_data.length > 0 && <ViewDrug data={drug_data[0]} />} */}
                          
                          </CrudModal>
                          <CrudModal
                            data={id}
                            key={b}
                            title={"Edit Drug details"}
                            buttonTitle={"Edit"}
                            className={styles.edit}
                            callbackfun={onUpdate}
                          >
                            <UpdateDrug data={drug_data[0]} cat={cat} />
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



export const getServerSideProps = async () => {
  try {
    const categoryRes = await fetch(`${getServer}/api/Category`);
    const categoryData = await categoryRes.json();

    const drugRes = await fetch(`${getServer}/api/Drug`);
    const drugData = await drugRes.json();

    if (categoryRes.ok && drugRes.ok) {
      return {
        props: {
          cat: categoryData,
          records: drugData
        }
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      cat: [],
      records: []
    }
  };
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
