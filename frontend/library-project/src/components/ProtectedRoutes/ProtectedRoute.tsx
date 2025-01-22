import React, { useState } from 'react';
import { useUser } from '../../globalData/UserContext';
import LoginModal from '../Header/LoginModal';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { loggedInUser } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!loggedInUser) {
    return (
      <>
        {showLoginModal || (
          <div>
            <p>You must log in to access this feature.</p>
            <button onClick={() => setShowLoginModal(true)}>Log In</button>
          </div>
        )}
        {showLoginModal && <LoginModal open={true} onClose={() => setShowLoginModal(false)} />}
      </>
    );
  }

  // Render the protected component if logged in
  return element;
};

export default ProtectedRoute;
