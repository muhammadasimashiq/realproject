import React from "react";
import List from "../../../Components/UI/List/List";
import GridComp from "../../../Components/UI/Layout/Grid/Grid";
import Paper from "../../../Components/UI/Paper/Paper";
import Table from "../../../Components/UI/Table/Table";
import Stack from "../../../Components/UI/Layout/Stack/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOffIcon from "@mui/icons-material/EditOff";
import Model from "./../../../Components/UI/Modal/Modal";
import PromptSnackbar from "./../../../Components/UI/Snackbar/PromptSnackbar";
import data from "./../../../config/mockData/accordianData.json";
import EditModel from "./EditModel";
import api from "../../../services";
import { useSelector } from "react-redux";

const defaultRows = [
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
const defaultCols = [
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
        <IconButton aria-label="delete" color="primary">
          <EditOffIcon />
        </IconButton>
        <IconButton aria-label="delete" style={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
    // width: 200,
    flex: 0.4,
  },
];

const buildLayer = (layer, name, label, type) => ({ layer, name, label, type });

const filterArrayHandler = (arr, arrKey, comparison) => {
  return arr.filter((each) => each[arrKey] === comparison);
};

const UI = ({ getSelection, courseDetails, tableData, cols, subject }) => {
  const [openModel, setOpenModel] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const getCourseData = async (subjectId) => {
    console.log("subject ", subject);
    let temp = await api.get.getChapterDetails(subjectId);
    return temp;
  };

  const [randomState, setRandomState] = React.useState("hello");
  const [listItems, setListItems] = React.useState([]);
  const handleCloseModal = () => {
    setOpenModel(false);
  };
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const deleteTableUser = () => {
    //you can delete user data inside this function
    window.alert("user data will be delete");
    setState({ ...state, open: false });
  };

  const buildSkeletonForList = (payload) => {
    if (payload.haveUnits) {
      // CASE IF UNITS ARE THERE

      let temp = [
        ...payload.units.map((unit) => {
          const chaptersForThisUnit = filterArrayHandler(
            payload.chapters,
            "unitId",
            unit.id
          );
          return {
            id: unit.id,
            ...buildLayer(1, unit.title, unit.title, "unit"),
            childrenElements:
              chaptersForThisUnit.length > 0
                ? [
                    ...chaptersForThisUnit.map((chap) => {
                      const snacksForThisChap = filterArrayHandler(
                        payload.snacks,
                        "chapterId",
                        chap.id
                      );
                      return {
                        id: chap.id,
                        ...buildLayer(2, chap.title, chap.title, "chapter"),
                        childrenElements:
                          snacksForThisChap.length > 0
                            ? [
                                ...snacksForThisChap.map((snack) => {
                                  return {
                                    id: snack.id,
                                    ...buildLayer(
                                      2,
                                      snack.title,
                                      snack.title,
                                      "snack"
                                    ),
                                  };
                                }),
                              ]
                            : null,
                      };
                    }),
                  ]
                : null,
          };
        }),
      ];
      return temp;
    }
    if (!payload.haveUnits) {
      let temp = [
        ...payload.chapters.map((chap) => {
          const snacksForThisChap = filterArrayHandler(
            payload.snacks,
            "chapterId",
            chap.id
          );
          return {
            id: chap.id,
            ...buildLayer(1, chap.title, chap.title, "chapter"),
            childrenElements:
              snacksForThisChap.length > 0
                ? [
                    ...snacksForThisChap.map((snack) => {
                      return {
                        id: snack.id,
                        ...buildLayer(2, snack.title, snack.title, "snack"),
                      };
                    }),
                  ]
                : null,
          };
        }),
      ];
      return temp;
    }
  };

  const generateList = () => {
    getCourseData(subject.id).then((el) => {
      if (!el.error) {
        const skeleton = buildSkeletonForList(el.data);
        setListItems(skeleton);
      }
    });
  };

  const init = () => {
    generateList();
  };

  React.useEffect(() => {
    init();
  }, []);
  return (
    <React.Fragment>
      <GridComp container spacing={2}>
        <GridComp item xs={3}>
          <Paper>
            <List listSkeleton={listItems} onItemClick={getSelection} />
          </Paper>
        </GridComp>
        <GridComp item xs={9}>
          <Paper>
            <Stack sx={{ p: "1rem" }}>
              <PromptSnackbar
                triggerYes={(e) => setRandomState("yes")}
                setState={setState}
                state={state}
                clickHandler={deleteTableUser}
              >
                Do you want to Delete the user?
              </PromptSnackbar>
              <Model open={openModel} handleClose={handleCloseModal}>
                <EditModel />
              </Model>
              <Table tableData={tableData} cols={cols} />
            </Stack>
          </Paper>
        </GridComp>
      </GridComp>
    </React.Fragment>
  );
};

export default UI;

UI.defaultProps = {
  tableData: defaultRows,
  cols: defaultCols,
};
