import Tooltip from "@mui/material/Tooltip";
export default function Link({ element, attributes, children }) {
  return (
    <Tooltip title="Press ctrl (or cmd in mac) and click to visit the link">
      <a
        href={element.url}
        {...attributes}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey) {
            window.open(element.url, "_blank");
          }
        }}
        className={"link"}
      >
        {children}
      </a>
    </Tooltip>
  );
}
