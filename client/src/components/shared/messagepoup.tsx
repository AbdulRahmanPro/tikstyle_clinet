import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const show_message = () => {
  toast.success('نجحت عملية تسجيل الدخول', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
