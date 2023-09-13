import React from "react";
import TextEditor from "../../../../Components/UI/TextEditor/TextEditor";
import Stack from "../../../../Components/UI/Layout/Stack/Stack";
import Typography from "../../../../Components/UI/Typography/Typography";
import Button from "../../../../Components/UI/Button/Button";
import TextEditorRenderOutput from "../../../../Components/UI/TextEditorRenderOutput/TextEditorRenderOutput";
import { IconButton } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import StackComp from "../../../../Components/UI/Layout/Stack/Stack";

const defaultObj = {
  original: [
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ],
  htmlForm: ["<p></p>"],
};

const EditContentModal = ({ getData, selected, ...props }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [data, setData] = React.useState(defaultObj);
  const [payload, setPayload] = React.useState({});
  const getDataHandler = (e) => {
    setData(e);
  };

  const getContent = (e) => {
    const dataAlreadyExists = props.data.find((el) => el.tagId === selected.id);

    if (!dataAlreadyExists) {
      setEditMode(true);
    } else {
      setData(JSON.parse(dataAlreadyExists.body));
    }
  };

  React.useEffect(() => {
    getContent();
  }, []);

  const switchModeHandler = () => {
    setEditMode((prevState) => !prevState);
  };
  return (
    <StackComp alignItems="flex-start">
      <IconButton onClick={(e) => switchModeHandler()}>
        <AiOutlineEdit />
      </IconButton>
      {editMode ? (
        <TextEditor
          fullWidth={true}
          includeSendBtn={false}
          defaultContent={data.original}
          getContent={(e) => getDataHandler(e)}
        />
      ) : (
        <TextEditorRenderOutput {...data} />
      )}
    </StackComp>
  );
};

export default EditContentModal;
