import { inter } from "@/fonts";
import { Modal, Box } from "@mui/material";
import { Loader2 } from "lucide-react";

interface DestructiveActionPromptProps {
  open: boolean;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  processing: boolean
}

function DestructiveActionPrompt({ open, description, onConfirm, onCancel, processing }: DestructiveActionPromptProps){
  return (
    <Modal open={open} onClose={onCancel} aria-labelledby="confirm-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#FFFFFF",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          minWidth: 320,
          textAlign: "center",
        }}
      >
        <h5 id="confirm-modal-title" className="text-primary-dark_slate mb-3 lg:mb-4 text-sm md:text-base">
          Do you want to <span className="font-semibold"> {description}?</span>
        </h5>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "between", width: "100%" }}>
          <button
            onClick={onConfirm}
            disabled={processing}
            className={`w-full flex items-center justify-center gap-2 bg-primary-darkRed text-white font-medium text-sm py-3 rounded-lg transition hover:bg-red-700 ${
              processing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {processing ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Processing...
              </>
            ) : (
              "Yes, I do"
            )}
          </button>

          <button
            onClick={onCancel}
            disabled={processing} 
            className={`${inter.className} w-full bg-white text-primary-darkRed font-medium text-sm py-3 rounded-lg border border-primary-darkRed transition hover:bg-gray-100`}
          >
            Cancel
          </button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DestructiveActionPrompt;
