import { getServer } from "@/config";
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
    `${getServer}/api/Category/single?drugId=${drugId}`
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
    // console.log(featuredDrugId, "category delete");
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