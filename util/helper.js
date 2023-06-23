import { getServer } from "@/config";
import Deliverydetails from "@/pages/User/deliveryDetailscheck";
import axios from "axios";


//helper for category

export const getCategories = async () => {
  const response = await fetch(`${getServer}/api/Category`);
  const JSON = await response.json();
  return JSON;
};

export const getCategory_helper = async ({ categoryId }) => {
  categoryId = categoryId.data;
  const response = await fetch(
    `${getServer}/api/Category/single?categoryId=${categoryId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addCategory = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Category`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleCategory({categoryId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, models }),
      };
      const response = await fetch(`${getServer}/api/Category/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleCategory(categoryId) {
  try {
    console.log(categoryId, "category delete");
    const res = await axios.delete(`${getServer}/api/Category/single?categoryId=${categoryId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}


// helper for uploading images
export const UploadImage = async (imageData) => {
  const uploadRes = await axios.post(
    "https://api.cloudinary.com/v1_1/dmkqhochv/image/upload",
    imageData
  );
  const { url } = uploadRes.data;
  if (url) return url;
};



// helper for rider 
export const getRiders = async () => {
  const response = await fetch(`${getServer}/api/Rider`);
  const JSON = await response.json();
  return JSON;
};

export const getRider_helper = async ({ riderId }) => {
  riderId = riderId.data;
  const response = await fetch(
    `${getServer}/api/Rider/single?riderId=${riderId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addRider = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Rider`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleRider({riderId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId, models }),
      };
      const response = await fetch(`${getServer}/api/Rider/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleRider(riderId) {
  try {
    const res = await axios.delete(`${getServer}/api/Rider/single?riderId=${riderId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
}


// helper for customers 
export const getUsers = async () => {
  const response = await fetch(`${getServer}/api/User`);
  const JSON = await response.json();
  return JSON;
};

export const getUser_helper = async ({ userId }) => {
  userId = userId.data;
  console.log(userId, 'user id')
  const response = await fetch(
    `${getServer}/api/User/single?userId=${userId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addUser = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    };
    // console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Signup`, options);
    // const response = await axios.post(`${getServer}/api/Rider`, {formData})
    const json = await response.json();
    if(json)return {isSaved: true};
  } catch (error) {
    return error;
  }
};


export async function updateSingleUser({userId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, models }),
      };
      const response = await fetch(`${getServer}/api/User/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleUser(userId) {
  try {
    const res = await axios.delete(`${getServer}/api/User/single?userId=${userId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
}






//helper for drugs
export const getDrugs = async () => {
  const response = await fetch(`${getServer}/api/Drug`);
  const JSON = await response.json();
  return JSON;
};

export const getDrug_helper = async ({ drugId }) => {
  drugId = drugId.data;
  const response = await fetch(
    `${getServer}/api/Drug/single?drugId=${drugId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addDrug = async (formData) => {
  console.log(formData, "data");
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${getServer}/api/Drug`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleDrug({drugId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drugId, models }),
      };
      const response = await fetch(`${getServer}/api/Drug/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleDrug(drugId) {
  try {
    console.log(drugId, "drug deleted");
    const res = await axios.delete(`${getServer}/api/Drug/single?drugId=${drugId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}
















//helper for featured drugs
export const getFeaturedDrugs = async () => {
  const response = await fetch(`${getServer}/api/FeaturedDrug`);
  const JSON = await response.json();
  return JSON;
};

export const getFeaturedDrug_helper = async ({ featuredDrugId }) => {
  featuredDrugId = featuredDrugId.data;
  const response = await fetch(
    `${getServer}/api/FeaturedDrug/single?featuredDrugId=${featuredDrugId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};


// export const getFeaturedDrug_helper = async ({ featuredDrugId }) => {
//   const response = await fetch(
//     `${getServer}/api/FeaturedDrug/single?featuredDrugId=${featuredDrugId}`
//   );
//   const json = await response.json();
//   if (json) return json;
//   return {};
// };

export const addFeaturedDrug = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/FeaturedDrug`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleFeaturedDrug({featuredDrugId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featuredDrugId, models }),
      };
      const response = await fetch(`${getServer}/api/FeaturedDrug/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleFeaturedDrug(featuredDrugId) {
  try {
    console.log(featuredDrugId, "category delete");
    const res = await axios.delete(`${getServer}/api/FeaturedDrug/single?featuredDrugId=${featuredDrugId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}








//helper for Cart
export const getCarts = async () => {
  const response = await fetch(`${getServer}/api/Cart`);
  const JSON = await response.json();
  return JSON;
};

export const getCart_helper = async ({ orderdetailId }) => {
  orderdetailId = orderdetailId.data;
  const response = await fetch(
    `${getServer}/api/Cart/single?orderdetailId=${orderdetailId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addCart = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Cart`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleCart({orderdetailId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderdetailId, models }),
      };
      const response = await fetch(`${getServer}/api/Cart
      /single`, options);
      const json = await response.json();
      return json;
}




export async function deleteSingleCart(cartId) {
  try {
    console.log(cartId, "cart delete");
    const res = await axios.delete(`${getServer}/api/Cart/single?cartId=${cartId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}



// export async function deleteSingleCart(cartId) {
//   const Options = {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cartId }),
//   };
//   const response = await fetch(`${getServer}/api/api/Cart/single`, Options);
//   const json = await response.json();
//   return json; // Make sure the response contains the necessary properties
// }


// export async function deleteSingleCart(cartId) {
//   const Options = {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cartId }),
//   };
//   const response = await fetch(`${getServer}/api/api/Cart/single`, Options);
//   const json = await response.json();
//   return json;
// }



//helper for Order details
export const getOrderdetail = async () => {
  const response = await fetch(`${getServer}/api/OrderDetails`);
  const JSON = await response.json();
  return JSON;
};

export const getOrderdetail_helper = async ({ orderdetailId }) => {
  orderdetailId = orderdetailId.data;
  const response = await fetch(
    `${getServer}/api/Orderdetails/single?orderdetailId=${orderdetailId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addOrderdetail = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/OrderDetails`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleOrderDetail({orderdetailId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderdetailId, models }),
      };
      const response = await fetch(`${getServer}/api/Orderdetail
      /single`, options);
      const json = await response.json();
      return json;
} 




export async function deleteSingleOrderDetail(orderdetailId) {
  try {
    console.log(orderdetailId, "order delete");
    const res = await axios.delete(`${getServer}/api/OrderDetails/single?orderdetailId=${orderdetailId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}


















//helper for delivery

export const getDeliveries = async () => {
  const response = await fetch(`${getServer}/api/Delivery`);
  const JSON = await response.json();
  return JSON;
};

export const getDelivery_helper = async ({ deliveryId }) => {
  deliveryId = deliveryId.data;
  const response = await fetch(
    `${getServer}/api/Delivery/single?deliveryId=${deliveryId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addDelivery = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Delivery`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleDelivery({deliveryId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryId, models }),
      };
      const response = await fetch(`${getServer}/api/Delivery/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleDelivery(deliveryId) {
  try {
    console.log(deliveryId, "Delivery delete");
    const res = await axios.delete(`${getServer}/api/Delivery/single?deliveryId=${deliveryId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}




































//helper for Location

export const getLocation = async () => {
  const response = await fetch(`${getServer}/api/Location`);
  const JSON = await response.json();
  return JSON;
};

export const getLocation_helper = async ({ categoryId }) => {
  locationId = locationId.data;
  const response = await fetch(
    `${getServer}/api/Location/single?locationId=${locationId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addLocation = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Location`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleLocation({locationId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId, models }),
      };
      const response = await fetch(`${getServer}/api/Location/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleLocation(locationId) {
  try {
    console.log(locationId, "location delete");
    const res = await axios.delete(`${getServer}/api/Location/single?LocationId=${locationId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}





































//helper for Landmarks

export const getLandMarks = async () => {
  const response = await fetch(`${getServer}/api/Landmarks`);
  const JSON = await response.json();
  return JSON;
};

export const getLandMarks_helper = async ({ landmarksId }) => {
  landmarksId = landmarksId.data;
  const response = await fetch(
    `${getServer}/api/Landmarks/single?landmarksId=${landmarksId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addLandMarks = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Landmarks`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleLandMarks({landmarksId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landmarksId, models }),
      };
      const response = await fetch(`${getServer}/api/Landmarks/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleLandMarks(landmarksId) {
  try {
    console.log(landmarksId, "location delete");
    const res = await axios.delete(`${getServer}/api/Landmarks/single?landmarksId=${landmarksId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}
























//helper for DelDetails


export const getDelDetails = async () => {
  const response = await fetch(`${getServer}/api/DelDetails`);
  const JSON = await response.json();
  return JSON;
};

export const getDelDetails_helper = async ({ deliverydetailId }) => {
  deliverydetailId = deliverydetailId.data;
  const response = await fetch(
    `${getServer}/api/DelDetails/single?deliverydetailId=${deliverydetailId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addDelDetails = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/DelDetails`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSingleDelDetails({deliverydetailId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliverydetailId, models }),
      };
      const response = await fetch(`${getServer}/api/DelDetails/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSingleDelDetails(deliverydetailsId) {
  try {
    console.log(deliverydetailsId, "location delete");
    const res = await axios.delete(`${getServer}/api/DelDetails/single?deliverydetailsId=${deliverydetailsId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}







//helper for Prescription


export const getPrescription = async () => {
  const response = await fetch(`${getServer}/api/Prescription`);
  const JSON = await response.json();
  return JSON;
};

export const getPrescription_helper = async ({ prescriptionId }) => {
  prescriptionId = prescriptionId.data;
  const response = await fetch(
    `${getServer}/api/Prescription/single?prescriptionId=${prescriptionId}`
  );
  const json = await response.json();
  if (json) return json;
  return {};
};

export const addPrescription = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData, "data");
    const response = await fetch(`${getServer}/api/Prescription`, options);
    // const response = await axios.post(`${getServer}/api/Category`, formData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};


export async function updateSinglePrescription({prescriptionId, models}){
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prescriptionId, models }),
      };
      const response = await fetch(`${getServer}/api/Prescription/single`, options);
      const json = await response.json();
      return json;
}



export async function deleteSinglePrescription(prescriptionId) {
  try {
    console.log(prescriptionId, "location delete");
    const res = await axios.delete(`${getServer}/api/Prescription/single?prescriptionId=${prescriptionId}`);  
    if(res && res.status === 200) return true
  } catch (error) {
    console.log(error)
  }
 
}