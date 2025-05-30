import * as React from "react";
import { View, TouchableOpacity, Modal, StyleSheet, ViewStyle, Animated } from "react-native";

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface PopoverProps {
  children: React.ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const PopoverTrigger = ({ children, style }: PopoverTriggerProps) => {
  const { onOpenChange } = React.useContext(PopoverContext);

  return (
    <TouchableOpacity
      onPress={() => onOpenChange(true)}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

interface PopoverContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContent = React.forwardRef<View, PopoverContentProps>(
  ({ children, style, align = "center", sideOffset = 4, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(PopoverContext);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (open) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [open]);

    return (
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={() => onOpenChange(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => onOpenChange(false)}
        >
          <Animated.View
            ref={ref}
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
              style,
            ]}
            {...props}
          >
            {children}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: 288,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export { Popover, PopoverTrigger, PopoverContent };
