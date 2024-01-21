/**
 * To generate a random number between 1 to 1000
 * @returns randomNumber
 */
export const generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    return randomNumber;
}

/**
 * To check under which range does the random number lie under
 * @returns range
 */
export const checkRangeUsingRandomNumber = (randomNumber) => {
    const range = randomNumber <= 250 ? 1 : 
                  randomNumber <= 500 ? 2 :
                  randomNumber <= 750 ? 3 :
                  4;
    
    return range;
}