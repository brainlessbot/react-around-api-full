import {Redirect, Route} from 'react-router-dom';

/**
 * Represent a route only accessible to logged-in users.
 *
 * @constructor
 * @param {boolean} isLoggedIn
 * @param {JSX.Element[]} children
 * @param {Object} options
 * @return {JSX.Element}
 */
const ProtectedRoute = ({isLoggedIn, children, ...options}) => {
    return (
        <Route {...options}>
            {isLoggedIn ? children : (
                <Redirect to="/signin" />
            )}
        </Route>
    );
};

export default ProtectedRoute;
