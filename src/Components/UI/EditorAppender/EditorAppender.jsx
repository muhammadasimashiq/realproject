import React from "react";
import TextEditor from "./../TextEditor/TextEditor";
import { InlineTex } from "react-tex";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import api from "../../../services";
import TextEditorRenderOutput from "../TextEditorRenderOutput/TextEditorRenderOutput";
import StackComp from "../Layout/Stack/Stack";
import Dialog from "@mui/material/Dialog";
import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const EditorAppender = ({ label, sideEffects, arr, open, setOpen }) => {
  const handleClick = (id) => {
    sideEffects({ id: id, type: "delete" });
  };
  const handleEdit = (id) => {
    sideEffects({ id: id, type: "edit" });
  };
  return (
    <div>
      <ol>
        {arr.length > 0 &&
          arr.map((element, index) => (
            <li key={index} style={{ marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  overflow: "auto",
                  maxHeight: "13rem",
                }}
              >
                <TextEditorRenderOutput
                  original={element.title.delta}
                  html={element.title.html}
                />
                <StackComp direction="row" gap={0}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleClick(element.id)}
                  >
                    <DeleteIcon sx={{ color: "#e015a2" }} />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(element.id)}>
                    <AiFillEdit style={{ color: "#e015a2" }} />
                  </IconButton>
                </StackComp>
              </div>
            </li>
          ))}
      </ol>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mr: 1, mt: 2, background: "#251038" }}
        >
          Add Learning Objective
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "1000px",
          },
        }}
      >
        {/* <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ width: "100%", px: 2 }}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Learning Objective</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack> */}
        <Box sx={{ p: 2 }}>
          <TextEditor getContent={sideEffects} fullWidth placeholder={label} />
        </Box>
      </Dialog>
    </div>
  );
};

export default EditorAppender;
