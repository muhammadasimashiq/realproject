import isEmptyObj from "./../../../../../helpers/isEmptyObj";
const Buffer = require("buffer/").Buffer;

const useHtmlReturn = () => {
  const handleGetReturn = (html, delta) => {
    const sizeOfHtmlString = Buffer.byteLength(html);
    return {
      html,
      delta,
      size: sizeOfHtmlString,
    };
  };

  return { handleGetReturn };
};

export default useHtmlReturn;
