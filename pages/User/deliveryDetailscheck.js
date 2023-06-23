import { getServer } from "@/config";
import { Paper } from "@mui/material";
import axios from "axios";

export default function Deliverydetails({ records }) {
  return (
    <div>
      {records.length > 0 ? records.map(({
        id, name,phone_no, address, orderdetails, totalfee,deliveryfee,drugfee
      })=> (
        <div key={id}>
          <h3>{name}</h3>
          <h3>{phone_no}</h3>
          <h3>{address}</h3>
          <Detailed detail={orderdetails}/>
          <h3>{totalfee}</h3>
          <h3>{deliveryfee}</h3>
          <h3>{drugfee}</h3>
        </div>
      )): null}
    </div>
  );
}

const Detailed = ({detail}) =>{
    const formated = JSON.parse(detail)
    return (
        <Paper sx={{p: 10}}>{
            formated.length > 0 &&  formated?.map(detail =>(
                <>
                <h1>{detail.name}</h1>            
                <h1>{detail.price}</h1>
                </>            
          ))}</Paper>
    )
}

export const getServerSideProps = async () => {
  const deliveryRes = await axios.get(`${getServer}/api/Delivery`);
  console.log(deliveryRes.data, "res")
  return {
    props: {
      records: deliveryRes.data,
    },
  };
};
