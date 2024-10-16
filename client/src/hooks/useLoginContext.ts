import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

/**
 * Custom hook that manages user login context.
 *
 * @returns An object with the setUser function to update the user's context information.
 * @throws Will throw an error if the context is null.
 */
const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error('User context is null.');
  }

  return context;
};

export default useLoginContext;
