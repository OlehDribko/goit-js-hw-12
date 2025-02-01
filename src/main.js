import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from "./js/pixabay-api";
import {
  createMarkup,
  updateGallery,
  toggleLoadMoreBtn,
  scrollToNextPage,
  showEndMessage,
  refreshLightbox,
  showLoader,
  hideLoader,
} from "./js/render-functions";

const form = document.querySelector(".searchForm");
const postsList = document.querySelector(".card-list");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;
let totalHits = 0;
let maxPage = 1;
let isLastPage = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.querySelector("input").value.trim();
  if (!query) {
    iziToast.error({
      title: "Помилка введення даних!",
      message: "Введіть значення у форму для пошуку зображень.",
      backgroundColor: "red",
      position: "topRight",
      timeout: 3000,
    });
    return;
  }

  page = 1;
  totalHits = 0;
  isLastPage = false;
  loadMoreBtn.style.display = "none";
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;
    maxPage = Math.ceil(totalHits / perPage);

    
    if (data.hits.length === 0 && page === 1) {
      iziToast.warning({
        title: "Нічого не знайдено!",
        message: "Спробуйте змінити параметри пошуку.",
        position: "topRight",
        timeout: 3000,
      });
      return updateGallery(postsList, "");
    }

    updateGallery(postsList, createMarkup(data.hits));
    refreshLightbox();


    if (page >= maxPage) {
      isLastPage = true;
      toggleLoadMoreBtn(loadMoreBtn, false);
      showEndMessage();
      return; 
    }

    toggleLoadMoreBtn(loadMoreBtn, true);
  } catch (error) {
    iziToast.error({
      title: "Помилка сервера!",
      message: "Змініть параметри пошуку.",
      position: "topRight",
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  if (isLastPage) {
    toggleLoadMoreBtn(loadMoreBtn, false);
    return;
  }

  page++;
  showLoader();
  toggleLoadMoreBtn(loadMoreBtn, false);

  try {
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0 || page >= maxPage) {
      isLastPage = true;
      toggleLoadMoreBtn(loadMoreBtn, false);
      showEndMessage();
      return;
    }

    updateGallery(postsList, createMarkup(data.hits), true);
    refreshLightbox();
    scrollToNextPage();

    if (data.hits.length < perPage || page >= maxPage) {
      isLastPage = true;
      toggleLoadMoreBtn(loadMoreBtn, false);
      showEndMessage();
    } else {
      toggleLoadMoreBtn(loadMoreBtn, true);
    }
  } catch (error) {
    iziToast.error({
      title: "Перелік вичерпано",
      message: "Не вдалося отримати додаткові результати.",
      position: "topRight",
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});
