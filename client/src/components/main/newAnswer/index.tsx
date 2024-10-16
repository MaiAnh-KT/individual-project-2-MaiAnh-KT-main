import React from 'react';
import Form from '../baseComponents/form';
import TextArea from '../baseComponents/textarea';
import useAnswerForm from '../../../hooks/useAnswerForm'; // Adjust path if necessary

interface NewAnswerProps {
  qid: string;
  handleAnswer: (qid: string) => void;
}

const NewAnswer: React.FC<NewAnswerProps> = ({ qid, handleAnswer }) => {
  const { text, textErr, isSubmitting, handleChange, postAnswer } = useAnswerForm({
    qid,
    handleAnswer,
  });

  return (
    <Form>
      <TextArea
        title='Answer Text'
        id='answerTextInput'
        val={text}
        setState={handleChange} // No need for extra wrapper now
        err={textErr}
      />
      <div className='btn_indicator_container'>
        <button className='form_postBtn' onClick={postAnswer} disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Answer'}
        </button>
        <div className='mandatory_indicator'>* indicates mandatory fields</div>
      </div>
    </Form>
  );
};

export default NewAnswer;
