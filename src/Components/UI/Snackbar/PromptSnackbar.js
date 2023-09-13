import React from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/system";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ButtonWrapper = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1.25)
}));
const SnackButton = styled(Button)(({ theme }) => ({
    background:"white",
    color:"black",
      "&:hover": {
           backgroundColor: '#e9e9e9' ,
      }


}));

const PromptSnackbar = ({state, setState, triggerYes, clickHandler, severity, children}) => {
//   const [state, setState] = React.useState({
//     open: false,
//     vertical: "top",
//     horizontal: "center",
//   });

  const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const clickHandle = () => {
    clickHandler()
  }

  return (
    <>  
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity= {severity}>
          {/* Do you want to Delete this Category? */}
          {children}
          <ButtonWrapper>
            {/* <SnackButton variant="contained" size="small" onClick={e => {
                handleClose(e)
                triggerYes()
            }}> */}
             <SnackButton variant="contained" size="small" onClick={clickHandle}> 
              Yes
            </SnackButton>
            <SnackButton variant="contained" size="small" onClick={handleClose}>
              No
            </SnackButton>
          </ButtonWrapper>
        </Alert>
      </Snackbar>
    </>
  );
};

export default PromptSnackbar;

PromptSnackbar.propTypes = {

    severity: PropTypes.string,
    clickHandler: PropTypes.func
   
  };
  PromptSnackbar.defaultProps = {
    severity: "warning",
    clickHandler: ()=> console.log("no action given")
   
  
    
  
  };