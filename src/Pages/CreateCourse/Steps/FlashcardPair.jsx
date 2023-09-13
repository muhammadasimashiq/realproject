import React from "react";
import TextEditor from "./../../../Components/UI/TextEditor/TextEditor";
import api from "./../../../services";
import Stack from "./../../../Components/UI/Layout/Stack/Stack";
import Tabs from "./../../../Components/UI/Tabs/Tabs";
import ButtonComp from "../../../Components/UI/Button/Button";
import { ErrorMessage } from "./FlashcardPair.style";

// configures question answer labels only (static)
const valuePair = [
  { value: "question", label: "Front" },
  { value: "answer", label: "Back" },
];

const FlashcardPair = ({
  selected,
  sideEffects,
  answerIsEmptyError,
  questionIsEmptyError,
  resetTrigger,
  error,
}) => {
  // question answer states
  const [question, setQuestion] = React.useState({});
  const [answer, setAnswer] = React.useState({});
  const [touched, setTouched] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [length, setLength] = React.useState(1);

  // update question
  const questionHandler = (data) => {
    setQuestion(data);
  };

  // update answer
  const answerHandler = (data) => {
    setAnswer(data);
  };

  // listens to input change and then updates state according to the type of input
  const getHandler = (data, type) => {
    switch (type) {
      case "question":
        questionHandler(data);
        break;
      case "answer":
        answerHandler(data);
        break;
    }
  };

  // configures props for text editor. Callback function is to point to the external handling of the state
  const buildTextEditorProps = (value, label, callbackFunc) => ({
    getContent: (e) => callbackFunc(e, value),
    placeholder: label,
    includeSendBtn: false,
    resetTrigger,
    isContentEmpty: (e) => setIsEmpty(e),
    getLengthOfContent: (e) => setLength(e),
    edit: true,
    flashcard: true,
  });

  // builds tabs for question and answers taken from the static array above this component
  const buildTabs = (arr, handleGetCallback) => [
    ...arr.map(({ value, label }) => ({
      value,
      label,
      content: (
        <>
          <TextEditor
            {...buildTextEditorProps(value, label, handleGetCallback)}
          />
        </>
      ),
    })),
  ];

  // builds error message
  const buildErrorMessage = React.useCallback((question, answer) => {
    if (question && !answer) {
      return setErrorMessage("Front is compulsory!");
    }
    if (answer && !question) {
      return setErrorMessage("Back is compulsory!");
    }
    if (question && answer) {
      return setErrorMessage("Front and Back both are compulsory!");
    } else return setErrorMessage("");
  }, []);

  // error message should re render everytime the error changes
  React.useEffect(() => {
    buildErrorMessage(questionIsEmptyError, answerIsEmptyError);
  }, [questionIsEmptyError, answerIsEmptyError, buildErrorMessage]);

  return (
    <Stack>
      <Tabs tabs={buildTabs(valuePair, getHandler)} />
      {touched && error.value && <ErrorMessage>{error.message}</ErrorMessage>}
      <ButtonComp
        onClick={(e) => {
          e.preventDefault();
          setTouched(true);
          sideEffects({
            props: { selected },
            data: { question, answer },
            isEmpty: length === 1,
          });
        }}
      >
        Add Flashcard Pair
      </ButtonComp>
    </Stack>
  );
};

export default FlashcardPair;
