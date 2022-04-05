/**
 * Represent the profile-info section.
 *
 * @constructor
 * @param {Object} userData
 * @param {Function} onAddCardClick
 * @param {Function} onEditInfoClick
 * @param {Function} onEditAvatarClick
 * @return {JSX.Element}
 */
const ProfileInfo = ({userData, onAddCardClick, onEditInfoClick, onEditAvatarClick}) => {
    return (
        <section className="profile-info content__profile-info">
            <div
                title="Edit avatar"
                className="profile-info__avatar-container"
                onClick={onEditAvatarClick}
            >
                <img
                    src={userData.avatar}
                    alt={userData.name + '\'s avatar'}
                    className="profile-info__avatar-element"
                />

                <div className="profile-info__avatar-overlay"/>
            </div>

            <div className="profile-info__info-container">
                <div className="profile-info__title-container">
                    <h1 className="profile-info__title-text">{userData.name}</h1>

                    <button
                        type="button"
                        title="Edit info"
                        className="profile-info__edit-button"
                        onClick={onEditInfoClick}
                    />
                </div>

                <p className="profile-info__subtitle">{userData.about}</p>
            </div>

            <button
                type="button"
                title="Add card"
                className="profile-info__add-button"
                onClick={onAddCardClick}
            />
        </section>
    );
};

export default ProfileInfo;
