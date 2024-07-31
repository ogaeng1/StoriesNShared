import "react-toastify/dist/ReactToastify.css";

import {
  Bounce,
  toast,
  ToastContainer as ToastOption,
  ToastOptions,
} from "react-toastify";

type TAlert = "success" | "warning" | "error" | "info";

function ToastContainer() {
  return (
    <ToastOption
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="light"
      transition={Bounce}
      limit={1}
    />
  );
}

function Toast({ message }: { message: string }) {
  return (
    <article>
      <h3 className="text-base">{message}</h3>
    </article>
  );
}

export const notify = (
  type: TAlert,
  message: string,
  options?: ToastOptions
) => {
  switch (type) {
    case "error":
      toast.error(<Toast message={message} />, options);
      break;
    case "success":
      toast.success(<Toast message={message} />, options);
      break;
    case "info":
      toast.info(<Toast message={message} />, options);
      break;
    case "warning":
      toast.warning(<Toast message={message} />, options);
      break;
    default:
      break;
  }
};

export default ToastContainer;
