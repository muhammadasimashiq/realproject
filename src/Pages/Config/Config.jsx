import React, { useEffect, useState } from "react";
import Typography from "./../../Components/UI/Typography/Typography";
import Card from "./../../Components/UI/Card/Card";
import Table from "../../Components/UI/Table/Table";
import Button from "./../../Components/UI/Button/Button";
import Stack from "./../../Components/UI/Layout/Stack/Stack";
import Modal from "./../../Components/UI/Modal/Modal";
import TextFieldComp from "../../Components/UI/Input/TextField";
import Accordion from "./../../Components/UI/Accordion/Accordion";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";
import Courses from "./Courses";
import Levels from "./Levels";
import ConfigModel from "./ConfigModel";
import api from "./../../services";
import PromptSnackbar from "./../../Components/UI/Snackbar/PromptSnackbar";
import { useSnackbar } from "notistack";
import ErrorBoundary from "./../../Errors/ErrorBoundary";
import Loader from "./../../Components/UI/Loader/Loader";

const AddCategory = (props) => {
  const [addCateg, setAddCateg] = useState("");
  const [addCategModal, setAddCategModal] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [dataIsLoading, setDataIsLoading] = React.useState(false);
  const [deleteSubject, setDeleteSubject] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const getCategoriesFunctionality = async () => {
    let temp = await api.get.getCategories();
    setData(temp);
    setDataIsLoading(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (newState) => {
    setDeleteSubject({ open: true, ...newState });
  };
  const fields = [
    { field: "id" },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => {
              setSelectedCategory(params);
              setOpenModel(true);
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
              setSelectedCategory(params);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const deleteTagHandler = async (e) => {
    const result = await api.delete.deleteCategories(selectedCategory.row.id);
    const { error } = result;
    if (!error) {
      enqueueSnackbar("Category deleted successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(
        "OOPS! error occoured while deleting Category, Please try again",
        {
          variant: "error",
          autoHideDuration: 4000,
        }
      );
    }
    getCategoriesFunctionality();
    setDeleteSubject({ ...deleteSubject, open: false });
  };
  const saveCategoryHandler = async () => {
    await api.post.addCategory(addCateg);
    getCategoriesFunctionality();

    setAddCategModal(false);
  };

  const handleCloseModal = () => {
    setAddCategModal(false);
    setOpenModel(false);
  };

  const updateApiCall = async (e) => {
    try {
      let result = await api.put.editCategories(selectedCategory.row.id, e);

      const { error } = result;
      if (error) {
        throw new Error("OOPS! error occoured while Updating Category ");
      } else {
        getCategoriesFunctionality();

        setOpenModel(false);

        enqueueSnackbar("Category updated successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      setOpenModel(false);
      enqueueSnackbar("OOPS! error occoured while updating unit", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };
  useEffect(() => {
    setDataIsLoading(true);
    getCategoriesFunctionality();
  }, []);
  return (
    <React.Fragment>
      <Stack>
        <Button onClick={(e) => setAddCategModal(true)} width="10rem">
          Add New Category
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
        title="Add Category"
        open={addCategModal}
        handleClose={handleCloseModal}
      >
        <Stack>
          <Typography variant="h6">Add Category</Typography>
          <TextFieldComp
            value={addCateg}
            onChange={(e) => setAddCateg(e.target.value)}
            label="Add category name"
          />
          <Button
            onClick={saveCategoryHandler}
            style={{ alignSelf: "center", width: "10rem" }}
          >
            Save Category
          </Button>
        </Stack>
      </Modal>
      <Modal open={openModel} handleClose={handleCloseModal}>
        <ConfigModel
          updateHandler={(e) => updateApiCall(e)}
          selectedCategory={selectedCategory}
        />
      </Modal>
      <PromptSnackbar
        // triggerYes={(e) => setRandomState("yes")}
        setState={setDeleteSubject}
        state={deleteSubject}
        clickHandler={deleteTagHandler}
      >
        Do you want to Delete this category
      </PromptSnackbar>
    </React.Fragment>
  );
};

const controller = [
  {
    name: "add-category",
    content: <AddCategory />,
    panelHeading: "Categories",
    panelDescription: "",
  },
  {
    name: "add-course",
    content: <Courses />,
    panelHeading: "Courses",
    panelDescription: "",
  },
  {
    name: "add-level",
    content: <Levels />,
    panelHeading: "Levels",
    panelDescription: "",
  },
];

const Config = () => {
  return (
    <Card title="Configuration">
      <Accordion accordion_controls={controller} />
    </Card>
  );
};

export default Config;
