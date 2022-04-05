import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {combineClasses} from '../utils/helpers';

/**
 * Represent a card element.
 *
 * @constructor
 * @param {Object} cardData
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @return {JSX.Element}
 */
const Card = ({cardData, onCardImageClick, onCardLikeClick, onCardRemoveClick}) => {
    // Subscribe to logged-in user context
    const userData = React.useContext(CurrentUserContext);

    // Represent whether the current user is the owner of the card
    const isOwner = cardData.owner._id === userData._id;

    // Represent whether the current user has liked the card
    const isLiked = cardData.likes.some((likingUser) => likingUser._id === userData._id);

    // Event handlers
    const handleCardImageClick = () => onCardImageClick(cardData);
    const handleCardLikeClick = () => onCardLikeClick(cardData, isLiked);
    const handleCardRemoveClick = () => onCardRemoveClick(cardData);

    return (
        <li className="card">
            <div className="card__image-container">
                <img
                    src={cardData.link}
                    alt={cardData.name}
                    className="card__image-element"
                    onClick={handleCardImageClick}
                />

                {isOwner && (
                    <button
                        type="button"
                        title="Remove"
                        className="card__remove-button"
                        onClick={handleCardRemoveClick}
                    />
                )}
            </div>

            <div className="card__details-container">
                <h2 className="card__title">{cardData.name}</h2>

                <div className="card__like-container">
                    <button
                        type="button"
                        title={isLiked ? 'Dislike' : 'Like'}
                        className={combineClasses(
                            'card__like-button',
                            isLiked && 'card__like-button_active'
                        )}
                        onClick={handleCardLikeClick}
                    />

                    <div className="card__like-counter">{cardData.likes.length}</div>
                </div>
            </div>
        </li>
    );
};

export default Card;
