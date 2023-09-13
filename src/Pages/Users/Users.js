import React from "react";
import Table from "./../../Components/UI/Table/Table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";
import PromptSnackbar from "./../../Components/UI/Snackbar/PromptSnackbar";
import Model from "./../../Components/UI/Modal/Modal";
import AvatarComponent from "./../../Components/UI/Avatar/Avatar";
import EditUserModel from "./EditUserModel";
import api from "../../services";
import ErrorBoundary from "./../../Errors/ErrorBoundary";
import { useSnackbar } from "notistack";
import Loader from "../../Components/UI/Loader/Loader";
import Alert from "../../Components/UI/Alert/Alert";

const Users = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openModel, setOpenModel] = React.useState(false);
  const [randomState, setRandomState] = React.useState("hello");
  const [levels, setLevels] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [singleRecord, setsingleRecord] = React.useState();
  const [recordId, setRecordId] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [userError, setUserError] = React.useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const getLevelsApi = async () => {
    let temp = await api.get.getLevel();
    return temp;
  };

  const cols = [
    {
      field: "id",
      headerName: "id",
      // width: 200,
      flex: 0.4,
    },
    {
      field: "userImage",
      headerName: "user image",
      renderCell: (params) => (
        <>
          <AvatarComponent
            variant="rounded"
            src={params.value}
            width="50px"
            height="50px"
          />
        </>
      ),
      // width: 200,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "user name",
      // width: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "user email",
      // width: 200,
      flex: 0.8,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 1,
    },
    // {
    //   field: "curriculum",
    //   headerName: "Curriculum",
    //   flex: 1,
    // },
    {
      field: "school",
      headerName: "School",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleClickForEdit(params.row)}
          >
            <EditOffIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{ color: "red" }}
            onClick={handleClick(
              {
                vertical: "top",
                horizontal: "center",
              },
              params.row.id
            )}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      // width: 200,
      flex: 1,
    },
  ];
  const handleClick = (newState, id) => () => {
    setRecordId(id);
    setState({ open: true, ...newState });
  };

  const deleteUserHandler = async () => {
    const token = localStorage.getItem("auth-token");
    const result = await api.delete.deleteUser(recordId, token);
    const { error } = result;
    if (error) {
      alert("error occoured while deleting subject");
    } else {
      window.alert("user delete successfully");
      const newData = tableData.filter((item) => item.id !== recordId);
      setTableData(newData);
    }
    setState({ ...state, open: false });
  };

  // id, userImage, name, email, contact, city, country, grade, school

  const manipulateUserData = (data) => {
    return {
      id: data.id,
      userImage: data.publicUrl,
      name: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.userProfile.phone,
      city: data.userProfile.city,
      country: data.userProfile.country,
      grade: levels.find((level) => level.id === data.userProfile.gradeLevelId)
        ?.title,
      school: data.userProfile.schoolName,
    };
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      let temp = await api.get.getUserData();
      const { error } = temp;
      if (error) {
        throw error;
      } else {
        const dataToSet = temp.data.map((each) => manipulateUserData(each));
        setTableData(dataToSet);
      }
    } catch (error) {
      setUserError(true);
      enqueueSnackbar("OOPS! error occoured while fetching courses", {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
    setLoading(false);
  };

  const getLevelsToState = () => {
    getLevelsApi().then((el) => {
      setLevels([...el.data.rows]);
    });
  };

  React.useEffect(() => {
    getUserData();
  }, [levels]);

  const loadInit = () => {
    getLevelsToState();
  };

  React.useEffect(() => {
    loadInit();
  }, []);

  function handleClickForEdit(singleRecord) {
    setsingleRecord(singleRecord);
    setOpenModel(true);
  }

  const handleCloseModal = () => {
    setOpenModel(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : userError ? (
        <>
          <Alert severity="error" message="Error while fetching users" />
        </>
      ) : tableData.length === 0 ? (
        <>
          <Alert severity="info" message="No user found!" />
        </>
      ) : (
        <>
          <PromptSnackbar
            triggerYes={(e) => setRandomState("yes")}
            setState={setState}
            state={state}
            clickHandler={deleteUserHandler}
          >
            Do you want to Delete the user?
          </PromptSnackbar>
          <ErrorBoundary>
            <Model open={openModel} handleClose={handleCloseModal} width={800}>
              <EditUserModel
                recordForEdit={singleRecord}
                levels={levels}
                getUserData={getUserData}
                setOpenModel={setOpenModel}
              />
            </Model>
            <Table
              tableData={tableData}
              cols={cols}
              toolbar="filter"
              filterToolbar={true}
              density="standard"
            />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
};

export default Users;
