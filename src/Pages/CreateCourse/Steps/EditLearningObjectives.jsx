import React from "react";
import ButtonComp from "../../../Components/UI/Button/Button";
import api from "../../../services";
import { Loader } from "../../../helpers/Loader";
import ErrorBoundary from "../../../Errors/ErrorBoundary";
import Typography from "../../../Components/UI/Typography/Typography";
import StackComp from "../../../Components/UI/Layout/Stack/Stack";
import EditorToggler from "../../../Components/Containers/EditorToggler/EditorToggler";
import TextEditor from "../../../Components/UI/TextEditor/QuillEditor/QuillEditor";
import TinnyEditor from "../../../Components/UI/TinnyMceEditor/TinnyEditor";
import _ from "lodash";

export const buildLoading = (value) => ({ value });
export const buildError = (value, msg, severity) => ({ value, msg, severity });

const EditLearningObjectives = ({ learningObj, chapterId, triggerSaved }) => {
  // console.log(learningObj, chapterId, triggerSaved);
  const [data, setData] = React.useState();
  const [dataa, setDataa] = React.useState();
  const changeContentHandler = (content) => {
    setData(content);
  };

  const [loading, setLoading] = React.useState({
    value: true,
  });
  // const [error, setError] = React.useState({
  //   value: false,
  //   msg: "",
  //   severity: "",
  // });

  const handleLoadingChange = (value) => setLoading({ ...buildLoading(value) });

  const getLearningObjApi = async () => {
    // let temp = await api.get.getLearningObjectivesFromChapter(chapterId);
    let temp = await api.get.getLearningObjectivesById(learningObj);
    return temp;
  };

  const updateLearningObjectiveApi = async (content, learningObjId) => {
    let temp = await api.put.updateLearningObjective(content, learningObjId);
    return temp;
  };

  const getExactLearningObj = (content) => {
    // const learningObjRetrieved = arr.find((el) => el.id === learningObj);
    setDataa(JSON.parse(content));
    return true;
  };

  const findSubChildById = (myArray, subChildId) => {
    return _.find(myArray, (parent) => {
      return _.find(parent.content, (child) => {
        return _.find(child.leaningObjectives, { id: subChildId });
      });
    });
  };
  const middleWareGetLearningObj = () => {
    getLearningObjApi()
      .then((el) => {
        // console.log("elelelel", el.data.title);
        // if (!el.error) {
        //   const hasUnits = el.data[0].haveUnits;
        //   let retrievedContent;
        //   if (hasUnits) {
        //     retrievedContent =
        //       el?.data[0]?.content[0]?.chapters[0]?.leaningObjectives;
        //   } else {
        //     const dataFind = findSubChildById(el.data, learningObj);
        //     retrievedContent = dataFind?.content[0]?.leaningObjectives;
        //   }

        getExactLearningObj(el.data.title);
        // console.log(retrievedContent);
        handleLoadingChange(false);
        // }
      })
      .catch((err) => {
        console.error(err);
        handleLoadingChange(false);
      });
  };

  const init = () => {
    middleWareGetLearningObj();
  };
  React.useEffect(() => {
    handleLoadingChange(true);
    init();
  }, []);

  const handleSave = (e) => {
    updateLearningObjectiveApi(JSON.stringify(data), learningObj)
      .then((el) => {
        triggerSaved({ response: el });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ErrorBoundary>
        <StackComp
          direction="column"
          // style={{ height: "50vh" }}
          alignItems="space-between"
        >
          <Typography variant="h5">Edit Learning Objective</Typography>
          {loading.value ? (
            <Loader />
          ) : (
            <div style={{ overflow: "auto", maxWidth: "80vw", height: "70vh" }}>
              <TinnyEditor
                includeSendBtn={false}
                defaultContent={dataa?.html}
                getContent={(e) => changeContentHandler(e)}
                edit={true}
              />
              {/* <TextEditor
                includeSendBtn={false}
                defaultContent={data?.delta}
                getContent={(e) => changeContentHandler(e)}
              /> */}
            </div>
          )}
          <ButtonComp onClick={handleSave}>Save</ButtonComp>
        </StackComp>
      </ErrorBoundary>
    </div>
  );
};

export default EditLearningObjectives;
