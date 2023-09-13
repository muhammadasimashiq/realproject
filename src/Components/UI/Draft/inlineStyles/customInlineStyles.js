import { RichUtils, KeyBindingUtil } from "draft-js";

export default () => {
  const { hasCommandModifier } = KeyBindingUtil;
  return {
    customStyleMap: {
      HIGHLIGHTYELLOW: {
        background: "yellow",
      },
      HIGHLIGHTGREEN: {
        background: "green",
      },
    },
    keyBindingFn: (e) => {
      if (hasCommandModifier(e) && e.key === "h") {
        return "highlight-yellow";
      }
    },
    handleKeyCommand: (command, editorState, _, { setEditorState }) => {
      switch (command) {
        case "highlight-yellow": {
          setEditorState(
            RichUtils.toggleInlineStyle(editorState, "HIGHLIGHTYELLOW")
          );
          return true;
        }
      }
    },
  };
};
