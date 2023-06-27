import axios from 'axios';

export default async (req, res) => {
  const { input } = req.query;
  const apiKey = 'AIzaSyCnbzAJeUlTADF--yg4rrA1-vKJS9SF7r4'; // Replace with your actual Google API key

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};
