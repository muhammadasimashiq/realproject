import PropTypes from "prop-types";
import React from "react";
import StackComp from "../Layout/Stack/Stack";
import TextFieldComp from "../Input/TextField";
import { IconButton } from "@mui/material";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useTheme } from "@emotion/react";
import Alert from "../Alert/Alert";
import Modal from "../Modal/Modal";
import Typography from "../Typography/Typography";
import ButtonComp from "../Button/Button";
import api from "../../../services";
import EditOffIcon from "@mui/icons-material/EditOff";

const format = [
  {
    name: "first",
  },
  {
    name: "asad",
  },
  {
    name: "third",
  },
];

const ListAppender = ({
  unitId,
  label,
  list,
  type,
  hasAutoScroll,
  setList,
  variant,
  sideEffects,
}) => {
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [valueAlreadyExists, setValueAlreadyExists] = React.useState(false);
  const [emptyValue, setEmptyValue] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [recordForEdit, setRecordForEdit] = React.useState("");

  const handleCloseModal = (row) => {
    setRecordForEdit("");
    setName("");
    setOpenEditModal(false);
    setValueAlreadyExists(false);
    setEmptyValue(false);
  };

  const updateHandler = (row) => {
    setRecordForEdit(row);
    setName(row.name);
    setOpenEditModal(true);
  };

  const updateApiHandler = (e) => {
    if (name === "") {
      setEmptyValue(true);
      return;
    }
    setEmptyValue(false);
    let temp = [...list];
    const alreadyExists = temp.find((each) => each.name === name);

    if (alreadyExists && alreadyExists.id !== recordForEdit.id) {
      setValueAlreadyExists(true);
      return;
    }

    const updatedRecord = { ...recordForEdit, name: name };

    sideEffects(updatedRecord, "update");

    setOpenEditModal(false);
    setRecordForEdit("");
    setValueAlreadyExists(false);
    setName("");
  };

  const deleteHandler = (e, row) => {
    let temp = [...list];
    const id = e.currentTarget.getAttribute("id");
    temp.splice(id, 1);
    setList(temp);
    sideEffects(row, "delete");
  };

  const addHandler = (e) => {
    if (name === "") {
      setEmptyValue(true);
      return;
    }
    setEmptyValue(false);
    let temp = [...list];
    const alreadyExists = temp.find((each) => each.name === name);
    if (alreadyExists) {
      setValueAlreadyExists(true);
      return;
    }

    sideEffects(name, "add", unitId);
    setValueAlreadyExists(false);
    temp.push({ name });
    setName("");
  };
  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [list]);

  const inputRef = React.useRef(null);
  return (
    <StackComp gap={1}>
      {list.length === 0 ? (
        <Alert severity="info" message={`No ${type}s added!`} />
      ) : (
        list.map((row, index) => (
          <React.Fragment key={index}>
            <StackComp
              key={index}
              direction="row"
              justifyContent="space-between"
            >
              <StackComp>
                {index + 1}. {row.name}
              </StackComp>
              <StackComp direction="row" gap={0}>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => updateHandler(row)}
                >
                  <EditOffIcon />
                </IconButton>
                <IconButton id={index} onClick={(e) => deleteHandler(e, row)}>
                  <MdDelete color="#e015a2" />
                </IconButton>
              </StackComp>
            </StackComp>
          </React.Fragment>
        ))
      )}

      <StackComp gap={1} direction="row" alignItems="center">
        <TextFieldComp
          error={!openEditModal && (valueAlreadyExists || emptyValue)}
          helperText={
            (!openEditModal &&
              valueAlreadyExists &&
              "Please enter a unique name!") ||
            (!openEditModal && emptyValue && "Please enter a value!")
          }
          value={openEditModal ? "" : name}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.code === "Enter") {
              addHandler(e);
              e.target.focus();
            }
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          label={label}
        />
        {hasAutoScroll && <div ref={inputRef} />}
        <IconButton type="button" onClick={addHandler}>
          <IoAddCircle color={theme.palette.primary.main} />
        </IconButton>
      </StackComp>
      <Modal
        title={`Update ${type} `}
        open={openEditModal}
        handleClose={handleCloseModal}
      >
        <StackComp>
          <Typography variant="h6">Update {type}</Typography>
          <TextFieldComp
            error={valueAlreadyExists || emptyValue}
            helperText={
              (valueAlreadyExists && "Please enter a unique name!") ||
              (emptyValue && "Please enter a value!")
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            label={`Update  ${type}  Name`}
          />
          <ButtonComp
            onClick={(e) => {
              updateApiHandler(e);
            }}
            style={{ alignSelf: "center", width: "10rem" }}
          >
            Update
          </ButtonComp>
        </StackComp>
      </Modal>
    </StackComp>
  );
};

ListAppender.propTypes = {
  getList: PropTypes.func,
  hasAutoScroll: PropTypes.bool,
  label: PropTypes.string,
  list: PropTypes.array,
  setList: PropTypes.func,
  type: PropTypes.any,
  variant: PropTypes.any,
  sideEffects: PropTypes.func,
  unitId: PropTypes.any,
};

export default ListAppender;
ListAppender.defaultProps = {
  unitId: "",
  label: "Enter Unit Name",
  list: [],
  getList: (e) => console.log(e, "no props given"),
  hasAutoScroll: false,
  setList: (e) => console.log(e, "no props given"),
  variant: "field",
  sideEffects: (e, type) => console.log(e, type, "no sideeffects used"),
};
