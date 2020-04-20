
class Card {
	constructor(cardInfo, api, cardTemplate) {
		this.api = api;
		this.cardInfo = cardInfo;

		this.textError = 'Что-то пошло не так... Попробуйте еще раз';

		this.cardTemplate = cardTemplate;

		this.like = this.like.bind(this);
		this.remove = this.remove.bind(this);
		this.create = this.create.bind(this);
		this.remove = this.remove.bind(this);

		this._addEventListener = this._addEventListener.bind(this);
		this._removeEventListener = this._removeEventListener.bind(this);
	}

	create(currentUserId) {
		this.element = this.cardTemplate.content.cloneNode(true).querySelector('.place-card');
		const cardElemImage = this.element.querySelector('.place-card__image');
		cardElemImage.setAttribute('style', `background-image: url(${this.cardInfo.link})`);

		const cardElemDescription = this.element.querySelector('.place-card__name');
		cardElemDescription.textContent = this.cardInfo.name;

		const cardElemLikeCounter = this.element.querySelector('.place-card__like-counter');
		cardElemLikeCounter.textContent = this.cardInfo.likeCount;

		if (currentUserId == this.cardInfo.ownerId) {
			const deleteButton = this.element.querySelector('.place-card__delete-icon');
			deleteButton.style.display = 'block';
		}

		if (this.cardInfo.isLiked) {
			const likeButton = this.element.querySelector('.place-card__like-icon');
			likeButton.classList.add('place-card__like-icon_liked');
		}

		this._addEventListener()

		return this.element;
	}

	like(event) {
		if (event.target.classList.contains('place-card__like-icon') && this.cardInfo.isLiked) {
			this.api.unlikeCard(this.cardInfo.id)
				.then(dto => {
					this.cardInfo.isLiked = !this.cardInfo.isLiked;
					event.target.classList.remove('place-card__like-icon_liked');
					event.target.nextElementSibling.textContent = dto.likes.length;
				});
		}
		else if (event.target.classList.contains('place-card__like-icon') && !this.cardInfo.isLiked) {
			this.api.likeCard(this.cardInfo.id)
				.then(dto => {
					this.cardInfo.isLiked = !this.cardInfo.isLiked;
					event.target.classList.add('place-card__like-icon_liked');
					event.target.nextElementSibling.textContent = dto.likes.length;
				})
				.catch(() => {
					alert(this.textError);
				});
		}
	}

	remove(event) {
		if (event.target.classList.contains('place-card__delete-icon')) {
			if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
				this.api.deleteCard(this.cardInfo.id)
					.then(() => {
						this._removeEventListener();
						this.element.remove();
					})
					.catch(() => {
						alert(this.textError);
					});
			}
		}
	}

	_addEventListener() {
		this.element.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
		this.element.querySelector('.place-card__like-icon').addEventListener('click', this.like);
	}

	_removeEventListener() {
		this.element.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
		this.element.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
	}
}
