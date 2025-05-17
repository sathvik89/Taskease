// @/components/ui/use-toast.jsx
import { toast } from "react-hot-toast";

export function useToast() {
  return {
    toast,
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
    dismiss: () => toast.dismiss(),
  };
}
