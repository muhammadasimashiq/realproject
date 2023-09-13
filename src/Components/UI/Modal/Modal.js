import PropTypes from "prop-types";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Card from "../Card/Card";

const Content = styled(Box)(({ theme, width }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: width,
  background: "white",
  border: "2px solid #000",
  padding: "10px",
  borderRadius: 5,
  position: "relative",
  minHeight: "150px",
}));

const CrossButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 5,
  right: 5,
  cursor: "pointer",
}));

export default function Model({
  title,
  open,
  handleClose,
  children,
  width,
  ...props
}) {
  return (
    <div>
      <Modal
        {...props}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Content width={width}>
          <CrossButton onClick={handleClose}>
            <CloseIcon />
          </CrossButton>
          {children}
        </Content>
      </Modal>
    </div>
  );
}

Model.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.any.isRequired,
  open: PropTypes.any.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
};

Model.defaultProps = {
  title: "No title given in modal",
  width: 400,
};
