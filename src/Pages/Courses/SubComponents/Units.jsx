import React from "react";
import Table from "../../../Components/UI/Table/Table";
import UI from "../UI/CourseStructure";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";

const Units = () => {
  const [openModel, setOpenModel] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const tableData = [
    {
      id: 1,
      name: "ishtiaq",
      action: "action",
    },
    {
      id: 2,
      name: "asad",
      action: "action",
    },
    {
      id: 3,
      name: "aaa",
      action: "action",
    },
    {
      id: 4,
      name: "bbb",
      action: "action",
    },
    {
      id: 5,
      name: "ccc",
      action: "action",
    },
  ];
  const cols = [
    {
      field: "id",
      headerName: "units",
      flex: 0.4,
    },
    {
      field: "name",
      headerName: "unit name",
      flex: 1,
    },
    {
      field: "action",
      headerName: "action",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={(e) => {
              setOpenModel(true)
            }}
          >
            <EditOffIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{ color: "red" }}
            onClick={handleClick({
              vertical: "top",
              horizontal: "center",
              
            })}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      // width: 200,
      flex: 0.4,
    },
  ];
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  return (
    <UI title="Units">
      <Table tableData={tableData} cols={cols} />
    </UI>
  );
};

export default Units;
