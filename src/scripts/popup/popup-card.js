import Popup from './popup';

export default class PopupCard extends Popup {
    constructor(element, cardList, validation) {
        super(element, validation);

        this.cardList = cardList;

        this.submit = this.submit.bind(this);
        this.open = this.open.bind(this);
    }

    open() {
        this.render('[data-component="FormCardTemplate"]');
        this.addListener();
    }

    submit(event) {
        event.preventDefault();

		this.cardList.addCard({
            name: document.forms.new.title.value,
            link: document.forms.new.link.value
        }, event, this);
    }
}