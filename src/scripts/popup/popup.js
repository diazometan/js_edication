// абстрактный класс
export default class Popup {
	constructor(element, validation) {
		this.element = element;
		this.validation = validation;

		this.close = this.close.bind(this);
		this._clickOutsidePopup = this._clickOutsidePopup.bind(this);
	}

	addListener() {
		this.element.querySelector('.popup__close').addEventListener('click', this.close);
		this.element.addEventListener('mousedown', this._clickOutsidePopup);

		this.element.addEventListener('submit', this.submit);
		this.element.addEventListener('input', this.validation.setEventListeners);
	}

	render(template) {
		const formPopup = document.querySelector(template).content.cloneNode(true);
		this.element.querySelector('.popupTemplate').appendChild(formPopup);
		this.element.classList.add('popup_is-opened');

		this.element.focus();
	}

	submitRender(event) {
		event.target.lastElementChild.textContent = '';
		event.target.elements.button.textContent = 'Загрузка...';
	}

	close() {
		if (this.element.querySelector('.popup__content_image')) {
			this.element.querySelector('.popup__content_image').classList.add('popup__content');
			this.element.querySelector('.popup__content_image').classList.remove('popup__content_image')
		}

		const container = this.element.querySelector('.popupTemplate');
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		this._removeListener();
		this.element.classList.remove('popup_is-opened');
	}

	_removeListener() {
		this.element.removeEventListener('mousedown', this._clickOutsidePopup);
		this.element.querySelector('.popup__close').removeEventListener('click', this.close);

		this.element.removeEventListener('submit', this.submit);
	}

	_clickOutsidePopup(event) {
		if (!(event.target).closest('.popup__content')
			&& !(event.target).closest('.popup__content_image')) {
			this.close();
		}
	}
}
