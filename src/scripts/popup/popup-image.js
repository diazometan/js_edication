import Popup from './popup';

export default class PopupImage extends Popup {
    constructor(element) {
        super(element);

        this.open = this.open.bind(this);
    }

    open(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.render('[data-component="ImageTemplate"]');

            const popupContent = this.element.querySelector('.popup__content');
            popupContent.classList.add('popup__content_image');
            popupContent.classList.remove('popup__content');

            this.element.querySelector('.popup__image')
                .setAttribute('src', event.target.style.backgroundImage.slice(5, -2));

            this.element.querySelector('.popup__close').addEventListener('click', this.close);
            this.element.addEventListener('mousedown', this._clickOutsidePopup);
        }
    }
}