import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import customInlineStyles from "./inlineStyles/customInlineStyles";
import addLinkPlugin from "./plugins/addlink";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import BlockStyleToolbar, {
  getBlockStyle,
} from "./blockstyles/BlockStyleToolbar";
import InlineStyleToolbar from "./inlineStyles/InlineStyleToolbar";
import myBlockStyles from "./customBlockStyles";
import CustomComponentController from "./components/CustomComponentController";
import { getLaTeXPlugin } from "draft-js-latex-plugin";
import "draft-js-latex-plugin/lib/styles.css";
import "katex/dist/katex.min.css";

const Draft = () => {
  const editorRef = React.useRef("ref");
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const LaTeXPlugin = getLaTeXPlugin();

  const inlineStylesPlugin = customInlineStyles("red");
  const sideToolbarPlugin = createSideToolbarPlugin();
  const plugins = [
    inlineStylesPlugin,
    addLinkPlugin,
    sideToolbarPlugin,
    LaTeXPlugin,
  ];
  // BASE FUNCTIONS
  const changeHandler = (newState) => setEditorState(newState);

  // to handle basic key commands (use plugins for custom key commands)
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      changeHandler(newState);
      return "handled";
    }
    return "not-handled";
  };

  // BLOCK STYLES
  const toggleBlockType = (blockType) => {
    changeHandler(RichUtils.toggleBlockType(editorState, blockType));
  };

  // INLINE STYLES
  const toggleInlineType = (inlineType) => {
    changeHandler(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  // CUSTOM COMPONENT
  const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: CustomComponentController,
        editable: false,
      };
    }
    return null;
  };

  // CUSTOM TOOLBAR FUNCTIONS
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

  const onAddImg = (e) => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const onAddEquation = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "equation",
      "IMMUTABLE",
      {}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const SYMBOLS = [
    {
      label: <>&pi;</>,
      tex: "\\pi",
    },
    {
      label: <>&alpha;</>,
      tex: "\\alpha",
    },
    {
      label: <>&beta;</>,
      tex: "\\beta",
    },
    {
      label: <>&gamma;</>,
      tex: "\\gamma",
    },
    {
      label: <>&delta;</>,
      tex: "\\delta",
    },
  ];

  return (
    <div style={{ border: "1px solid black", borderRadius: "5px" }}>
      <InlineStyleToolbar onToggle={toggleInlineType} />
      <div>
        <button id="link_url" onMouseDown={onAddLink} className="add-link">
          <i className="material-icons">attach_file</i>
        </button>
        <button onMouseDown={onAddImg}>Img</button>
        {SYMBOLS.map(({ label, tex }, index) => (
          <button key={index} onMouseDown={(e) => onAddEquation(e)}>
            {label}
          </button>
        ))}
        <button onMouseDown={(e) => onAddEquation(e)}>Large</button>
      </div>
      <BlockStyleToolbar
        blockStyleFn={getBlockStyle}
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <div style={{ margin: "5px" }}>
        <Editor
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={changeHandler}
          plugins={plugins}
          blockStyleFn={myBlockStyles}
          blockRendererFn={mediaBlockRenderer}
        />
      </div>
    </div>
  );
};

export default Draft;
