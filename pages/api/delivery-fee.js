// pages/api/delivery-fee.js

export default function handler(req, res) {
    const { latitude, longitude } = req.query;
  
    // Calculate the delivery fee based on the provided latitude and longitude
    const deliveryFee = calculateDeliveryFee(latitude, longitude);
  
    // Return the delivery fee as a response
    res.status(200).json({ deliveryFee });
  }
  
  // Function to calculate the delivery fee based on coordinates
  function calculateDeliveryFee(latitude, longitude) {
    // Implement your logic to calculate the delivery fee based on latitude and longitude
    // Here's a simple example:
    // You can use any algorithm or logic that suits your application requirements
    const baseFee = 5.99;
    const distanceFactor = 0.1; // $0.10 per unit of distance
    const distance = calculateDistance(latitude, longitude); // Implement your own distance calculation logic
    const deliveryFee = baseFee + distanceFactor * distance;
    return deliveryFee;
  }
  
  // Function to calculate distance between coordinates
  function calculateDistance(latitude, longitude) {
    // Implement your logic to calculate the distance between coordinates
    // Here's a simple example using the Haversine formula:
    const lat1 = 7.336384430731113;
    const lon1 =  -2.3280159913817204;
    const lat2 = Number(latitude);
    const lon2 = Number(longitude);
  
    const radius = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
  
    return distance;
  }
  
  // Function to convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  