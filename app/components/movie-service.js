/**
 * Function to fetch the movie details from the mock API 
 * @returns movieList
 */
export async function movieApiCall() {
    try {
        const response = await fetch('https://mocki.io/v1/2cb7bcc2-6154-4659-92da-a40fa41cd9b3');
        
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