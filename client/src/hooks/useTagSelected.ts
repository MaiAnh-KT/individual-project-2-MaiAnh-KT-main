import { useEffect, useState } from 'react';
import { Tag } from '../types'; // Adjust import path as needed
import { getTagByName } from '../services/tagService'; // Adjust import path as needed

interface UseTagSelectedProps {
  tagName: string;
}

const useTagSelected = ({ tagName }: UseTagSelectedProps) => {
  const [tag, setTag] = useState<Tag>({
    name: '',
    description: '',
  });
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const res = await getTagByName(tagName);
        setTag(res || { name: 'Error', description: 'Error' });
      } catch (e) {
        // handle error
      }
    };
    fetchTag();
  }, [tagName]);
  return { tag };
};

export default useTagSelected;
