import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, Box } from "@mui/material";
import { ReactNode } from "react";

interface DestructiveActionPromptSuccessProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode
}

function DestructiveActionPromptSuccess({ open, children, onClose }: DestructiveActionPromptSuccessProps){
  return (
    <Modal open={open} aria-labelledby="confirm-modal-title" onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#FFFFFF",
          boxShadow: 24,
          outline: "none",
          borderRadius: 4,
          p: 4,
          maxWidth: 380,
          width: "90%",
          textAlign: "center",
        }}
      >
        <button onClick={onClose} className="absolute mx-0 w-fit right-4 top-4 text-primary-grayDark hover:text-red-700 focus:text-red-700">
          <Icon icon="material-symbols:close-rounded" width="24" height="24" />
        </button>
        <div className="flex justify-center items-center flex-col md:px-8">
          {children}
        </div>
      </Box>
    </Modal>
  )
}

export default DestructiveActionPromptSuccess;
