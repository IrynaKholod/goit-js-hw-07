// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. 
// Посмотри демо видео работы галереи.
// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь 
// в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна
// с изображением из примеров библиотеки basicLightbox.
// Разметка элемента галереи



import { galleryItems } from './gallery-items.js';

const renderList = (pictures) =>
pictures.reduce(
    (acc, { preview, original, description }) => acc + `<div class = "gallery__item">
     <a class = "gallery__link"  href = "${original}">
        <img
               class = "gallery__image"
               src = "${preview}"
               data-source = "${original}"
            alt = "${description}"
        />
    </a>
     </div>`, "");


const divEl = document.querySelector(".gallery");
divEl.insertAdjacentHTML("beforeend", renderList(galleryItems));


const galleryEl = document.querySelector(".gallery");
let instance;
galleryEl.addEventListener('click', (e) => {
    e.preventDefault(); 
    if (e.target.nodeName !== 'IMG') return;
    const srcTarget = e.target.dataset.source;

    instance = basicLightbox.create(
           `<img src="${srcTarget}" width="800" height="600">`
          );
        
    instance.show();
  
    document.addEventListener("keydown", onEscapeClick);  
});

function onEscapeClick(e) {
    if (e.code == "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscapeClick);
    }
  }