import {authBaseUrl} from './constants';

class Auth {
    /**
     * Initialize an Auth instance.
     *
     * @constructor
     * @param {string} baseUrl
     * @return {void}
     * @public
     */
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    /**
     * Get user's information by its token.
     *
     * @param {string} token
     * @return {Promise}
     * @public
     */
    checkToken(token) {
        return this._sendRequest('GET', '/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: options.body
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

export default new Auth(authBaseUrl);
