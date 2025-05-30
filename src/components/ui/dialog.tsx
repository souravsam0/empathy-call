import * as React from "react"
import { View, Modal, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({ open: false, setOpen: () => {} })

interface DialogProps {
  children: React.ReactNode
  style?: ViewStyle
}

const Dialog: React.FC<DialogProps> = ({ children, style }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <View style={style}>{children}</View>
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps {
  children: React.ReactNode
  style?: ViewStyle
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, style }) => {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <TouchableOpacity style={style} onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

const DialogContent: React.FC<DialogContentProps> = ({ children, style }) => {
  const { open, setOpen } = React.useContext(DialogContext)
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.content, style]}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
      {children}
        </View>
      </View>
    </Modal>
  )
}

const DialogHeader: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
)

const DialogFooter: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
)

const DialogTitle: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
)

const DialogDescription: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({ children, style }) => (
  <Text style={[styles.description, style]}>{children}</Text>
)

const DialogClose: React.FC<{ children?: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <TouchableOpacity style={style} onPress={() => setOpen(false)}>
      {children ? children : <Ionicons name="close" size={24} color="#6b7280" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minWidth: 300,
    maxWidth: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 8,
  },
})

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
