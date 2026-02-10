import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Modal(props) {
  const {
    open,
    onClose,
    payload,
    content,

    // OLD PROPS STILL SUPPORTED
    openProductDetailsModal,
    handleCloseProductDetailsModal,
    maxWidth,
    fullWidth,
  } = props;

  const isOpen = open ?? openProductDetailsModal;
  const handleClose = onClose ?? handleCloseProductDetailsModal;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {/* ===== CLOSE BUTTON ===== */}
      <div className="absolute top-3 right-3">
        <IconButton
          onClick={handleClose}
          size="medium"
          className="!bg-primary !text-white hover:!bg-primary/80 !min-w-[35px] !h-[35px] !w-[35px]"

        >
          <CloseIcon />
        </IconButton>
      </div>

      {/* ===== PURELY GENERIC RENDER ===== */}
      {content ? (
        content
      ) : (
        payload && (
          <pre style={{ padding: 16 }}>
            {JSON.stringify(payload, null, 2)}
          </pre>
        )
      )}
    </Dialog>
  );
}

export default Modal;
