import ToastContext from "../Contexts/ToastContext";

function ToastProvider({ children }) {

  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
