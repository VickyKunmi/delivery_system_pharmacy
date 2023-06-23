import Head from "next/head";
import styles from "../../styles/user/DeliveryAddress.module.css";
import Header from "@/components/user/userheader";
import Footer from "../../components/user/userfooter";
import { useEffect, useRef, useState } from "react";
// import  Autocomplete from "react-google-autocomplete";
import Script from "next/script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getServer } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { addDelivery } from "@/util/helper";
// import { updateDeliveryFee } from "@/redux/cartSlice";
import { addDrug, updateDeliveryFee, updateTotalFee } from "@/redux/cartSlice";
import { MenuItem, Select } from "@mui/material";

export default function DeliveryAddress({ location }) {
  const [name, setName] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [user_email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalfee, setTotalFee] = useState(0);
  const [deliveryfee, setDeliveryFee] = useState(0);
  const [drugfee, setDrugFee] = useState(0);
  const [orderdetails, setOrderDetails] = useState([]);
  const router = useRouter();
  const [savedNotify, setSavedNotify] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState({});
  const [selectedLandmarkPrice, setSelectedLandmarkPrice] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (cart.drugs.length === 0) {
        parsedCart.drugs.forEach((drug) => {
          dispatch(addDrug(drug));
        });
      }
    }
  }, []);

  const handleAddAddressDetails = async (model) => {
    const result = await addDelivery(model);
    console.log(result, "result");
    const { isSaved } = result;
    if (isSaved) {
      setSavedNotify(true);
      setTimeout(() => {
        router.replace(`${getServer}/User/checkout`);
        setSavedNotify(false);
      }, 1000);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const everything = JSON.parse( sessionStorage.getItem("cart"))
    console.log(everything, "everything")

    try {
      const model = {
        name,
        phone_no,
        user_email,
        address,
        orderdetails:JSON.stringify(everything.drugs),
        totalfee: (cart.total + selectedLandmarkPrice),
      deliveryfee: selectedLandmarkPrice,
      drugfee: cart.total,
        // ordername,
      };
      setDrugFee(cart.total);
      setDeliveryFee(selectedLandmarkPrice);
      setTotalFee(cart.total + selectedLandmarkPrice);
      await handleAddAddressDetails(model);
      console.log(model, "models")
      const drugFee = cart.total;
      const deliveryFee = selectedLandmarkPrice; // Use selectedLandmarkPrice as the delivery fee
      const totalFee = drugFee + deliveryFee;

      // setOrderDetails(`${cart.quantity}x ${cart.name}`);
      // Dispatch the action to update the delivery fee and total fee in the Redux store
      dispatch(updateDeliveryFee(deliveryFee));
      dispatch(updateTotalFee(totalFee));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLandmarks = async () => {
      if (selectedLocation) {
        try {
          const response = await axios.get(
            `/api/Landmarks/${encodeURIComponent(selectedLocation)}`
          );
          setLandmarks(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setLandmarks([]);
      }
    };

    fetchLandmarks();
  }, [selectedLocation]);

  const handleLocationChange = async (event) => {
    const selectedLocationId = event.target.value;
    setSelectedLocation(selectedLocationId);

    try {
      const response = await axios.get(
        `/api/Landmarks/${encodeURIComponent(selectedLocationId)}`
      );
      setLandmarks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLandM = (value) => {
    console.log(value, landmarks);
    const selected = landmarks.filter((landmark) => landmark.id === value);
    const { title } = selected[0];
    const { price } = selected[0].prices;
    setSelectedLandmarkPrice(price);
    setAddress(title);
  };

  return (
    <>
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />
      </Head>
      <Header />+{" "}
      <div className={styles.container}>
        <form onSubmit={handleAdd}>
          <div className={styles.orderinput}>
            <h1 className={styles.title}>Delivery & Price Details</h1>
            {/* {customer.map((details) => ( */}

            <label htmlFor="Name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.first}
              placeholder="Hayford Agei"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="Last Name" className={styles.label}>
              Last Name
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              className={styles.last}
              // defaultValue={details.first_name}
              placeholder="dablah@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="Contact" className={styles.label}>
              Contact
            </label>
            <input
              type="text"
              id="Lastname"
              name="lastname"
              className={styles.contact}
              placeholder="e.g (0540001112)"
              onChange={(e) => setPhone_no(e.target.value)}
              required
            />

            <label htmlFor="Address" className={styles.label}>
              {" "}
              Delivery Address
            </label>

            <Select
              onChange={handleLocationChange}
              className={styles.address}
              value={selectedLocation}
            >
              {location.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.title}
                </MenuItem>
              ))}
            </Select>

            <label htmlFor="Address" className={styles.label}>
              Landmarks
            </label>
            <Select
              className={styles.address}
              value={address}
              onChange={(e) => handleLandM(e.target.value)}
            >
              {landmarks.map((landmark) => (
                <MenuItem key={landmark.id} value={landmark.id}>
                  {landmark.title} | price: {landmark.prices.price}
                </MenuItem>
              ))}
            </Select>

            <button className={styles.button} type="submit">
              CHECKOUT!
            </button>
          </div>
          <div className={styles.ordrec}>
            <h1 className={styles.Heading}>Order Details</h1>
            {cart.drugs.map((order, index) => (
              <div key={index}>
                <input
                 onChange={(e) => {
                  setOrderDetails(`${order.quantity}x ${order.name}`);
                
                }}
                  className={styles.item}
                  type="text"
                  value={`${order.quantity}x ${order.name}`}
                />

                {/* <input
                  className={styles.itemprice}
                  type="text"
                  value=
              // onChange={(e) => setPhone_no(e.target.value)}

                /> */}
                <h4>{order.price * order.quantity}</h4>
              </div>
            ))}

            <></>
          </div>
        </form>

        <div className={styles.orderpop}>
          <div>
            <label>Delivery fee: GHC</label>{" "}
            <input
              onChange={(e) => setDeliveryFee(e.target.value)}
              value={selectedLandmarkPrice}
              readOnly
            />
          </div>
          <div>
            <label>Item Total Price: GHC</label>{" "}
            <input
              value={cart.total}
              onChange={(e) => setDrugFee(e.target.value)}
              readOnly
            />
          </div>
          <h4 readOnly>Subtotal: GHC 0.00</h4>
          <div>
            <label>Total: GHC</label>{" "}
            <input
              onChange={(e) => setTotalFee(e.target.value)}
              value={cart.total + selectedLandmarkPrice}
              readOnly
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const locationres = await axios.get(`${getServer}/api/Location`);
  // const locationData = await locationres.json();
  const landmarkres = await axios.get(`${getServer}/api/Landmarks`);
  return { props: { location: locationres.data, landmark: landmarkres.data } };
};
