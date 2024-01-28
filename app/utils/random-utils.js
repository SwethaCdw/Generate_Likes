/**
 * To generate a random number between 1 to 1000
 * @param maxLimit - Max limit for generating random number
 * @returns randomNumber
 */
export const generateRandomNumber = (maxLimit) => {
    let randomNumber = Math.floor(Math.random() * maxLimit) + 1;
    return randomNumber;
}

/**
 * 
 * @param {*} randomNumber random number
 * @param {*} rangeSize 
 * @returns start, end
 */
export const getRange = (randomNumber, rangeSize) => {
    const rangeIndex = Math.ceil(randomNumber / rangeSize);
    const rangeStart = (rangeIndex - 1) * rangeSize + 1;
    const rangeEnd = rangeIndex * rangeSize;
    return {rangeStart, rangeEnd};
}
