import React from "react";
import Editor from "@draft-js-plugins/editor";
import { EditorState, RichUtils, Modifier } from "draft-js";
import * as StyledComponents from "./Draft.style";
import Unordered from "./icons/Unordered";
import Ordered from "./icons/Ordered";
import { TbMathSymbols } from "react-icons/tb";
import Clip from "./icons/Clip";
import SelectComp from "./Select";
import Send from "./icons/Send";
import { getLaTeXPlugin } from "draft-js-latex-plugin";
import createLinkPlugin from "./plugins/addlink";
import "draft-js-latex-plugin/lib/styles.css";
import "katex/dist/katex.min.css";

const colors = [
  { value: "transparent", label: "Transparent" },
  { value: "#81acf0", label: "Blue" },
  { value: "#72ed8d", label: "Green" },
  { value: "#ed3a26", label: "Red" },
  { value: "#ed269a", label: "Pink" },
  { value: "#de8b1f", label: "Orange" },
  { value: "#b94fe3", label: "Purple" },
  { value: "#a1a1a1", label: "Grey" },
];

const findColor = (color, colorArr) => {
  const foundColor = colors.find((each) => each.label === color);
  if (!foundColor) {
    return null;
  }
  return foundColor.value;
};

const highlightStyleMap = {
  transparent: {
    color: findColor("Transparent", colors),
  },
  blue: {
    color: findColor("Blue", colors),
  },
  green: {
    color: findColor("Green", colors),
  },
  red: {
    color: findColor("Red", colors),
  },
  pink: {
    color: findColor("Pink", colors),
  },
  orange: {
    color: findColor("Orange", colors),
  },
  purple: {
    color: findColor("Purple", colors),
  },
  grey: {
    color: findColor("Grey", colors),
  },
};

const DraftSecond = () => {
  const LaTeXPlugin = getLaTeXPlugin();
  const [highlight, setHighlight] = React.useState("");
  const editorRef = React.useRef(null);
  const {
    Toolbar,
    Container,
    Divider,
    Italic,
    Underline,
    Bold,
    ContentContainer,
    Button,
    IconsContainer,
    RightContainer,
    SendButton,
  } = StyledComponents;
  const linkPlugin = createLinkPlugin();
  const plugins = [LaTeXPlugin, linkPlugin];
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const changeHandler = (change) => setEditorState(change);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      changeHandler(newState);
      return "handled";
    }
    return "not-handled";
  };

  const inlineStyleHandler = (event, type) => {
    event.preventDefault();
    editorRef.current.focus();
    changeHandler(RichUtils.toggleInlineStyle(editorState, type));
  };

  const styleFn = () => {
    const selection = editorState.getSelection();
    const nextContentState = Object.keys(highlightStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    if (!currentStyle.has(highlight)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, highlight);
    }
    // var selectionState = editorState.getSelection();
    // var anchorKey = selectionState.getAnchorKey();
    // var currentContent = editorState.getCurrentContent();
    // var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    // var start = selectionState.getStartOffset();
    // var end = selectionState.getEndOffset();
    // var selectedText = currentContentBlock.getText().slice(start, end);
    // console.log(selectedText);
    changeHandler(nextEditorState);
  };

  const onAddLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      changeHandler(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    changeHandler(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  React.useEffect(() => {
    styleFn();
  }, [highlight]);
  const [store, setStore] = React.useState({});
  React.useEffect(() => {
    setStore({
      getEditorRef: editorRef.current.getEditorRef,
      getEditorState: editorRef.current.getEditorState,
      getPlugins: editorRef.current.getPlugins,
      getProps: editorRef.current.getProps,
      getReadOnly: editorRef.current.getReadOnly,
      setEditorState: setEditorState,
      setReadOnly: editorRef.current.setReadOnly,
    });
  }, [editorRef.current]);
  return (
    <Container>
      <ContentContainer onClick={(e) => editorRef.current.focus()}>
        <Editor
          customStyleMap={highlightStyleMap}
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={changeHandler}
          plugins={plugins}
        />
      </ContentContainer>
      <Divider>&nbsp;</Divider>
      <Toolbar>
        <IconsContainer>
          <Bold onMouseDown={(e) => inlineStyleHandler(e, "BOLD")}>B</Bold>
          <Italic onMouseDown={(e) => inlineStyleHandler(e, "ITALIC")}>
            I
          </Italic>
          <Underline onMouseDown={(e) => inlineStyleHandler(e, "UNDERLINE")}>
            U
          </Underline>
          <Button>
            <Unordered />
          </Button>
          <Button>
            <Ordered />
          </Button>
          <Button
            onMouseDown={(e) => {
              e.preventDefault();
              editorRef.current.focus();
              LaTeXPlugin.handleKeyCommand(
                "insert-texblock",
                editorState,
                new Date().getTime(),
                store
              );
            }}
          >
            <TbMathSymbols />
          </Button>
          {/* <SelectComp
            getVal={({ value }) => {
              setHighlight(value);
            }}
            options={colors}
            defaultLabel="Select Highlight"
          /> */}
        </IconsContainer>
        <RightContainer>
          <Button onMouseDown={onAddLink}>
            <Clip />
          </Button>
          <SendButton>
            <Send />
          </SendButton>
        </RightContainer>
      </Toolbar>
    </Container>
  );
};

export default DraftSecond;
