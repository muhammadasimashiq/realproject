import React from "react";
import TextEditor from "./../../../Components/UI/TextEditor/TextEditor";
import { InlineTex } from "react-tex";
import { AiFillEdit } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "./../../../services";
import PromptSnackbar from "./../../../Components/UI/Snackbar/PromptSnackbar";
import IconButton from "@mui/material/IconButton";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import { useSnackbar } from "notistack";
import TextEditorRenderOutput from "../../../Components/UI/TextEditorRenderOutput/TextEditorRenderOutput";
import Modal from "./../../../Components/UI/Modal/Modal";
import EditNote from "./EditNote";
import { Box } from "@mui/material";

const buildEdits = (value, body) => ({ value, anchor: { body } });

const TextEditorHandler = ({
  sideEffect,
  sideEffectState,
  tag,
  currentNoteId,
  setSideEffectState,
  handleSave,
}) => {
  console.log("sideEffectState", sideEffectState);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [editMode, setEditMode] = React.useState({
    value: false,
    anchor: {},
  });
  const changeEditModeHandler = (value, body) =>
    setEditMode({ ...buildEdits(value, body) });
  const { enqueueSnackbar } = useSnackbar();
  const getContentHandler = (e) => {
    sideEffect(e);
  };

  const getDeleteNoteApi = async (currentNoteId) => {
    let temp = await api.delete.deleteNote(currentNoteId);
    return temp;
  };

  const deleteNoteHandler = () => {
    getDeleteNoteApi(currentNoteId)
      .then((el) => {
        if (!el.error) {
          setSideEffectState([]);
          enqueueSnackbar("Note deleted successfully!", {
            variant: "success",
            autoHideDuration: 3000,
          });
        } else {
          enqueueSnackbar("OOPS! Note not deleted, Please try again", {
            variant: "error",
            autoHideDuration: 4000,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteButtonHandler = () => {
    deleteNoteHandler();
    setState({ ...state, open: false });
  };
  const handleClick = (newState, id) => () => {
    setState({ open: true, ...newState });
  };

  return (
    <Box
      className="scroll"
      sx={{ maxHeight: "750px", overflowY: "auto", overflowX: "hidden" }}
    >
      {sideEffectState.length > 0 ? (
        <StackComp
          direction="row"
          gap={0}
          justifyContent="end"
          sx={{ position: "sticky", zIndex: 0, top: 0 }}
        >
          <IconButton
            onClick={(e) => {
              const data = sideEffectState[0];
              changeEditModeHandler(true, data);
            }}
          >
            <AiFillEdit style={{ color: "#e015a2" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleClick({
              vertical: "top",
              horizontal: "center",
            })}
          >
            <DeleteIcon sx={{ color: "#e015a2" }} />
          </IconButton>
        </StackComp>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PromptSnackbar
          // triggerYes={(e) => setRandomState("yes")}
          setState={setState}
          state={state}
          clickHandler={deleteButtonHandler}
        >
          Do you want to Delete the Note?
        </PromptSnackbar>
        {sideEffectState.length > 0 &&
          sideEffectState.map(({ html }, index) => (
            <div style={{ flexGrow: "1" }} key={index}>
              <TextEditorRenderOutput html={html} />
            </div>
          ))}
        {/* WHEN I CLICK BUTTON IT OPENS MODEL SEND NOTES DATA AND RELATED AS PROPS AND IN MODEL I NEED TEXT EDITOR */}
        {/* DEFAULT CONTENT SHOULD BE THE ALREADY EXISTING CONTENT */}
        {/* WHEN USER CLICKS ON SAVE THEN ADD NOTES TRIGGER SHOULD TAKE PLACE */}
        {/* ADD LOADING STATE */}
      </div>
      {sideEffectState.length > 0 ? (
        <></>
      ) : (
        <TextEditor
          style={{ bottom: "9.5%", right: " 2%" }}
          getContent={(e) =>
            getContentHandler({
              changes: e,
              noteId: currentNoteId,
            })
          }
        />
      )}
      <Modal
        width="80vw"
        open={editMode.value}
        handleClose={(e) => changeEditModeHandler(false, null)}
      >
        <EditNote
          saveSideEffects={(e) => {
            getContentHandler({
              changes: e,
              noteId: currentNoteId,
            });
            changeEditModeHandler(false, null);
          }}
          {...editMode.anchor}
        />
      </Modal>
    </Box>
  );
};

export default TextEditorHandler;
