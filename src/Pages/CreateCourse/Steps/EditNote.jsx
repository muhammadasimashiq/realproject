import PropTypes from "prop-types";
import React from "react";
import TextEditor from "../../../Components/UI/TextEditor/QuillEditor/QuillEditor";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import ButtonComp from "../../../Components/UI/Button/Button";
import Typography from "../../../Components/UI/Typography/Typography";
import TinnyEditor from "../../../Components/UI/TinnyMceEditor/TinnyEditor";
import { Box } from "@mui/material";

const EditNote = ({ body, saveSideEffects }) => {
  console.log({ body: body });
  const [content, setContent] = React.useState({});
  return (
    <StackComp>
      <Typography variant="h5">Edit Note</Typography>
      <Box sx={{ height: "80vh" }}>
        <TinnyEditor
          defaultContent={body.html}
          includeSendBtn={false}
          getContent={(e) => setContent(e)}
          edit={true}
        />
      </Box>
      <ButtonComp
        onClick={(e) => {
          saveSideEffects(content.html ? content : body);
        }}
      >
        Save
      </ButtonComp>
    </StackComp>
  );
};

EditNote.propTypes = {
  body: PropTypes.shape({
    delta: PropTypes.any,
    html: PropTypes.string,
  }),
  delta: PropTypes.any,
  html: PropTypes.string,
  saveSideEffects: PropTypes.func,
};

export default EditNote;

EditNote.defaultProps = {
  body: {
    html: "",
    delta: null,
  },
  saveSideEffects: (e) => {
    return;
  },
};
