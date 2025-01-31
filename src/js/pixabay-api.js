import axios from 'axios';







export function fatchCard(currentPage) {
  
 
return axios.get(`https://pixabay.com/api/?key=48279024-d4145a4c2f3735ee57c61073f&q=dog&image_type=photo&per_page=15&page=${pageNumber}`)

}


// console.log(axios.get(`${BASE_URL}/?key=${APIKAY}&q=dog&image_type=photo`));

// export const fetchAllImages =  (userChoice, page) => {
//   return    fetch(`${BASE_URL}/?key=${APIKAY}&q=${userChoice}&image_type=photo&per_page=15&page=${page}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//          throw new Error('404');
//       }
//       return response.json();
//     })
//     .then(data => {
//         const {hits} = data;
//     return hits;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

