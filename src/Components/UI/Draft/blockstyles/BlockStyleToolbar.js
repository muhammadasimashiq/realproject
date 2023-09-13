import HeaderStyleDropdown from "./HeaderStyleDropdown";

export const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
  { label: "center", style: "center-text" },
  { label: "left", style: "left-text" },
  { label: "right", style: "right-text" },
  { label: "justify", style: "justify" },
];
export const BLOCK_TYPE_HEADINGS = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "paragraph", style: "paragraph" },
];

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const BlockStyleToolbar = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div>
      <span className="RichEditor-controls">
        <HeaderStyleDropdown
          headerOptions={BLOCK_TYPE_HEADINGS}
          active={blockType}
          onToggle={onToggle}
        />
        {BLOCK_TYPES.map((type, index) => {
          const { style, label } = type;
          return (
            <button key={index} onMouseDown={(e) => onToggle(style)}>
              {label}
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default BlockStyleToolbar;
