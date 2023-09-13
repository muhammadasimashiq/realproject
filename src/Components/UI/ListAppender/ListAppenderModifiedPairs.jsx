import React from "react";
import TextFieldComp from "../Input/TextField";
import StackComp from "../Layout/Stack/Stack";
import { IconButton } from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Typography from "../Typography/Typography";
import Alert from "../Alert/Alert";
import { PropTypes } from "prop-types";

const ListAppenderModifiedPairs = ({ sideEffect }) => {
  const [pair, setPair] = React.useState([]);
  const [first, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [error, setError] = React.useState({ value: false, message: "" });

  const addHandler = (e) => {
    let temp = [...pair];
    const isFirstUnique = temp.find((eachItem) => eachItem.first === first);

    if (!isFirstUnique && first !== "") {
      temp.push({ first, second });
      setError({ value: false, message: "" });
      sideEffect({ first, second });
      setPair(temp);
    } else if (first !== "") {
      setError({ value: true, message: "Please enter a unique value" });
    } else if (first === "") {
      setError({ value: true, message: "Please enter a value" });
    }
  };

  const deleteHandler = (event, item) => {
    let temp = [...pair];
    const filtered = temp.filter(
      (eachPair) => !(eachPair.first === item.first)
    );
    setPair(filtered);
  };

  return (
    <StackComp>
      {pair.length > 0 ? (
        pair.map((each, index) => (
          <StackComp alignItems="flex-start" key={index} direction="row">
            <Typography sx={{ fontWeight: 500, display: "inline" }}>
              {index + 1}.
            </Typography>
            <StackComp sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>{each.first}</Typography>
              <Typography>{each.second}</Typography>
            </StackComp>
            <IconButton onClick={(e) => deleteHandler(e, each)}>
              <MdDelete />
            </IconButton>
          </StackComp>
        ))
      ) : (
        <Alert severity="info" message="Please add values" />
      )}

      <StackComp direction="row" alignItems="center">
        <TextFieldComp
          error={error.value}
          helperText={error.value && error.message}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          label="Add Front"
        />
        <TextFieldComp
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          label="Add Back"
        />
        <IconButton onClick={addHandler}>
          <IoAddCircle />
        </IconButton>
      </StackComp>
    </StackComp>
  );
};

export default ListAppenderModifiedPairs;
ListAppenderModifiedPairs.propTypes = {
  sideEffect: PropTypes.func,
};

ListAppenderModifiedPairs.defaultProps = {
  sideEffect: (e) => console.log(e, "No sideEffects used"),
};
