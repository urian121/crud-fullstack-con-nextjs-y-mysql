import { showToast } from "nextjs-toast-notify";

// Configuración por defecto para todas las notificaciones
const defaultConfig = {
  duration: 5000,
  progress: true,
  position: "top-right",
  transition: "swingInverted",
  sound: true,
};

const useToast = () => {
  const success = (message) => {
    showToast.success(message, defaultConfig);
  };

  const error = (message) => {
    showToast.error(message, defaultConfig);
  };

  return { success, error };
};

export default useToast;