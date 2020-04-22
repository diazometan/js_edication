import Popup from './popup';

export default class PopupAvatar extends Popup {
    constructor(element, validation, userInfo) {
        super(element, validation);

        this.userInfo = userInfo;

        this.submit = this.submit.bind(this);
        this.open = this.open.bind(this);
    }

    open() {
        this.render('[data-component="FormAvatarEditTemplate"]');
        this.addListener();
    }

    submit(event) {
        event.preventDefault();
        this.userInfo
            .updateAvatar(document.forms.avatar.link.value, event, this)
    }
}