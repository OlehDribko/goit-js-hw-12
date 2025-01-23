import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import {createMarkup, lightbox, showLoader, hideLoader } from './js/render-functions.js'
import {fetchAllImages} from './js/pixabay-api.js'

const refs = {
    btnRequest: document.querySelector('.searchForm'),
    input: document.querySelector('.user-request'),
    gallery: document.querySelector('.card-list'),
    
  };

refs.btnRequest.addEventListener('submit', event => {
    const userChoice = refs.input.value.trim();
    
    event.preventDefault();
  
    if (!userChoice) {
      iziToast.show({
        title: 'Не знайдено',
        message: 'Введіть значення',
        backgroundColor: 'red',
        position: 'topRight',
        
      })
      return;
    }
    refs.gallery.innerHTML = '';
  
    showLoader();
  
    fetchAllImages(userChoice)
  
      .then(images => {
        const markup = createMarkup(images);
        if(markup === ''){
          iziToast.show({
            title: 'Не знайдено',
            message: 'Задані значення відсутні',
            backgroundColor: 'red',
            position: 'topRight',
            
          })
        };
        refs.gallery.innerHTML = markup;
  
        
  
        lightbox.refresh();
      })
      .catch(err => console.error('Помилка:', err)).finally(() =>{
          hideLoader();
      });
  });