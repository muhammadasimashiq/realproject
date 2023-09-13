import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import {
  Container,
  ContentContainer,
  Divider,
  Toolbar,
  IconsContainer,
  RightContainer,
  SendButton,
  Bold,
  Italic,
  Underline,
  Button,
} from "./Draft.style";
import Send from "./icons/Send";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const EditorComp = (props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Container>
      <ContentContainer>
        <Slate editor={editor} value={initialValue}>
          <Editable placeholder="Write something..." />
        </Slate>
      </ContentContainer>
      <Divider>&nbsp;</Divider>
      <Toolbar>
        <IconsContainer>
          <Bold>B</Bold>
          <Italic>I</Italic>
          <Underline>U</Underline>
        </IconsContainer>
        <RightContainer>
          <SendButton>
            <Send />
          </SendButton>
        </RightContainer>
      </Toolbar>
    </Container>
  );
};

export default EditorComp;

const InlineButton = ({ label, format }) => {
  const editor = useSlate();
  return <Button active={true}>{label}</Button>;
};
