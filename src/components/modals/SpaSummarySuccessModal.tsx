import { Modal, Box } from "@mui/material";

interface SpaSummarySuccessModalProps {
  open: boolean;
  onClose: () => void;
}

function SpaSummarySuccessModal({ open, onClose }: SpaSummarySuccessModalProps){
  return (
    <Modal open={open} aria-labelledby="confirm-modal-title">
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
          p: 3,
          maxWidth: 390,
          width: "90%",
          textAlign: "center",
        }}
      >
        <div className="flex justify-center items-center flex-col">
            <span className="text-8xl block text-center">🎉</span>
            <div className="text-center">
                <p id="aria-labelledby" className="text-xl font-bold text-primary-midGray mt-2 mb-1">Payment Successful!</p>
                <span className="font-light text-sm text-[#424F4A]">Your payment has been processed successfully. Thank you for choosing Radiant Repose.</span>
            </div>

            <button onClick={onClose} className="bg-primary-red text-primary-base_color1 font-medium rounded-lg hover:bg-red-600 hover:drop-shadow-md focus:bg-red-700 transition-all text-sm p-3 h-12 w-full mt-3">Generate Unique Code</button>
        </div>
      </Box>
    </Modal>
  )
}

export default SpaSummarySuccessModal;
