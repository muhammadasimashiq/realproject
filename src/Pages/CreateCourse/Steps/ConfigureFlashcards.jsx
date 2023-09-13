import React, { useState, useEffect, useContext } from "react";
import FlashcardPair from "./FlashcardPair";
import FlashcardList from "./FlashcardList";
import isEmptyObj from "../../../helpers/isEmptyObj";
import api from "../../../services";
import { ADD_CONTENT_CONTEXT } from "../../../Context/AddContent";

const ConfigureFlashcards = ({ selected, tag }) => {
  console.log("tag", tag);
  // This logic of checking whether the code is empty or not could be set in the flashcard pair component, and tbh it should be, i realized later. (Dont change it right now, we will change it later)
  const [flashcards, setFlashcards] = useState([]);
  // const [answerIsEmptyError, setAnswerIsEmptyError] = useState(false);
  // const [questionIsEmptyError, setQuestionIsEmptyError] = useState(false);
  const [resetVar, setResetVar] = useState("");
  const [currentFlashCardId, setCurrentFlashCardId] = useState(0);
  const { currentSelected } = useContext(ADD_CONTENT_CONTEXT);
  // console.log(currentSelected);
  const [error, setError] = React.useState({
    value: false,
    message: "",
  });

  const getSelectedFlashcardId = () => {
    let tempSelection = selected;
    getFlashcardsHandler(tempSelection)
      .then((el) => {
        console.log("falshcard", el);
        if (!el.data.error) {
          // let data = el?.data?.questions;
          const data1 = Object.values(el.data.questions)[0];
          // const { 3: data1 } = el?.data.questions;
          // console.log("questions", data1);
          // console.log("data", data);
          // console.log("tag id", tag.id);
          const filteredNotes = data1.filter((el) => el.tagId === tag.id);
          console.log("filteredNotes", filteredNotes);
          filteredNotes.map((el, index) => {
            setCurrentFlashCardId(el.id);
          });
          return true;
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSelectedFlashcardId();
  }, [tag]);

  const getFlashcardsHandler = async () => {
    let temp = await api.get.getFlashcardsByTagAndChapter({
      tagId: tag.id,
      chapterId: currentSelected.chapId,
    });
    return temp;
  };
  const appendFlashcardHandler = (data) => {
    const copyFlashcardsByTag = data.filter((el) => el.tagId === tag.id);
    setFlashcards([...copyFlashcardsByTag]);
    copyFlashcardsByTag.map((item) => {
      setCurrentFlashCardId(item.id);
    });

    return true;
  };

  const getFlashcardTrigger = () => {
    let tempSelection = selected;
    getFlashcardsHandler(tempSelection)
      .then((el) => {
        if (!el.data.error) {
          // const data1 = Object.values(el.data.questions)[0];
          // console.log("flashcardArray", flashcardArray);
          const data1 = el?.data;
          // console.log("data1", data1);
          appendFlashcardHandler(data1);
          return true;
        }
      })
      .catch((err) => console.error(err));
    return true;
  };

  React.useEffect(() => {
    getFlashcardTrigger();
  }, [selected]);

  // Send data to flashcardList as props
  const getQuestionAnswerPairHandler = (e) => {
    const hasEmptyValues = e.isEmpty;
    if (hasEmptyValues) {
      // should not execute further if values are empty
      // display error message
      setError({
        value: true,
        message: "Please add a front side and a back side respectively",
      });
      return;
    } else {
      // set error false
      setError({
        value: false,
        message: "",
      });
      return sendFlashcardToDBHandler(e);
    }
  };

  const addToChapterHandler = async ({ payload, selectionId, tagId }) => {
    let temp = await api.post.createCourse.addFlashCardWithChapter({
      e: payload,
      selectedChapterId: selectionId,
      tagIdState: tagId,
    });
    return temp;
  };

  const addToSnackHandler = async ({ payload, selectionId, tagId }) => {
    let temp = await api.post.createCourse.addFlashCardWithSnacks({
      e: payload,
      selectedSnackId: selectionId,
      tagIdState: tagId,
    });
    return temp;
  };

  const sendFlashcardToDBHandler = (data) => {
    const payload = data.data;
    const selectionCriteria = data.props;
    let tempTag = tag;
    if (selectionCriteria.selected.type === "chapter") {
      addToChapterHandler({
        payload,
        selectionId: selectionCriteria.selected.id,
        tagId: tempTag.id,
      })
        .then((el) => {
          getFlashcardTrigger();
          return true;
        })
        .catch((err) => {
          getFlashcardTrigger();
          return false;
        });
    }
    if (selectionCriteria.selected.type === "snack") {
      addToSnackHandler({
        payload,
        selectionId: selectionCriteria.selected.id,
        tagId: tempTag.id,
      })
        .then((el) => {
          getFlashcardTrigger();
          return true;
        })
        .catch((err) => {
          getFlashcardTrigger();
          console.error(err);
          return false;
        });
    }
  };

  const flashcardPairProps = {
    sideEffects: getQuestionAnswerPairHandler,
    selected,
    resetTrigger: resetVar,
    error,
  };

  return (
    <div>
      <FlashcardList
        data={flashcards}
        tag={tag}
        selected={selected}
        setFlashcards={setFlashcards}
        currentFlashCardId={currentFlashCardId}
      />
      <FlashcardPair {...flashcardPairProps} />
    </div>
  );
};

export default ConfigureFlashcards;
