import PopupTemplate from './PopupTemplate';
import successIconPath from '../images/icon-success.svg';
import errorIconPath from '../images/icon-error.svg';

/**
 * Represent a info tooltip popup.
 *
 * @constructor
 * @param {boolean} isSuccessful
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @return {JSX.Element}
 */
const InfoTooltip = ({isSuccessful, isOpen, onCloseClick}) => {
    return (
        <PopupTemplate
            contentType="text"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
        >
            <img
                src={isSuccessful ? successIconPath : errorIconPath}
                alt={isSuccessful ? 'Success' : 'Error'}
                className="popup__icon"
            />

            <h2 className="popup__title popup__title_bottom">
                {isSuccessful
                    ? 'Success! You have now been registered.'
                    : 'Oops, something went wrong! Please try again.'}
            </h2>
        </PopupTemplate>
    );
};

export default InfoTooltip;
