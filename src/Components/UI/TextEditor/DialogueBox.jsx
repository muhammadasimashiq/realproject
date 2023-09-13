import React from "react";
import Modal from "./../Modal/Modal";
import Typography from "../Typography/Typography";
import Button from "./../Button/Button";
import StackComp from "../Layout/Stack/Stack";
import { Transforms, Editor } from "slate";
import { useSlate } from "slate-react";
import { addStyles, EditableMathField } from "react-mathquill";
import { styled } from "@mui/material";
addStyles();

const StyledField = styled(EditableMathField)(({ theme }) => ({}));
const StyledContainer = styled("div")(({ theme }) => ({}));

const DialogueBox = ({
  open,
  setOpen,
  editor,
  triggerClose,
  onBlockTypeChange,
}) => {
  const text = { text: "" };
  const saveHandler = (e) => {
    const voidNode = {
      type: "katex",
      math: value,
      children: [text],
    };

    Transforms.insertNodes(editor, voidNode);

    triggerClose();
  };
  const [value, setValue] = React.useState("");
  const handleCloseModal=()=>{
    setOpen(false)
  }
  return (
    <Modal open={open} handleClose={handleCloseModal}>
      <StackComp>
        <Typography sx={{ alignSelf: "center" }} variant="h4">
          Insert TEX
        </Typography>
        <StyledContainer>
          <StyledField
            latex={value}
            onChange={(mathField) => {
              setValue(mathField.latex());
            }}
          />
        </StyledContainer>
        <Button onClick={saveHandler}>Save</Button>
      </StackComp>
    </Modal>
  );
};

export default DialogueBox;
