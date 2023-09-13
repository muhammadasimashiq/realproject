export default (contentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case "blockquote": {
      return "blockquotestyles";
    }

    case "center-text": {
      return "centerText";
    }

    case "left-text": {
      return "leftText";
    }

    case "right-text": {
      return "rightText";
    }

    case "justify": {
      return "justify";
    }

    default: {
      return "unstyled";
    }
  }
};
