import { API_CONSTANTS } from '../constants/api-constants.js';

const apiUrl = API_CONSTANTS.API_URL;

/**
 * Function to fetch the movie details from the mock API 
 * @returns movieList
 */
export async function getMoviesList() {
  try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const movieList = await response.json();
      return movieList;
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      return [];
    }
}

/**
 * 
 * @param {*} updatedData updated Movie list
 * @returns response.data - updated Movie list
 */
export async function updateMoviesList(updatedData) {
  try {
    const response = await axios.put(apiUrl, updatedData);

    return response.data; 
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
}

