'use strict';

import axios from 'axios';

const API_KEY = '43967749-ce2f7a1bd8d115ad659da346f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}