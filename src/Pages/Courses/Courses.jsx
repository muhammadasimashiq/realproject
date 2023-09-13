import React from "react";
import Grid from "./../../Components/UI/Layout/Grid/Grid";
import Stack from "./../../Components/UI/Layout/Stack/Stack";
import Typography from "./../../Components/UI/Typography/Typography";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Components/UI/Button/Button";
import { IoMdAdd } from "react-icons/io";
import Divider from "@mui/material/Divider";
import { Outlet } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">All Courses</Typography>
          <ButtonComp
            onClick={(e) => {
              e.preventDefault();
              navigate("/create-course", { replace: true });
            }}
            width="13rem"
            size="medium"
          >
            <Stack
              direction="row"
              justifyContent="center"
              gap={1}
              alignItems="center"
            >
              <IoMdAdd sx={{ color: "#fff" }} />
              Add new course
            </Stack>
          </ButtonComp>
        </Stack>
        <Divider />
      </Grid>
      <Grid item container spacing={2} xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Courses;
