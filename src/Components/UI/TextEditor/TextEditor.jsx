import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { createEditor, Node, Transforms } from "slate";
import { useEditorConfig, useSelection } from "./hooks";
import { Slate, Editable, withReact } from "slate-react";
import LinkEditor from "./LinkEditor";
import {
  getActiveStyles,
  toggleStyle,
  getTextBlockStyle,
  toggleBlockType,
  toggleLinkAtSelection,
  isLinkNodeAtSelection,
} from "./utils/EditorUtils";
import {
  Container,
  ContentContainer,
  Divider,
  Toolbar,
  IconsContainer,
  RightContainer,
  SendButton,
  Button,
} from "./../Draft/Draft.style";
import serialize from "./utils/serialize";
import { TbMathFunction } from "react-icons/tb";
import DialogueBox from "./DialogueBox";
import Select from "./../Draft/Select";
import Send from "./../Draft/icons/Send";
import documentInit from "./utils/InitDoc";
import paragraphStyles from "./utils/paragraphStyles";
import inlineStyles from "./utils/inlineStyles";
import blockStyles from "./utils/blockStyles";
import { withHistory } from "slate-history";
import QuillEditor from "./QuillEditor/QuillEditor";
import TinnyEditor from "../TinnyMceEditor/TinnyEditor";

const InlineButton = ({ label, isActive, ...props }) => {
  return (
    <Button active={isActive} {...props}>
      {label}
    </Button>
  );
};

const EditorComp = ({
  getContent,
  placeholder,
  width,
  fullWidth,
  includeSendBtn,
  defaultContent,
  maxWidth,
}) => {
  const editorRef = React.useRef(null);

  const withEditableVoids = (editor) => {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === "katex" ? true : isVoid(element);
    };

    return editor;
  };

  const editor = useMemo(
    () => withEditableVoids(withHistory(withReact(createEditor()))),
    []
  );

  const [previousSelection, selection, setSelection] = useSelection(editor);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [document, updateDocument] = React.useState(defaultContent);
  const onChangeHandler = React.useCallback(
    (document) => {
      updateDocument(document);
      setSelection(editor.selection);
    },
    [editor.selection, updateDocument, setSelection]
  );

  let selectionForLink = null;
  if (isLinkNodeAtSelection(editor, selection)) {
    selectionForLink = selection;
  } else if (
    selection == null &&
    isLinkNodeAtSelection(editor, previousSelection)
  ) {
    selectionForLink = previousSelection;
  }

  const onBlockTypeChange = React.useCallback(
    (targetType) => {
      if (targetType === "multiple") {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );
  const [openTexField, setOpenTexField] = React.useState(false);
  const texFieldHandler = (e) => {
    setOpenTexField((prevState) => !prevState);
  };

  const contentHandler = (e) => {
    const arrNodes = document.map((node) => serialize(node));
    getContent({ original: document, htmlForm: arrNodes });
  };

  React.useEffect(() => {
    if (!includeSendBtn) {
      contentHandler("");
    }
  }, [document]);

  return (
    <>
      <Container ref={editorRef} fullWidth={fullWidth} width={width}>
        <ContentContainer>
          <Slate editor={editor} value={document} onChange={onChangeHandler}>
            <Editable
              onKeyDown={onKeyDown}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              placeholder={placeholder}
            />
          </Slate>
        </ContentContainer>
        <Divider>&nbsp;</Divider>
        <Toolbar>
          <IconsContainer>
            {inlineStyles.map((each) => {
              if (each.style === "link") {
                return (
                  <InlineButton
                    isActive={isLinkNodeAtSelection(editor, editor.selection)}
                    key={each.style}
                    label={each.label}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      toggleLinkAtSelection(editor);
                    }}
                  />
                );
              }
              return (
                <InlineButton
                  isActive={getActiveStyles(editor).has(each.style)}
                  key={each.style}
                  label={each.label}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleStyle(editor, each.style);
                  }}
                />
              );
            })}
            <Select
              options={paragraphStyles}
              defaultLabel="Select Paragraph"
              getVal={(e) => onBlockTypeChange(e.value)}
            />
            {blockStyles.map(({ style, label }) => {
              return (
                <InlineButton
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onBlockTypeChange(style);
                  }}
                  label={label}
                  key={style}
                />
              );
            })}
            <InlineButton
              onMouseDown={() => setOpenTexField(true)}
              label={<TbMathFunction />}
            />
            {isLinkNodeAtSelection(editor, selection) ? (
              <LinkEditor
                editor={editor}
                setUrl={(e) => {
                  Transforms.setNodes(editor, { url: e.link }, { at: e.path });
                }}
              />
            ) : null}
          </IconsContainer>
          <RightContainer>
            {includeSendBtn && (
              <SendButton
                onClick={(e) => {
                  contentHandler();
                }}
              >
                <Send />
              </SendButton>
            )}
          </RightContainer>
        </Toolbar>
      </Container>
      <DialogueBox
        onBlockTypeChange={onBlockTypeChange}
        triggerClose={() => setOpenTexField(false)}
        editor={editor}
        open={openTexField}
        setOpen={texFieldHandler}
      />
    </>
  );
};

EditorComp.propTypes = {
  getContent: PropTypes.any,
};

EditorComp.defaultProps = {
  getContent: (e) => console.log(e, "no props given"),
  placeholder: "Write something...",
  width: "90%%",
  fullWidth: false,
  includeSendBtn: true,
  resetTrigger: "",
  defaultContent: documentInit,
};

const TextEditorComponent = ({ type, ...editorProps }) => {
  console.log(type, editorProps);
  switch (type) {
    case "quill": {
      return (
        <div style={{ height: editorProps.flashcard ? "40vh" : "85vh" }}>
          <TinnyEditor {...editorProps} />
        </div>
      );
    }

    case "slate": {
      return (
        <div style={{ height: editorProps.flashcard ? "40vh" : "85vh" }}>
          <EditorComp {...editorProps} />
        </div>
      );
    }

    default: {
      return <>NO TYPE PROVIDED AS PROP, IT SHOULD BE "quill" OR "slate"</>;
    }
  }
};

TextEditorComponent.defaultProps = {
  type: "quill",
};

export default TextEditorComponent;
