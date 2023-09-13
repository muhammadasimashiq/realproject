import React from "react";
import Image from "./Image";
import Symbol from "./Symbol";
import LargeOperator from "./LargeOperator";

const CustomComponent = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src, name } = entity.getData();
  const type = entity.getType();
  let component;

  switch (type) {
    case "image": {
      component = <Image {...entity.getData()} />;
      return component;
    }

    case "equation": {
      component = <Symbol {...entity.getData()} />;
      return component;
    }

    default: {
      return null;
    }
  }
};

export default CustomComponent;
