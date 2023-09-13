import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import TextEditorRenderOutput from "../../../Components/UI/TextEditorRenderOutput/TextEditorRenderOutput";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PromptSnackbar from "./../../../Components/UI/Snackbar/PromptSnackbar";
import { useSnackbar } from "notistack";
import api from "./../../../services";
import Divider from "@mui/material/Divider";
import { AiFillEdit } from "react-icons/ai";
import Model from "../../../Components/UI/Modal/Modal";
import TextEditor from "../../../Components/UI/TextEditor/QuillEditor/QuillEditor";
import Loader from "../../../Components/UI/Loader/Loader";
import TinnyEditor from "../../../Components/UI/TinnyMceEditor/TinnyEditor";
import { Box, Stack, Typography } from "@mui/material";
import { ADD_CONTENT_CONTEXT } from "../../../Context/AddContent";
const FlashcardList = ({
  data,
  currentFlashCardId,
  setFlashcards,
  selected,
  tag,
}) => {
  const { currentSelected } = useContext(ADD_CONTENT_CONTEXT);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [editContentForQuestion, setEditContentForQuestion] = useState("");
  const [editContentForAnswer, setEditContentForAnswer] = useState("");
  const [idForDeleteFlashCard, setIdForDeleteFlashCard] = useState("");
  const [idForUpdatingFlashCard, setIdForUpdatingFlashCard] = useState("");
  const [type, setType] = useState("");

  const deleteFlashCardHandler = async () => {
    try {
      let result = await api.delete.deleteFlashCard(idForDeleteFlashCard);
      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while deleting Flash Card");
      } else {
        getFlashcardTrigger("deleted");
      }
    } catch (error) {
      enqueueSnackbar("OOPS! error occoured while Flash Card", {
        variant: "error",
        autoHideDuration: 4000,
      });
      setIsLoading(false);
    }
  };

  // after delete one flascard we need to dispaly updated flascard data

  const getFlashcardsHandler = async () => {
    let temp = await api.get.getFlashcardsByTagAndChapter({
      chapterId: currentSelected.chapId,
      tagId: tag.id,
    });
    return temp;
  };
  const appendFlashcardHandler = (data, action) => {
    if (!Array.isArray(data)) {
      data = [];
    }
    const copyFlashcardsByTag = data.filter((el) => el.tagId === tag.id);
    setFlashcards([...copyFlashcardsByTag]);
    enqueueSnackbar(`Flash Card ${action} successfully!`, {
      variant: "success",
      autoHideDuration: 3000,
    });
    setIsLoading(false);

    return true;
  };

  const getFlashcardTrigger = (action) => {
    let tempSelection = selected;
    getFlashcardsHandler(tempSelection)
      .then((el) => {
        if (!el.data.error) {
          // const data1 = Object.values(el.data.questions)[0];
          const data1 = el?.data;
          appendFlashcardHandler(data1, action);
          return true;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("OOPS! error occoured", {
          variant: "error",
          autoHideDuration: 4000,
        });
        console.error(err);
      });
    return true;
  };

  const deleteButtonHandler = () => {
    setIsLoading(true);
    deleteFlashCardHandler();
    setState({ ...state, open: false });
  };
  const handleClick = (newState, id) => () => {
    setIdForDeleteFlashCard(id);
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setType("");
    setEditContentForAnswer("");
    setEditContentForQuestion("");
    setOpen(false);
  };

  const handleEdit = (question, answer, id) => {
    setOpen(true);
    setEditContentForQuestion(question);
    setEditContentForAnswer(answer);

    setIdForUpdatingFlashCard(id);
  };

  const updateFlashCardApiCall = async (payload) => {
    try {
      let result = await api.put.editFlashCard(idForUpdatingFlashCard, payload);
      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating Flash Card");
      } else {
        getFlashcardTrigger("updated");
        handleClose();
      }
    } catch (error) {
      handleClose();
      enqueueSnackbar("OOPS! error occoured while Flash Card", {
        variant: "error",
        autoHideDuration: 4000,
      });
      setIsLoading(false);
    }
  };

  const handleGetContent = (data) => {
    setIsLoading(true);
    let payload = {};
    if (type === "answer") {
      payload = {
        answer: JSON.stringify(data),
      };
    } else {
      payload = {
        question: JSON.stringify(data),
      };
    }
    updateFlashCardApiCall(payload);
  };

  const editContent =
    type === "answer" ? editContentForAnswer : editContentForQuestion;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PromptSnackbar
            // triggerYes={(e) => setRandomState("yes")}
            setState={setState}
            state={state}
            clickHandler={deleteButtonHandler}
          >
            Do you want to Delete the Flashcard?
          </PromptSnackbar>
          <ol style={{ listStyle: "none" }}>
            {data &&
              data.map(({ question, answer, id }, index) => (
                <>
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <li>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          <strong>
                            <TextEditorRenderOutput {...JSON.parse(question)} />
                          </strong>
                        </li>
                        <li>
                          <TextEditorRenderOutput {...JSON.parse(answer)} />
                        </li>
                      </ul>
                    </li>
                    <div>
                      <IconButton
                        onClick={() => {
                          handleEdit(question, answer, id);
                        }}
                      >
                        <AiFillEdit style={{ color: "#e015a2" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={handleClick(
                          {
                            vertical: "top",
                            horizontal: "center",
                          },
                          id
                        )}
                      >
                        <DeleteIcon sx={{ color: "#e015a2" }} />
                      </IconButton>
                    </div>
                  </div>
                  <Divider />
                  <Model
                    open={open}
                    handleClose={handleClose}
                    width={!type ? "400px" : "80%"}
                    classes="edit-modal"
                  >
                    <div style={{ maxWidth: "100%" }}>
                      {!type && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <h3>Edit Front</h3>
                            <IconButton
                              onClick={() => {
                                setType("question");
                              }}
                            >
                              <AiFillEdit style={{ color: "#e015a2" }} />
                            </IconButton>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <h3>Edit Back</h3>
                            <IconButton
                              onClick={() => {
                                setType("answer");
                              }}
                            >
                              <AiFillEdit style={{ color: "#e015a2" }} />
                            </IconButton>
                          </div>
                        </>
                      )}

                      {editContent && type && (
                        <Box sx={{ height: "90vh" }}>
                          {/* <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{ m: 1 }}
                          >
                            <Typography variant="h6">Edit</Typography>
                          </Stack> */}
                          <TinnyEditor
                            defaultContent={JSON.parse(editContent).html}
                            width="100%"
                            includeSendBtn={true}
                            getContent={(e) => handleGetContent(e)}
                            style={{ bottom: "3.5%", right: "1.5%" }}
                          />
                        </Box>
                      )}
                    </div>
                  </Model>
                </>
              ))}
          </ol>
        </>
      )}
    </>
  );
};

FlashcardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FlashcardList;
