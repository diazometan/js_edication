
class CardList {
    constructor(container, cardFactory, api, currentUserId, cardTemplate) {
        this.container = container;
        this.cardFactory = cardFactory;
        this.api = api;
        this.currentUserId = currentUserId;
        this.cardTemplate = cardTemplate;

        this.addCard = this.addCard.bind(this);
        this.render = this.render.bind(this);
    }

    addCard(newCard, event, popupCard) {
        popupCard.submitRender(event);
        this.api.addNewCard(newCard)
            .then(dto => {
                const cardInfo = new CardInfo(dto._id, dto.name, dto.link, dto.owner._id, false, dto.likes.length);
                const card = this.cardFactory(cardInfo, this.api, this.cardTemplate)
                this.container.appendChild(card.create(this.currentUserId));

                document.forms.new.reset();
                popupCard.close();
            })
            .catch(() => {
                event.target.lastElementChild.textContent = this.textError;
            })
            .finally(() => {
                event.target.elements.button.textContent = '+';
            });
    }

    render() {
        this.api.getInitialCards()
            .then(cards => {
                    cards.forEach(item => {

                        let isLiked = false;
                        item.likes.forEach(user => {
                            if (user._id === this.currentUserId) {
                                isLiked = true;
                                return;
                            }
                        })
                        const cardInfo = new CardInfo(item._id, item.name, item.link, item.owner._id, isLiked, item.likes.length);
                        const card = this.cardFactory(cardInfo, this.api, this.cardTemplate)
                        this.container.appendChild(card.create(this.currentUserId));
                    })
                });
    }
}