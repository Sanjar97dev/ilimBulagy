import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/Firebase';

const AuthDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        navigate('/chats'); // Forward to chats if authenticated
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <h2>Welcome, {user.email}</h2>
      ) : (
        <p>No user is signed in</p>
      )}
    </div>
  );
};

export default AuthDetails;
