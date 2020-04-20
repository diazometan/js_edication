export default class UserInfo {
    constructor(api) {
        this.id = null;
        this.name = document.querySelector('.user-info__name');
        this.about = document.querySelector('.user-info__job');
        this.avatar = document.querySelector('.user-info__photo');
        this.api = api;

        this.textError = 'Что-то пошло не так... Попробуйте еще раз';

        this.updateAvatar = this.updateAvatar.bind(this);
    }

    getUserInfo() {
        return this.api.getUserInfo()
            .then(dto => {
                this.id = dto._id;
                this.name.textContent = dto.name;
                this.about.textContent = dto.about;
                this.avatar.style.backgroundImage = `url(${dto.avatar})`;

                return this.id;
            });
    }

    updateUserInfo(newName, newJob, event, popupProfile) {
        popupProfile.submitRender(event);
        this.api.editUserInfo({ name: newName, about: newJob })
            .then(dto => {
                this.name.textContent = dto.name;
                this.about.textContent = dto.about;

                popupProfile.close();
            })
            .catch(() => {
                event.target.lastElementChild.textContent = this.textError;
            })
            .finally(() => {
                event.target.elements.button.textContent = 'Сохранить';
            });
    }

    updateAvatar(newAvatar, event, avatarProfile) {
        avatarProfile.submitRender(event);
        this.api.editUserAvatar({ avatar: newAvatar })
            .then(dto => {
                this.avatar.style.backgroundImage = `url(${dto.avatar})`;

                document.forms.avatar.reset();
                avatarProfile.close();
            })
            .catch(() => {
                event.target.lastElementChild.textContent = this.textError;
            })
            .finally(() => {
                event.target.elements.button.textContent = 'Сохранить';
            });
    }
}