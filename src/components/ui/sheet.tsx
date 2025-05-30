import * as React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      {children}
    </Modal>
  );
};

interface SheetContentProps {
  side?: "top" | "bottom" | "left" | "right";
  style?: ViewStyle;
  children: React.ReactNode;
  onClose: () => void;
}

const SheetContent = React.forwardRef<View, SheetContentProps>(
  ({ side = "right", style, children, onClose, ...props }, ref) => {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get("window");
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, []);

    const getSlideStyle = (): Animated.WithAnimatedObject<ViewStyle> => {
      const baseStyle: Animated.WithAnimatedObject<ViewStyle> = {
        position: "absolute",
        backgroundColor: "#ffffff",
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      };

      switch (side) {
        case "top":
          return {
            ...baseStyle,
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height, 0],
                }),
              },
            ],
          };
        case "bottom":
          return {
            ...baseStyle,
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          };
        case "left":
          return {
            ...baseStyle,
            left: 0,
            top: 0,
            bottom: 0,
            width: width * 0.75,
            borderRightWidth: 1,
            borderRightColor: "#e5e7eb",
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-width, 0],
                }),
              },
            ],
          };
        case "right":
          return {
            ...baseStyle,
            right: 0,
            top: 0,
            bottom: 0,
            width: width * 0.75,
            borderLeftWidth: 1,
            borderLeftColor: "#e5e7eb",
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
            ],
          };
      }
    };

    return (
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
      ref={ref}
          style={[getSlideStyle(), style]}
      {...props}
    >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {children}
        </Animated.View>
      </View>
    );
  }
);
SheetContent.displayName = "SheetContent";

interface SheetHeaderProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const SheetHeader = ({ style, children, ...props }: SheetHeaderProps) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);
SheetHeader.displayName = "SheetHeader";

interface SheetFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const SheetFooter = ({ style, children, ...props }: SheetFooterProps) => (
  <View style={[styles.footer, style]} {...props}>
    {children}
  </View>
);
SheetFooter.displayName = "SheetFooter";

interface SheetTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const SheetTitle = React.forwardRef<Text, SheetTitleProps>(
  ({ style, children, ...props }, ref) => (
    <Text ref={ref} style={[styles.title, style]} {...props}>
      {children}
    </Text>
  )
);
SheetTitle.displayName = "SheetTitle";

interface SheetDescriptionProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const SheetDescription = React.forwardRef<Text, SheetDescriptionProps>(
  ({ style, children, ...props }, ref) => (
    <Text ref={ref} style={[styles.description, style]} {...props}>
      {children}
    </Text>
  )
);
SheetDescription.displayName = "SheetDescription";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#6b7280",
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
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

