import PropTypes from "prop-types";
import React from "react";
import Stack from "../../../../Components/UI/Layout/Stack/Stack";
import Typography from "../../../../Components/UI/Typography/Typography";
import Button from "../../../../Components/UI/Button/Button";
import EditNotes from "./EditNotes";
import EditFlashcards from "./EditFlashcards";

const EditContentModal = ({ getNotes, selected, variant, ...props }) => {
  let content = null;

  const notesHandler = (e) => {};

  if (variant === "flashcards") {
    content = (
      <EditFlashcards getData={getNotes} selected={selected} {...props} />
    );
  }
  if (variant === "notes") {
    content = (
      <EditNotes getData={notesHandler} selected={selected} {...props} />
    );
  }

  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5">{selected.title}</Typography>
        {content}
        <Button style={{ alignSelf: "center" }}>Save</Button>
      </Stack>
    </React.Fragment>
  );
};

EditContentModal.propTypes = {
  selected: PropTypes.shape({
    title: PropTypes.any,
  }),
  variant: PropTypes.any.isRequired,
};

export default EditContentModal;
