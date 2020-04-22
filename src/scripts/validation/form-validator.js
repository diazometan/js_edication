import {errors} from './error-words-const';

export default class FormValidator {
    constructor() {
        this.fieldTypes = {
            TEXT: 'text',
            LINK: 'url'
        };

        this.errors = errors;
        this.setEventListeners = this.setEventListeners.bind(this);
        this._inputHandler = this._inputHandler.bind(this);
    }

    setEventListeners(event) {
        const popupForm = event.target.closest('.popup__form');

        this._inputHandler(event);
        if (this._checkFormValid(popupForm)) {
            popupForm.elements.button.removeAttribute('disabled');
            popupForm.elements.button.classList.remove('popup__button_disabled');
        } else {
            popupForm.elements.button.setAttribute('disabled', true);
            popupForm.elements.button.classList.add('popup__button_disabled');
        }
    }


    _inputHandler(event) {
        if (event.target.validity.valueMissing) {
            event.target.nextElementSibling.textContent = this.errors.isRequired;
        } else if (
            event.target.type !== this.fieldTypes.LINK &&
            (event.target.value.length > 30 || event.target.validity.tooShort)
        ) {
            event.target.nextElementSibling.textContent = this.errors.validationLenght;
        } else if (
            event.target.type === this.fieldTypes.LINK &&
            event.target.validity.typeMismatch
        ) {
            event.target.nextElementSibling.textContent = this.errors.validationLink;
        } else {
            event.target.nextElementSibling.textContent = '';
        }
    }

    _checkFormValid(form) {
        return form.checkValidity();
    }

}