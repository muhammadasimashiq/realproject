import PropTypes from "prop-types";
import React from "react";
import Stack from "./../../Components/UI/Layout/Stack/Stack";

import Button from "./../../Components/UI/Button/Button";
import Card from "./../../Components/UI/Card/Card";
import { BiExit } from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCourseActions } from "../../redux/reducers/createCourse";
import { createCourseStepperActions } from "../../redux/reducers/createCourseStepper";
import api from "./../../services";
const BaseUI = ({
  children,
  title,
  backBtnProps,
  forwardBtnProps,
  backBtnText,
  forwardBtnText,
  cardStyles,
  contentStyles,
  submitbtntype,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseID = useSelector((state) => state.createCourse.currentCourdId);
  return (
    <Stack>
      <Card style={{ position: "relative", ...cardStyles }} title={title}>
        <Tooltip title="Exit Course Creation">
          <IconButton
            onClick={(e) => {
              dispatch(createCourseActions.reset());
              dispatch(createCourseStepperActions.resetPage());
              const deleteCourse = api.delete.deleteGivenCourse(courseID);
              if (!deleteCourse.error) {
                navigate("/courses", {
                  replace: "true",
                });
              }
            }}
            sx={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            <BiExit />
          </IconButton>
        </Tooltip>
        <Stack style={{ ...contentStyles }} sx={{ m: "1rem 0" }}>
          {children}
        </Stack>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button {...backBtnProps}>{backBtnText}</Button>
          <Button {...forwardBtnProps} type={submitbtntype}>
            {forwardBtnText}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};

BaseUI.propTypes = {
  backBtnProps: PropTypes.object,
  backBtnText: PropTypes.string,
  children: PropTypes.any,
  // forwardBtnProps: PropTypes.object,
  forwardBtnText: PropTypes.string,
  title: PropTypes.string,
};

BaseUI.defaultProps = {
  backBtnProps: {},
  backBtnText: "Previous",
  forwardBtnProps: {},
  forwardBtnText: "Next",
  children: <div>no props given</div>,
  title: "No Title Given",
  submitbtntype: "submit",
};

export default BaseUI;
