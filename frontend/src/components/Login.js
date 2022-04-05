import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Represent the login page.
 *
 * @constructor
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const Login = ({onFormSubmit}) => {
    // Initialize input states
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');

    // Input-change event handlers
    const handleEmailInputChange = (event) => setEmailInput(event.target.value);
    const handlePasswordInputChange = (event) => setPasswordInput(event.target.value);

    // Handle the submission of the form
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFormSubmit({
            email: emailInput,
            password: passwordInput
        });
    };

    return (
        <main className="auth-page page__content">
            <h1 className="auth-page__title">Log in</h1>

            <form className="auth-page__form" onSubmit={handleFormSubmit}>
                <input
                    value={emailInput}
                    onChange={handleEmailInputChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="auth-page__form-field"
                    autoComplete="off"
                    required
                />

                <input
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="auth-page__form-field"
                    autoComplete="off"
                    required
                />

                <button type="submit" className="auth-page__submit-button">
                    Log in
                </button>
            </form>

            <Link to="/signup" className="auth-page__link">
                Not a member yet? Sign up here!
            </Link>
        </main>
    );
};

export default Login;
