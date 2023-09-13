import React from "react";
import UI from "../UI/CourseContent";
import IconButton from "@mui/material/IconButton";
import EditOffIcon from "@mui/icons-material/EditOff";
import api from "./../../../services";
import Modal from "./../../../Components/UI/Modal/Modal";
import Edit from "../UI/Modals/Edit";

const Notes = (props) => {
  const [selected, setSelected] = React.useState({});
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [selectedChapter, setSelectedChapter] = React.useState({});

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

  const getNotesFromApi = async (e) => {
    let temp = await api.get.getNotes(e);
    return temp;
  };

  const getNotesFromSelectionHandler = (e) => {
    getNotesFromApi(e).then((el) => {
      if (!el.error) {
        setNotes([...el.data.rows]);
      }
    });
  };

  const getSelectionHandler = (e) => {
    if (!e.nested) {
      setSelectedChapter(e);
      getNotesFromSelectionHandler(e);
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      <UI
        getSelection={getSelectionHandler}
        courseDetails={{ level: props.level, subject: props.subject }}
        subject={props.subjectMatter}
        tableData={categories}
        cols={cols}
      />
      <Modal width="80vw" open={openEditModal} handleClose={handleCloseModal}>
        <Edit
          getNotes={(e) => console.log(e, "in notes")}
          selectedChapter={selectedChapter}
          data={notes}
          variant="notes"
          courseDetails={{ subject: props.subjectMatter }}
          selected={selected.row}
        />
      </Modal>
    </>
  );
};

export default Notes;
