import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const useDeltaToHtmlParser = () => {
  return (delta) => {
    let cfg = {};
    let converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    let html = converter.convert();
    return {
      delta,
      html,
    };
  };
};

export default useDeltaToHtmlParser;
