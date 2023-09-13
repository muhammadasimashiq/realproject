import React from "react";
import TextEditorRenderOutput from "../../UI/TextEditorRenderOutput/TextEditorRenderOutput";
import TextEditor from "../../UI/TextEditor/QuillEditor/QuillEditor";
import IconButton from "@mui/material/IconButton";
import { AiFillEdit } from "react-icons/ai";

const EditModeOn = ({ content, getData }) => {
  const [edits, setEdits] = React.useState(content);
  React.useEffect(() => {
    getData(edits);
  }, [edits]);
  return (
    <div style={{ maxWidth: "100%" }}>
      <TextEditor
        defaultContent={edits.delta}
        width="90%"
        includeSendBtn={false}
        getContent={(e) => {
          setEdits(e);
        }}
      />
    </div>
  );
};

const ViewModeOn = ({ content }) => {
  return <TextEditorRenderOutput html={content.html} />;
};

const EditorToggler = ({ html, delta, getChanges }) => {
  const [changes, setChanges] = React.useState({ html, delta });
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    getChanges(changes);
  }, [changes.html]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flexGrow: "1" }}>
        {editMode ? (
          <EditModeOn
            content={changes}
            getData={(e) => {
              setChanges(e);
            }}
          />
        ) : (
          <ViewModeOn content={changes} />
        )}
      </div>
      <div>
        <IconButton onClick={(e) => setEditMode((prevState) => !prevState)}>
          <AiFillEdit />
        </IconButton>
      </div>
    </div>
  );
};

export default EditorToggler;
