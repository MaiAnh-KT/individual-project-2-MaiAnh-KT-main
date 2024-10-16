/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import HomePageClass from '../components/main/routing/home';
import NewAnswerPageClass from '../components/main/routing/newAnswer';
import NewQuestionPageClass from '../components/main/routing/newQuestion';
import AnswerPageClass from '../components/main/routing/answer';
import TagPageClass from '../components/main/routing/tag';
import { OrderType } from '../types';

/**
 * Hook that encapsulates the logic for managing page instances and interactions in the Main component.
 *
 * @param search - The search query string.
 * @param title - The title of the main page.
 * @param setQuestionPage - Function to update the current question page.
 * @returns Page instance and handler functions for various page actions.
 */
const useMainPage = (
  search: string,
  title: string,
  setQuestionPage: (search?: string, title?: string) => void,
) => {
  const [questionOrder, setQuestionOrder] = useState<OrderType>('newest');
  const [qid, setQid] = useState<string>('');

  const handleQuestions = () => {
    setQuestionPage();
    setPageInstance(
      new HomePageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleTags = () => {
    setPageInstance(
      new TagPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleAnswer = (questionID: string) => {
    setQid(questionID);
    setPageInstance(
      new AnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid: questionID,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const clickTag = (tname: string) => {
    setQuestionPage(`[${tname}]`, tname);
    setPageInstance(
      new HomePageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewQuestion = () => {
    setPageInstance(
      new NewQuestionPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewAnswer = () => {
    setPageInstance(
      new NewAnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const [pageInstance, setPageInstance] = useState(
    new HomePageClass({
      search,
      title,
      setQuestionPage,
      questionOrder,
      setQuestionOrder,
      qid,
      handleQuestions,
      handleTags,
      handleAnswer,
      clickTag,
      handleNewQuestion,
      handleNewAnswer,
    }),
  );

  pageInstance.search = search;
  pageInstance.questionOrder = questionOrder;
  pageInstance.qid = qid;

  return {
    pageInstance,
    handleQuestions,
    handleTags,
    handleAnswer,
    clickTag,
    handleNewQuestion,
    handleNewAnswer,
  };
};

export default useMainPage;
