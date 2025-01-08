import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from "@mui/material";

interface BasicModalProps {
  openModal: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = ({
  openModal,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "50px",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "60%",
          height: "80%",
          overflow: "auto",
         
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#e6852c", 
          }}
        >
          <CloseIcon/>
        </IconButton>

        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;


  