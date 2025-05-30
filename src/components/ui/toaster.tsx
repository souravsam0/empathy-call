import { useToast } from "./use-toast"
import { Toast, ToastProvider, ToastViewport } from "./toast"

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  variant?: "default" | "destructive";
}

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }: ToastItem) => (
        <Toast
          key={id}
          title={title}
          description={description}
          action={action}
          onClose={() => removeToast(id)}
          {...props}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
