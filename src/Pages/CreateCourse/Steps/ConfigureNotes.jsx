import React, { useState, useEffect } from "react";
import TextEditorHandler from "./TextEditorHandler";
import api from "./../../../services";
import { Box, IconButton } from "@mui/material";
import Loader from "../../../Components/UI/Loader/Loader";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";

const ConfigureNotes = ({ selected, tag }) => {
  console.log(selected, tag);
  const [sideEffectState, setSideEffectState] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(0);
  const [editMode, setEditMode] = React.useState();
  const [loading, setLoading] = React.useState(false);

  //fetching all notes
  // const getNotesHandler = async (selection) => {
  //   console.log(selection);
  //   let temp = await api.get.getNotes(selection);
  //   return temp;
  // };

  // this function is use to get current selected note id. which is using for updating current notes.

  const appendNotesHandler = (data) => {
    if (data?.body) {
      const temp = [];
      const obj = { ...JSON.parse(data.body) };
      temp.push(obj);
      setSideEffectState(temp);
      setLoading(false);
    } else {
      const temp = [];
      setSideEffectState(temp);
      setLoading(false);
    }

    setLoading(false);
    return true;
  };

  const getNotesTrigger = async () => {
    let tempSelection = selected;
    console.log(tempSelection);
    await api.get
      .getNotesByCourseAndTag(tempSelection.id, tag.id, tempSelection.type)
      .then((el) => {
        setCurrentNoteId(el?.data?.id);
        appendNotesHandler(el?.data);
        return true;
      })
      .catch((err) => console.log(err));
    return true;
  };

  React.useEffect(() => {
    setLoading(true);
    getNotesTrigger();
  }, [selected]);

  const descriptionSideEffects = (e, tagIdState, selected) => {
    switch (selected.type) {
      case "chapter":
        if (sideEffectState.length === 0) {
          addChapterNotesApi(e, tagIdState, selected)
            .then((el) => {
              getNotesTrigger();
              return true;
            })
            .catch((error) => {
              getNotesTrigger();
              return false;
            });
        }
        if (sideEffectState.length > 0) {
          updateSnackNoteApi(e, tagIdState, selected, currentNoteId, false)
            .then((el) => {
              getNotesTrigger();
              return true;
            })
            .catch((error) => {
              getNotesTrigger();
              return false;
            });
        }

        break;
      case "snack":
        if (sideEffectState.length === 0) {
          addSnackNoteApi(e, tagIdState, selected)
            .then((el) => {
              getNotesTrigger();
              return true;
            })
            .catch((error) => {
              getNotesTrigger();
              return false;
            });
        }
        if (sideEffectState.length > 0) {
          updateSnackNoteApi(e, tagIdState, selected, currentNoteId, true)
            .then((el) => {
              getNotesTrigger();
              return true;
            })
            .catch((error) => {
              getNotesTrigger();
              return false;
            });
        }

        break;
      default:
        return;
    }
  };
  const addChapterNotesApi = async (e, tagIdState, selected) => {
    const selectedChapterId = selected.id;
    const chapterNotes = await api.post.createCourse.addNoteswithChapters({
      e,
      selectedChapterId,
      tagIdState,
    });
    setCurrentNoteId(selectedChapterId.data.id);
    return chapterNotes;
  };
  const addSnackNoteApi = async (e, tagIdState, selected) => {
    const selectedSnackId = selected.id;
    const snackNotes = await api.post.createCourse.addNoteswithSnacks({
      e,
      selectedSnackId,
      tagIdState,
    });
    setCurrentNoteId(snackNotes.data.id);
    return snackNotes;
  };

  const updateSnackNoteApi = async (
    e,
    tagIdState,
    selected,
    currentNoteId,
    isSnack
  ) => {
    const selectedSnackId = selected.id;

    const payload = {
      e,
      tagIdState,
      currentNoteId,
    };

    if (isSnack) {
      payload.selectedSnackId = selectedSnackId;
    }
    const snackNotes = await api.put.updateSnackNotes(payload);
    setCurrentNoteId(snackNotes.data.id);
    return snackNotes;
  };

  return (
    <Box>
      {!loading ? (
        <TextEditorHandler
          setSideEffectState={setSideEffectState}
          currentNoteId={currentNoteId}
          sideEffectState={sideEffectState}
          sideEffect={(e) => {
            descriptionSideEffects(e.changes, tag.id, selected);
          }}
        />
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ConfigureNotes;
