import {baseUrl} from './constants';

class Api {
    /**
     * Initialize an Api instance.
     *
     * @constructor
     * @param {string} baseUrl
     * @return {void}
     * @public
     */
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._authToken = undefined;
    }

    /**
     * Register a new user.
     *
     * @param {string} email
     * @param {string} password
     * @return {Promise}
     * @public
     */
    register({email, password}) {
        return this._sendRequest('POST', '/signup', {
            body: JSON.stringify({email, password})
        });
    }

    /**
     * Login an existing user.
     *
     * @param {string} email
     * @param {string} password
     * @return {Promise}
     * @public
     */
    login({email, password}) {
        return this._sendRequest('POST', '/signin', {
            body: JSON.stringify({email, password})
        }).then((response) => {
            this._setAuthToken(response.token);
            this._setJwtToken(response.token);
            return response;
        });
    }

    /**
     * Logout a user.
     *
     * @return {void}
     * @public
     */
    logout() {
        this._removeJwtToken();
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
        return this._sendRequest('PUT', '/cards/' + id + '/likes');
    }

    /**
     * Dislike a specific card.
     *
     * @param {string} id
     * @return {Promise}
     * @public
     */
    dislikeCard(id) {
        return this._sendRequest('DELETE', '/cards/' + id + '/likes');
    }

    /**
     * Get user's information by token.
     *
     * @param {string} token
     * @return {Promise}
     * @public
     */
    getUserInfo(token) {
        this._setAuthToken(token);
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
                'Authorization': this._authToken,
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

    /**
     * Set user's auth token.
     *
     * @param {string} token
     * @return {void}
     * @private
     */
    _setAuthToken(token) {
        this._authToken = `Bearer ${token}`;
    }

    /**
     * Save user's token in local storage.
     *
     * @param {string} token
     * @return {Promise}
     * @private
     */
    _setJwtToken(token) {
        localStorage.setItem('jwt', token);
    }

    /**
     * Remove user's token from local storage.
     *
     * @return {void}
     * @private
     */
    _removeJwtToken() {
        localStorage.removeItem('jwt');
    }
}

export default new Api(baseUrl);
