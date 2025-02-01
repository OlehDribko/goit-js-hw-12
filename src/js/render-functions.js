import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";


export function createMarkup(images) {
  return images
    .map(({ tags, webformatURL, likes, comments, views, downloads, largeImageURL }) => {
      return `
      <li class="card">
        <a href="${largeImageURL}" class="gallery-item">
          <img class="card-img" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="card-body">
          <ul class="card-value-list">
            <li class="card-value"><h3>Likes</h3><p>${likes}</p></li>
            <li class="card-value"><h3>Views</h3><p>${views}</p></li>
            <li class="card-value"><h3>Comments</h3><p>${comments}</p></li>
            <li class="card-value"><h3>Downloads</h3><p>${downloads}</p></li>
          </ul>
        </div>
      </li>`;
    })
    .join("");
}

export function updateGallery(container, markup, append = false) {
  if (!markup.trim()) {
    iziToast.warning({
      title: "Увага!",
      message: "Нічого не знайдено. Спробуйте інший запит.",
      position: "topRight",
      timeout: 3000,
    });
    return;
  }

  if (append) {
    container.insertAdjacentHTML("beforeend", markup);
  } else {
    container.innerHTML = markup;
  }
}

export function toggleLoadMoreBtn(button, show) {
  button.style.display = show ? "block" : "none";
}

export function scrollToNextPage() {
  const cardHeight = document.querySelector(".card")?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

export function showEndMessage() {
   iziToast.info({
    title: "Вибірка завершена",
    message: "Ви досягли кінця результатів пошуку.",
    position: "topRight",
    timeout: 4000,
  });
}

export function refreshLightbox() {
  const lightbox = new SimpleLightbox(".gallery-item", { captionsData: "alt", captionDelay: 250 });
  lightbox.refresh();
}
export const showLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.style.display = "block";
};

export const hideLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.style.display = "none";
};