import * as React from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = React.createContext<DrawerContextValue>({ open: false, setOpen: () => {} });

interface DrawerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Drawer: React.FC<DrawerProps> = ({ children, style }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <View style={style}>{children}</View>
    </DrawerContext.Provider>
  );
};

interface DrawerTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children, style }) => {
  const { setOpen } = React.useContext(DrawerContext);
  return (
    <TouchableOpacity style={style} onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
};

interface DrawerContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ children, style }) => {
  const { open, setOpen } = React.useContext(DrawerContext);
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.content, style]}>
          <View style={styles.handle} />
      {children}
        </View>
      </View>
    </Modal>
  );
};

const DrawerHeader: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
);

const DrawerFooter: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const DrawerTitle: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

const DrawerDescription: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({ children, style }) => (
  <Text style={[styles.description, style]}>{children}</Text>
);

const DrawerClose: React.FC<{ children?: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const { setOpen } = React.useContext(DrawerContext);
  return (
    <TouchableOpacity style={style} onPress={() => setOpen(false)}>
      {children ? children : <Ionicons name="close" size={24} color="#6b7280" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
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
});

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};
