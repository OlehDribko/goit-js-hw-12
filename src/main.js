import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';
import { fatchCard } from "./js/pixabay-api"

// import {createMarkup, lightbox, showLoader, hideLoader, userScrol} from './js/render-functions.js'
// import {fetchAllImages} from './js/pixabay-api.js'

const refs = {
    btnRequest: document.querySelector('.searchForm'),
    input: document.querySelector('.user-request'),
    gallery: document.querySelector('.card-list'),
    
  };
  
  async function renderCard () {
    try {
      const response = await fatchCard(1);
    } catch (error) {
      console.log(error);
    }
  }
console.log(renderCard());
  

// refs.btnRequest.addEventListener('submit', event => {
//     const userChoice = refs.input.value.trim();
    
//     event.preventDefault();
  
//     if (!userChoice) {
//       iziToast.show({
//         title: 'Не знайдено',
//         message: 'Введіть значення',
//         backgroundColor: 'red',
//         position: 'topRight',
        
//       })
//       return;
//     }
//     refs.gallery.innerHTML = '';
  
//     showLoader();
//   const page = userScrol()
//     fetchAllImages(userChoice, page)
  
//       .then(images => {
//         const markup = createMarkup(images);
//         if(markup === ''){
//           iziToast.show({
//             title: 'Не знайдено',
//             message: 'Задані значення відсутні',
//             backgroundColor: 'red',
//             position: 'topRight',
            
//           })
//         };
//         refs.gallery.innerHTML = markup;
  
        
  
//         lightbox.refresh();
//       })
//       .catch(err => console.error('Помилка:', err)).finally(() =>{
//           hideLoader();
//       });
//   });