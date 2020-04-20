// errors - file error-words-const.js

// Токен: e61fe8d2-a8b7-469e-9421-cb2c95a5cb26
// Идентификатор группы: cohort9

const container = document.querySelector('.places-list');
const errorBlock = document.querySelector('.error-block');
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');

const cardTemplate = document.querySelector('[data-component="CardTemplate"]');

const addCardButton = document.querySelector('#add');
const editUserInfoButton = document.querySelector('#edit');
const refreshButton = document.querySelector('#refresh');
const editUserAvatar = document.querySelector('#avatar');

const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort9',
    headers: {
        authorization: 'e61fe8d2-a8b7-469e-9421-cb2c95a5cb26',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(api);
const validation = new FormValidator(errors);

const cardFactory = (cardInfo, api, cardTemplate) => new Card(cardInfo, api, cardTemplate);

// Сделал так, потому что хочу получить id текущего юзера и потом использовать его для проверки,
// является ли он владельцем карточки.
userInfo.getUserInfo()
    .then(id => {
        const cardList = new CardList(container, cardFactory, api, id, cardTemplate)
        cardList.render();
        return cardList;
    })
    .then(container => {
        const popupCard = new PopupCard(popup, container, validation);
        addCardButton.addEventListener('click', popupCard.open);

        profile.style.display = 'flex'; 
    })
    .catch(err => {
        console.log(err);
        errorBlock.style.display = 'flex';

        refreshButton.addEventListener('click', () => {
            document.location.reload(true);
        })
    });


const popupImage = new PopupImage(popup);
container.addEventListener('click', popupImage.open);

const popupProfile = new PopupProfile(popup, userInfo, validation);
editUserInfoButton.addEventListener('click', popupProfile.open);

const popupAvatar = new PopupAvatar(popup, validation, userInfo);
editUserAvatar.addEventListener('click', popupAvatar.open);
