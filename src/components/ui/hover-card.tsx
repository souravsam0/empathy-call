import * as React from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface HoverCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const HoverCardContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

const HoverCard: React.FC<HoverCardProps> = ({ children, style }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <HoverCardContext.Provider value={{ open, setOpen }}>
      <View style={style}>{children}</View>
    </HoverCardContext.Provider>
  );
};

interface HoverCardTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({ children, style }) => {
  const { setOpen } = React.useContext(HoverCardContext);
  return (
    <TouchableOpacity style={style} onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
};

interface HoverCardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const HoverCardContent: React.FC<HoverCardContentProps> = ({ children, style, textStyle }) => {
  const { open, setOpen } = React.useContext(HoverCardContext);
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
        <View style={[styles.content, style]}>
          <Text style={textStyle}>{children}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minWidth: 200,
    minHeight: 60,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { HoverCard, HoverCardTrigger, HoverCardContent };
