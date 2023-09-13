import React from "react";
import Theme from "./Providers/ThemeProvider";
import { useSelector, useDispatch } from "react-redux";
import ApplicationRoutes from "./Routes/ApplicationRoutes";
import { modeActions } from "./redux/reducers/mode";
import { authActions } from "./redux/reducers/auth";
import Router from "./Providers/RouterProvider";
import SnackBarProvider from "./Providers/SnackBarProvider";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);

  React.useEffect(() => {
    localStorage.setItem("mode", mode);
  }, []);
  React.useEffect(() => {
    let localMode = localStorage.getItem("mode");
    let localAuth = localStorage.getItem("auth");
    if (localMode) {
      dispatch(modeActions.changeMode(localMode));
    }
    if (localAuth) {
      dispatch(authActions.toggleLogInHandler(localAuth));
    }
  }, []);
  const getPathHandler = (e) => {
    if (e === "/login" || e === "/signup") {
      return dispatch(modeActions.changeMode("light"));
    } else {
      return dispatch(modeActions.changeMode(localStorage.getItem("mode")));
    }
  };
  return (
    <SnackBarProvider>
      <Theme mode={mode}>
        <Router>
          <ApplicationRoutes getCurrentPath={getPathHandler} />
        </Router>
      </Theme>
    </SnackBarProvider>
  );
}

export default App;
