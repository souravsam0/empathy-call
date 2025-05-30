import * as React from "react"
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: {
    label: string
    onPress: () => void
  }
}

interface ToastProviderProps {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

interface ToastViewportProps {
  style?: ViewStyle
}

const ToastViewport = ({ style }: ToastViewportProps) => {
  const { toasts, removeToast } = React.useContext(ToastContext)

  return (
    <View style={[styles.viewport, style]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </View>
  )
}

interface ToastProps extends Omit<Toast, "id"> {
  onClose: () => void
  style?: ViewStyle
}

const Toast = React.forwardRef<View, ToastProps>(
  ({ title, description, variant = "default", action, onClose, style }, ref) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose())
      }, 5000)

      return () => clearTimeout(timer)
    }, [])

    return (
      <Animated.View
    ref={ref}
        style={[
          styles.toast,
          styles[variant],
          { opacity: fadeAnim },
          style,
        ]}
      >
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {action && (
          <TouchableOpacity
            onPress={action.onPress}
            style={styles.action}
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onClose}
          style={styles.close}
        >
          <Ionicons name="close" size={16} color="#6b7280" />
        </TouchableOpacity>
      </Animated.View>
    )
  }
)

Toast.displayName = "Toast"

const styles = StyleSheet.create({
  viewport: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    padding: 16,
    zIndex: 100,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  default: {
    backgroundColor: "white",
    borderColor: "#e5e7eb",
  },
  destructive: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
  },
  action: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  close: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
  },
})

export { ToastProvider, ToastViewport, Toast }
