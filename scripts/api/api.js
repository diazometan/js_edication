
class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

        this.methods = {
            post: 'POST',
            get: 'GET',
            patch: 'PATCH',
            put: 'PUT',
            delete: 'DELETE'
        };
    }

    getResponseJson(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            method: this.methods.get,
            headers: this.headers
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    addNewCard(dto) {
        return fetch(this.baseUrl + '/cards', {
            method: this.methods.post,
            headers: this.headers,
            body: JSON.stringify(dto)
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    likeCard(cardId) {
        return fetch(this.baseUrl + `/cards/like/${cardId}`, {
            method: this.methods.put,
            headers: this.headers
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    unlikeCard(cardId) {
        return fetch(this.baseUrl + `/cards/like/${cardId}`, {
            method: this.methods.delete,
            headers: this.headers
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}`, {
            method: this.methods.delete,
            headers: this.headers
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {
            method: this.methods.get,
            headers: this.headers
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    editUserInfo(dto) {
        return fetch(this.baseUrl + '/users/me', {
            method: this.methods.patch,
            headers: this.headers,
            body: JSON.stringify(dto)
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }

    editUserAvatar(dto) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: this.methods.patch,
            headers: this.headers,
            body: JSON.stringify(dto)
        })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
            console.log(err);
            throw err;
        });
    }
}