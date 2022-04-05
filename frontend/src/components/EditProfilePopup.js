import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

/**
 * Represent profile edit info popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const EditProfilePopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    // Subscribe to logged-in user context
    const userData = React.useContext(CurrentUserContext);

    // Initialize input states
    const [nameInput, setNameInput] = React.useState('');
    const [aboutInput, setAboutInput] = React.useState('');

    // Initialize processing state
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Input-change event handlers
    const handleNameInputChange = (event) => setNameInput(event.target.value);
    const handleAboutInputChange = (event) => setAboutInput(event.target.value);

    // Handle the submission of the form
    const handleFormSubmit = () => {
        setIsProcessing(true);
        onFormSubmit({
            name: nameInput,
            about: aboutInput
        }, () => setIsProcessing(false));
    };

    // Reset the form when the context is updated
    React.useEffect(() => {
        // Make sure that we already received a response from the api
        if (Object.keys(userData).length) {
            setNameInput(userData.name);
            setAboutInput(userData.about);
        }
    }, [userData]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={handleFormSubmit}
            formSettings={{
                id: 'profile-edit-info',
                title: 'Edit Profile',
                submitButton: 'Save'
            }}
            isProcessing={isProcessing}
        >
            <input
                value={nameInput}
                onChange={handleNameInputChange}
                name="name"
                type="text"
                placeholder="Name"
                className="popup__form-field"
                minLength={2}
                maxLength={40}
                autoComplete="off"
                required
            />

            <input
                value={aboutInput}
                onChange={handleAboutInputChange}
                name="about"
                type="text"
                placeholder="About"
                className="popup__form-field"
                minLength={2}
                maxLength={200}
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default EditProfilePopup;
