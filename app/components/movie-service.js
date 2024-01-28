
const apiUrl = 'https://mocki.io/v1/2cb7bcc2-6154-4659-92da-a40fa41cd9b3';

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

