import React from "react";
import UI from "../UI/CourseContent";
import IconButton from "@mui/material/IconButton";
import EditOffIcon from "@mui/icons-material/EditOff";
import api from "./../../../services";
import Modal from "./../../../Components/UI/Modal/Modal";
import Edit from "./../UI/Modals/Edit";

const Flashcards = (props) => {
  const [selected, setSelected] = React.useState({});
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const getCategoryHandler = async () => {
    let temp = await api.get.getCategories();
    setCategories([...temp]);
  };
  const cols = [
    {
      field: "id",
      headerName: "units",
      flex: 0.4,
    },
    {
      field: "category",
      headerName: "category",
      flex: 1,
    },
    {
      field: "action",
      headerName: "action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              setOpenEditModal(true);
              setSelected(params);
            }}
            aria-label="delete"
            color="primary"
          >
            <EditOffIcon />
          </IconButton>
        </>
      ),
      flex: 0.3,
    },
  ];

  React.useEffect(() => {
    getCategoryHandler();
  }, []);

  const getSelectionHandler = (e) => {};

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      <UI
        getSelection={getSelectionHandler}
        courseDetails={{ level: props.level, subject: props.subject }}
        tableData={categories}
        subject={props.subjectMatter}
        cols={cols}
      />
      <Modal width="80vw" open={openEditModal} handleClose={handleCloseModal}>
        <Edit
          courseDetails={{ level: props.level, subject: props.subject }}
          variant="flashcards"
          selected={selected.row}
        />
      </Modal>
    </>
  );
};

export default Flashcards;
