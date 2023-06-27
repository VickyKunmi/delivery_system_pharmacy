import Head from "next/head";
import styles from "../../styles/user/DeliveryAddress.module.css";
import Header from "@/components/user/userheader";
import Footer from "../../components/user/userfooter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServer } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { addDelivery } from "@/util/helper";
import { addDrug, updateDeliveryFee, updateTotalFee } from "@/redux/cartSlice";
import { MenuItem, Select } from "@mui/material";

export default function DeliveryAddress({ location }) {
  const [name, setName] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [user_email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalfee, setTotalFee] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [drugfee, setDrugFee] = useState(0);
  const [orderdetails, setOrderDetails] = useState([]);
  const router = useRouter();
  const [savedNotify, setSavedNotify] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const autocompleteRef = useRef(null);
  // const deliveryFee = useSelector((state) => state.cart.deliveryFee);


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








  useEffect(() => {
    const autocompleteService = new window.google.maps.places.AutocompleteService();

    const autocompleteOptions = {
      types: ['geocode'],
      componentRestrictions: { country: 'gh' },
    };

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, autocompleteOptions);

    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();

      if (selectedPlace && selectedPlace.formatted_address) {
        setAddress(selectedPlace.formatted_address);
      }
    });

    autocompleteRef.current.addEventListener('input', () => {
      const input = autocompleteRef.current.value;
      if (input) {
        autocompleteService.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: 'gh' },
          },
          handleAutocompleteResults
        );
      }
    });

    handlePlaceSelection();
  }, []);

  const handleAutocompleteResults = (predictions, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
      const ghanaPredictions = predictions.filter((prediction) => {
        const countryMatch = prediction?.terms.find((term) => term.value === 'Ghana');
        return !!countryMatch;
      });

      const autocompleteResults = ghanaPredictions.map((prediction) => prediction.description);
      console.log('Autocomplete Results:', autocompleteResults);
    }
  };

  const handlePlaceSelection = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);

    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();

      if (selectedPlace && selectedPlace.formatted_address) {
        setAddress(selectedPlace.formatted_address);
      }
    });
  };

  const getCoordinatesFromAddress = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB8dhzyIVNBptL91PB1oCY6Y-4R9oVodKI`);
  
    if (!response.ok) {
      throw new Error('Unable to fetch coordinates from address');
    }
  
    const data = await response.json();
  
    if (data.status !== 'OK' || data.results.length === 0) {
      throw new Error('No results found for the address');
    }
  
    // console.log(lat, "latitude", lng, "longitude")
    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  };
  const calculateDeliveryFee = async () => {
    try {
      // Get latitude and longitude from Google Maps API
      const { latitude, longitude } = await getCoordinatesFromAddress(address);
      const delresponse = await fetch(`/api/delivery-fee?latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (delresponse.ok) {
        const data = await delresponse.json();
        const { deliveryFee } = data;
        setDeliveryFee(deliveryFee);
        console.log(deliveryFee, 'fee');
      } else {
        console.error('Error calculating delivery fee:', delresponse.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (address) {
      // Calculate the delivery fee when the address changes
      calculateDeliveryFee();
    }
  }, [address]);


const handleAdd = async (e) => {
  e.preventDefault();
  const everything = JSON.parse(sessionStorage.getItem("cart"))
  console.log(everything, "everything")
  try {
    const { latitude, longitude } = await getCoordinatesFromAddress(address);
    const delresponse = await fetch(`/api/delivery-fee?latitude=${latitude}&longitude=${longitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (delresponse.ok) {
      const data = await delresponse.json();
      const { deliveryFee } = data;
      setDeliveryFee(deliveryFee);

      console.log(deliveryFee, "fee")
      // Send data to the server
      const response = await fetch('/api/Delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone_no,
          latitude,
          longitude,
          user_email,
          orderdetails:JSON.stringify(everything.drugs),
          totalfee: (cart.total + deliveryFee),
          deliveryFee: deliveryFee,
          drugfee: cart.total,
        }),
        
      });
      // setDrugFee(cart.total);
      // setTotalFee(cart.total + deliveryFee);
      // setDeliveryFee(deliveryFee);

      // const drugFee = cart.total;
      // const deliveryfee = deliveryFee; // Use selectedLandmarkPrice as the delivery fee
      // const totalFee = drugFee + deliveryfee;     
      // dispatch(updateDeliveryFee(deliveryFee));
      // dispatch(updateTotalFee(totalFee));
      if (response.ok) {
        // Handle success
        console.log('Customer created successfully');
      } else {
        // Handle error
        console.error('Error creating customer:', response.status);
      }
    } else {
      console.error('Error calculating delivery fee:', response.status);
    }


  } catch (error) {
    console.error(error);
    
  }
}
  

  return (
    <>
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />
      </Head>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleAdd}>
          <div className={styles.orderinput}>
            <h1 className={styles.title}>Delivery & Price Details</h1>
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
              Delivery Address
            </label>
            <input
              className={styles.address}
              type="text"
              ref={autocompleteRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* <label>Delivery Fee: GHC</label> */}
          {/* <h2>Delivery Fee: {deliveryFee ? `GHC${deliveryFee}` : 'Loading...'}</h2> */}
          {deliveryFee !== null && (
        <div>
          {deliveryFee !== null && typeof deliveryFee === 'number' && (
        <div>
          Delivery Fee: ${deliveryFee.toFixed(2)}
        </div>
      )}
        </div>
      )}

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

                <h4>{order.price * order.quantity}</h4>
              </div>
            ))}
          </div>
        </form>

        <div className={styles.orderpop}>
          <div>
            <label>Item Total Price: GHC</label>{" "}
            <input
              value={(cart.total).toFixed(2)}
              onChange={(e) => setDrugFee(e.target.value)}
              readOnly
            />
          </div>
          <label>Delivery fee: GHC</label>
          {deliveryFee !== null && (
        <div>
          
            <input
            value={ deliveryFee.toFixed(2)}
            onChange={(e) => setDeliveryFee(e.target.value)}
            readOnly
          />
          {/* {deliveryFee !== null && typeof deliveryFee === 'number' && (
        <div>
          Delivery Fee: ${deliveryFee.toFixed(2)}
        </div>
      )} */}
        </div>
      )}

      <div>
      <label>Item Total Price: GHC</label>{" "}
            <input
              value={((cart.total + deliveryFee).toFixed(2))}
              onChange={(e) => setTotalFee(e.target.value)}
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
  const landmarkres = await axios.get(`${getServer}/api/Landmarks`);
  return { props: { location: locationres.data, landmark: landmarkres.data } };
};
