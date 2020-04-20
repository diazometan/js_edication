import "../style.css";
import {config} from './config/config';
import Card from './card/card';
import CardList from './card/card-list';
import Api from './api/api';
import UserInfo from './user/user-info';
import FormValidator from './validation/form-validator';
import PopupCard from './popup/popup-card';
import PopupAvatar from './popup/popup-avatar';
import PopupProfile from './popup/profile-popup';
import PopupImage from './popup/popup-image';

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
    baseUrl: config.url,
    headers: {
        authorization: config.token,
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(api);
const validation = new FormValidator();

const cardFactory = (cardInfo, api, cardTemplate) => new Card(cardInfo, api, cardTemplate);

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
    .catch(() => {
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
