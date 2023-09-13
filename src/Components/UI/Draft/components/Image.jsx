import React from "react";

const Image = ({ src }) => {
  if (!!src) {
    return <img src={src} alt={`${src}`} />;
  }
  return null;
};

export default Image;
