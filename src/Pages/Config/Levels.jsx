import React, { useState, useEffect } from "react";
import Typography from "./../../Components/UI/Typography/Typography";
import Table from "../../Components/UI/Table/Table";
import Button from "./../../Components/UI/Button/Button";
import Stack from "./../../Components/UI/Layout/Stack/Stack";
import Modal from "./../../Components/UI/Modal/Modal";
import TextFieldComp from "../../Components/UI/Input/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";
import LevelModel from "./LevelModel";
import api from "./../../services";
import PromptSnackbar from "./../../Components/UI/Snackbar/PromptSnackbar";
import { useSnackbar } from "notistack";
import ErrorBoundary from "./../../Errors/ErrorBoundary";
import Loader from "./../../Components/UI/Loader/Loader";

const Levels = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [addCategModal, setAddCategModal] = useState(false);
  const [openLevelModel, setOpenLevelModel] = useState(false);
  const [selected, setSelected] = useState({});
  const [data, setData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [deleteSubject, setDeleteSubject] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = (newState) => {
    setDeleteSubject({ open: true, ...newState });
  };

  const getLevelsHandler = async () => {
    let temp = await api.get.getLevel();

    setData([
      ...temp.data.rows.map((row) => ({
        ...row,
        levels: row.title.charAt(0).toUpperCase() + row.title.slice(1),
      })),
    ]);
    setDataIsLoading(false);
  };

  useEffect(() => {
    setDataIsLoading(true);
    getLevelsHandler();
  }, []);
  const fields = [
    { field: "id" },
    { field: "levels", headerName: "Levels", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => {
              setSelected(params);
              setOpenLevelModel(true);
            }}
          >
            <EditOffIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{ color: "red" }}
            onClick={(e) => {
              handleClick({
                vertical: "top",
                horizontal: "center",
              });
              setSelected(params);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [levelName, setLevelName] = React.useState("");

  const deleteLevelHandler = async (e) => {
    let temp = await api.delete.deleteLevel(selected.row.id, e);
    const { error } = temp;
    if (!error) {
      enqueueSnackbar("level deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(
        "OOPS! error occoured while deleting level, Please try again",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
    }
    getLevelsHandler();
    setDeleteSubject({ ...deleteSubject, open: false });
  };

  const updateApiCall = async (e) => {
    try {
      let result = await api.put.editLevel(selected.row.id, e);

      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating Level ");
      } else {
        getLevelsHandler();

        setOpenLevelModel(false);

        enqueueSnackbar("Level updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setOpenLevelModel(false);

      enqueueSnackbar("OOPS! error occoured while updating Level", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };
  const saveLevelHandler = async () => {
    await api.post.addLevel(levelName);

    getLevelsHandler();

    // setDataIsLoading(true);
    setAddCategModal(false);
  };

  const handleCloseModal = () => {
    setAddCategModal(false);
    setOpenLevelModel(false);
  };
  return (
    <React.Fragment>
      <Stack>
        <Button onClick={(e) => setAddCategModal(true)} width="10rem">
          Add New Level
        </Button>
        <ErrorBoundary>
          {dataIsLoading ? (
            <Loader />
          ) : (
            <Table tableData={data} cols={fields} />
          )}
        </ErrorBoundary>
      </Stack>
      <Modal
        title="Add Level"
        open={addCategModal}
        handleClose={handleCloseModal}
      >
        <Stack>
          <Typography variant="h6">Add Levels</Typography>
          <TextFieldComp
            value={levelName}
            onChange={(e) => setLevelName(e.target.value)}
            label="Add level name"
          />
          <Button
            onClick={saveLevelHandler}
            style={{ alignSelf: "center", width: "10rem" }}
          >
            Save Level
          </Button>
        </Stack>
      </Modal>
      <Modal open={openLevelModel} handleClose={handleCloseModal}>
        <LevelModel
          updateHandler={(e) => updateApiCall(e)}
          selected={selected}
        />
      </Modal>
      <PromptSnackbar
        // triggerYes={(e) => setRandomState("yes")}
        setState={setDeleteSubject}
        state={deleteSubject}
        clickHandler={deleteLevelHandler}
      >
        Do you want to Delete this level?
      </PromptSnackbar>
    </React.Fragment>
  );
};

export default Levels;
