import axios from "axios";

const API_KEY = "48279024-d4145a4c2f3735ee57c61073f"; 
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні зображень:", error);
    throw error;
  }
}
