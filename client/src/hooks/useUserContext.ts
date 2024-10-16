import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

/**
 * Custom hook that manages user context.
 *
 * @returns An object with the setUser function to update the user's context information.
 * @throws Will throw an error if the context is null.
 */
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }

  return context;
};

export default useUserContext;
