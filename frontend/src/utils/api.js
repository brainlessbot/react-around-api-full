import {apiBaseUrl, apiAuthKey} from './constants';

class Api {
    /**
     * Initialize an Api instance.
     *
     * @constructor
     * @param {string} baseUrl
     * @param {string} authKey
     * @return {void}
     * @public
     */
    constructor(baseUrl, authKey) {
        this._baseUrl = baseUrl;
        this._authKey = authKey;
    }

    /**
     * Get all cards.
     *
     * @return {Promise}
     * @public
     */
    getAllCards() {
        return this._sendRequest('GET', '/cards');
    }

    /**
     * Add a new card.
     *
     * @param {string} name
     * @param {string} link
     * @return {Promise}
     * @public
     */
    addCard({name, link}) {
        return this._sendRequest('POST', '/cards', {
            body: JSON.stringify({name, link})
        });
    }

    /**
     * Delete a specific card.
     *
     * @param {string} id
     * @return {Promise}
     * @public
     */
    deleteCard(id) {
        return this._sendRequest('DELETE', '/cards/' + id);
    }

    /**
     * Like a specific card.
     *
     * @param {string} id
     * @return {Promise}
     * @public
     */
    likeCard(id) {
        return this._sendRequest('PUT', '/cards/likes/' + id);
    }

    /**
     * Dislike a specific card.
     *
     * @param {string} id
     * @return {Promise}
     * @public
     */
    dislikeCard(id) {
        return this._sendRequest('DELETE', '/cards/likes/' + id);
    }

    /**
     * Get user's information.
     *
     * @return {Promise}
     * @public
     */
    getUserInfo() {
        return this._sendRequest('GET', '/users/me');
    }

    /**
     * Update user's information.
     *
     * @param {string} name
     * @param {string} about
     * @return {Promise}
     * @public
     */
    updateUserInfo({name, about}) {
        return this._sendRequest('PATCH', '/users/me', {
            body: JSON.stringify({name, about})
        });
    }

    /**
     * Update user's avatar.
     *
     * @param {string} avatar
     * @return {Promise}
     * @public
     */
    updateUserAvatar({avatar}) {
        return this._sendRequest('PATCH', '/users/me/avatar', {
            body: JSON.stringify({avatar})
        });
    }

    /**
     * Handle sending the request to the server.
     *
     * @param {string} method
     * @param {string} targetUrl
     * @param {Object} options
     * @return {Promise}
     * @private
     */
    _sendRequest(method, targetUrl, options = {}) {
        return fetch(this._baseUrl + targetUrl, {
            method,
            headers: {
                'Authorization': this._authKey,
                'Content-Type': 'application/json'
            },
            ...options
        }).then(this._checkResponse);
    }

    /**
     * Handle checking the response from the server.
     *
     * @param {Promise} response
     * @return {Promise}
     * @private
     */
    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`An error occurred: ${response.status} ${response.statusText}`);
    }
}

export default new Api(apiBaseUrl, apiAuthKey);
