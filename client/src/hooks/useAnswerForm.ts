import { useState, useContext } from 'react';
import { Answer } from '../types';
import { validateHyperlink } from '../tool';
import addAnswer from '../services/answerService';
import UserContext from '../contexts/UserContext';

interface UseAnswerFormProps {
  qid: string;
  handleAnswer: (qid: string) => void;
}

interface UseAnswerFormReturn {
  text: string;
  textErr: string;
  isSubmitting: boolean;
  handleChange: (value: string) => void; // Updated to take a string
  postAnswer: () => Promise<void>;
}

export default function useAnswerForm({
  qid,
  handleAnswer,
}: UseAnswerFormProps): UseAnswerFormReturn {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { user } = context;

  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setText(value);
    setTextErr(''); // Clear error on input change
  };

  const validate = (): boolean => {
    if (!text.trim()) {
      setTextErr('Answer text cannot be empty.');
      return false;
    }
    if (!validateHyperlink(text)) {
      setTextErr('Invalid hyperlink format.');
      return false;
    }
    return true;
  };

  const postAnswer = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const answer: Answer = {
        text,
        ansBy: user.username,
        ansDateTime: new Date(),
        comments: [],
      };

      const res = await addAnswer(qid, answer);
      if (res && res._id) {
        handleAnswer(qid); // Trigger the callback on success
      }
    } catch (err) {
      setTextErr('Failed to submit the answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    text,
    textErr,
    isSubmitting,
    handleChange, // Now returns a string-based handler
    postAnswer,
  };
}
