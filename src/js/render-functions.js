'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
const loader = document.getElementById('loader');
const gallery = document.querySelector('.gallery');
const loadmoreBtn = document.querySelector('.load-more');

export function renderImages(images, append = false) {
  const imageMarkup = images
    .map(
      img => `<li class="gallery-item">
      <a class="gallery-link" href="${img.webformatURL}">
        <img 
          class="gallery-image" 
          width="360"
          src="${img.largeImageURL}" 
          alt="${img.tags}" 
          />
          
      </a>
      <ul class='description'>
      <li><strong>Likes</strong> ${img.likes}</li>
      <li><strong>Views</strong> ${img.views}</li>
      <li><strong>Comments</strong> ${img.comments}</li>
      <li><strong>Downloads</strong> ${img.downloads}</li>
      </ul>
    </li>`
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', imageMarkup);
  } else {
    gallery.innerHTML = imageMarkup;
  }

  initializeLightbox();
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function showLoader() {
  loader.style.display = 'block';
  loadmoreBtn.insertAdjacentElement('afterend', loader);
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function clearGallery() {
  gallery.innerHTML = '';
}

function initializeLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new simpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}

export function showLoaderBtn() {
  loadmoreBtn.style.display = 'block';
}

export function hideLoaderBtn() {
  loadmoreBtn.style.display = 'none';
}

export function smoothScrollToNextGroup() {
  const galleryItemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}