



const BASE_URL = 'https://pixabay.com/api'
const APIKAY = '48279024-d4145a4c2f3735ee57c61073f';



export const fetchAllImages = (userChoice) => {
  return fetch(`${BASE_URL}/?key=${APIKAY}&q=${userChoice}&image_type=photo`)
    .then(response => {
      
      if (!response.ok) {
         throw new Error('404');
      }
      return response.json();
    })
    .then(data => {
        const {hits} = data;
    return hits;
    })
    .catch(err => {
      console.log(err);
    });
};

