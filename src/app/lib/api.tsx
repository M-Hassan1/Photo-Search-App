import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const apiUrl = 'https://api.unsplash.com';

export const searchImages = async (query: string) => {
  try {
    const response = await axios.get(`${apiUrl}/search/photos`, {
      params: {
        query,
        per_page: 38,
        client_id: apiKey,
        
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
