import React from 'react';
import './index.css';
import { TagData } from '../../../../types';
import useTagSelected from '../../../../hooks/useTagSelected'; // Use custom hook

interface TagProps {
  t: TagData;
  clickTag: (tagName: string) => void;
}

const TagView = ({ t, clickTag }: TagProps) => {
  const { tag } = useTagSelected({ tagName: t.name });

  return (
    <div
      className='tagNode'
      onClick={() => {
        clickTag(t.name);
      }}>
      <div className='tagName'>{tag.name}</div>
      <div className='tagDescription'>{tag.description}</div>
      <div>{t.qcnt} questions</div>
    </div>
  );
};

export default TagView;
