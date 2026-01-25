import { Toaster } from "react-hot-toast";

function Toast({ position = "top-right", toasterId }) {
  return <Toaster position={position} toastOptions={{ id: toasterId }} />;
}

export default Toast;
