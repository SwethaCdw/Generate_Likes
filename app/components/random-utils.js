export const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
}

export const checkRangeUsingRandomNumber = (randomNumber) => {
    // if(randomNumber >= 1 && randomNumber <= 250){
    //     return 1;
    // } else if(randomNumber >= 251 && randomNumber <= 500){
    //     return 2;
    // } else if(randomNumber >= 501 && randomNumber <= 750){
    //     return 3;
    // } else if(randomNumber >= 751 && randomNumber <= 100){
    //     return 4;
    // }

    const range = randomNumber <= 250 ? 1 : 
                  randomNumber <= 500 ? 2 :
                  randomNumber <= 750 ? 3 :
                  4;
    
    return range;
}