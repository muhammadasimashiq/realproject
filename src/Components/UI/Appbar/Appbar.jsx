import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Nav, Icons } from "./Appbar.style";
import { modeActions } from "../../../redux/reducers/mode";
import { authActions } from "../../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import constants from "../../../config/constants";

const Appbar = ({ drawerWidth, handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);
  const toggleThemeHandler = (e) => {
    e.preventDefault();
    dispatch(modeActions.changeMode(mode === "light" ? "dark" : "light"));
    localStorage.setItem("mode", mode === "light" ? "dark" : "light");
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.toggleLogInHandler("false"));
    localStorage.clear();
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Nav>
            <Typography
              sx={{ flexGrow: 1 }}
              variant="h6"
              noWrap
              component="div"
            >
              {constants.title}
            </Typography>
            <Icons>
              <IconButton onClick={toggleThemeHandler}>
                {mode === "light" ? (
                  <BsSunFill color="#fff" />
                ) : (
                  <BsFillMoonFill color="#fff" />
                )}
              </IconButton>
              <IconButton onClick={logoutHandler}>
                <FaUserCircle color="#fff" />
              </IconButton>
            </Icons>
          </Nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Appbar;
