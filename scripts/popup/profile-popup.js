class PopupProfile extends Popup {
    constructor(element, userInfo, validation) {
        super(element, validation);

        this.userName = null;
        this.userAbout = null;
        this.userInfo = userInfo;

        this.open = this.open.bind(this);
        this.submit = this.submit.bind(this);
    }

    open() {
        this.render('[data-component="FormEditTemplate"]');
        this.addListener();

        this.userName = document.forms.edit.name;
        this.userAbout = document.forms.edit.job;

        this.userName.value = this.userInfo.name.textContent;
        this.userAbout.value = this.userInfo.about.textContent;
    }

    submit(event) {
        event.preventDefault();
        this.userInfo
            .updateUserInfo(this.userName.value, this.userAbout.value, event, this);
    }
}