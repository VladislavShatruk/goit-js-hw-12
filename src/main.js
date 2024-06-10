'use strict';

import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  showError,
  clearGallery,
  showLoader,
  hideLoader,
  refreshLightbox,
  showLoaderBtn,
  hideLoaderBtn,
  smoothScrollToNextGroup,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-img-input');
const loadmoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadmoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  query = searchInput.value.trim();
  page = 1;

  if (!query) {
    showError('Please enter a search term');
    return;
  }

  clearGallery();
  hideLoaderBtn();
  showLoader();

  try {
    const { hits, totalHits: total } = await fetchImages(query, page);
    hideLoader();
    totalHits = total;

    if (hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(hits);

      if (hits.length < 15 || total <= page * 15) {
        hideLoaderBtn();
        showEndMessage();
      } else {
        showLoaderBtn();
      }
    }
  } catch (error) {
    hideLoader();
    showError('An error occured while fetching images');
    console.error(error);
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();

  try {
    const { hits } = await fetchImages(query, page);
    hideLoader();
    renderImages(hits, true);
    refreshLightbox();
    smoothScrollToNextGroup();

    if (hits.length < 15 || totalHits <= page * 15) {
      hideLoaderBtn();
      showError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    showError('An error occured while fetching more images');
    console.error(error);
  }
}