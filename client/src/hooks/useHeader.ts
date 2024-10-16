import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface UseHeaderProps {
  initialSearch: string; // Initial search query string
  setQuestionPage: (query: string, title: string) => void; // Function to set the question page
}

interface UseHeaderReturn {
  searchQuery: string; // Current value of the search query
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void; // Handler for key down events
}

export default function useHeader({
  initialSearch,
  setQuestionPage,
}: UseHeaderProps): UseHeaderReturn {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch); // State for the search query

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update state with the input value
  };

  // Handle 'Enter' key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Check if the key pressed is 'Enter'
      e.preventDefault(); // Prevent the default action of the enter key
      setQuestionPage(searchQuery, 'Search Results'); // Call the function to set the question page
      setSearchQuery(''); // Clear the search input after submission
    }
  };

  return {
    searchQuery, // Return the current search query
    handleInputChange, // Return the input change handler
    handleKeyDown, // Return the key down handler
  };
}
