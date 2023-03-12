// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const makeGalleryCard = ({ preview,
  original, description }) => `<a
        class="gallery__item"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>`;

const markup = galleryItems.map(el => makeGalleryCard(el)).join('');

const list = document.querySelector('.gallery');

list.insertAdjacentHTML("afterbegin", markup); 

new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
    captionDelay: 250,
 });