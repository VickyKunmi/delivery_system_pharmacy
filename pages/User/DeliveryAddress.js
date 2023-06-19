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

export default function DeliveryAddress() {
  

    const [deliveryAddress, setDeliveryAddress] = useState("");

  const handlePlaceSelect = (place) => {
    geocodeByAddress(place.formatted_address)
      .then((results) => {
        const address = results[0].formatted_address;
        setDeliveryAddress(address);
      })
      .catch((error) => console.error("Error", error));
  };

  const mapRef = useRef(null);

  const initAutocomplete = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });


    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  };

  useEffect(() => {
    if (window.google) {
      initAutocomplete();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyB8dhzyIVNBptL91PB1oCY6Y-4R9oVodKI'}&libraries=places`;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    }
  }, []);







  // };

  return (
    <>
      <Head>
        <title>Get Pills</title>
        <meta name="description" content="Get pills, any drug at all" />
        <link rel="icon" href="/GP violet.png" />

        <Script id="google-maps-script" onLoad={initAutocomplete}>
          {`
    function initAutocomplete() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      });
      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input");
      const searchBox = new google.maps.places.SearchBox(input);

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards the current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name, and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

    window.initAutocomplete = initAutocomplete;
  `}
        </Script>
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.orderinput}>
          <h1 className={styles.title}>Delivery Address</h1>

          <label htmlFor="first Name" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className={styles.first}
            placeholder="Hayford"
            required
          />

          <label htmlFor="Last Name" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="Lastname"
            name="lastname"
            className={styles.last}
            placeholder="Dablah"
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
            required
          />

          <label htmlFor="Address" className={styles.label}>
            {" "}
            Delivery Address
          </label>
          {/* <Autocomplete
            // value={deliveryAddress}
            onPlaceSelected={handlePlaceSelect}
            types = {["geocode"]}
            // types={["address", "(regions)"]}
            options={{
            //   types: ["address", "(regions)"],
              componentRestrictions: { country: "GH" },
            }}
            id="Address"
            name="Address"
            className={styles.address}
            placeholder="Enter your Delivery Address"
            apiKey="AIzaSyAVvdmqcgtMUrZL7ftwUaGZJ94t03UXwsU"
            // onPlaceSelected={(place) => {
            //     console.log(place);
            // }}
            required
          /> */}

          <input
            type="text"
            id="pac-input"
            className={styles.address}
            placeholder="Enter your Delivery Address"
            required
          />
          <div id="map" ref={mapRef} className={styles.map}></div>

          

          <button className={styles.button}>CHECKOUT!</button>
          {/* Your other components and buttons */}
        </div>
        <Footer />
      </div>
    </>
  );
}

{
  /* <Auto */
}

//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }
