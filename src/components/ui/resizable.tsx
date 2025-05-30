import * as React from "react";
import { View, StyleSheet, ViewStyle, PanResponder, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ResizablePanelGroupProps {
  direction?: "horizontal" | "vertical";
  style?: ViewStyle;
  children: React.ReactNode;
}

const ResizablePanelGroup = React.forwardRef<View, ResizablePanelGroupProps>(
  ({ direction = "horizontal", style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.panelGroup,
          direction === "vertical" ? styles.vertical : styles.horizontal,
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ResizablePanel = React.forwardRef<View, ResizablePanelProps>(
  ({ defaultSize = 50, minSize = 20, maxSize = 80, style, children, ...props }, ref) => {
    const [size, setSize] = React.useState(defaultSize);
    const pan = React.useRef(new Animated.Value(0)).current;

    const panResponder = React.useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          const newSize = size + (gestureState.dx / 100) * (maxSize - minSize);
          if (newSize >= minSize && newSize <= maxSize) {
            setSize(newSize);
          }
        },
      })
    ).current;

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.panel,
          { flex: size },
          style,
        ]}
        {...panResponder.panHandlers}
        {...props}
      >
        {children}
      </Animated.View>
    );
  }
);

ResizablePanel.displayName = "ResizablePanel";

interface ResizableHandleProps {
  withHandle?: boolean;
  style?: ViewStyle;
}

const ResizableHandle = React.forwardRef<View, ResizableHandleProps>(
  ({ withHandle = false, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.handle, style]}
        {...props}
      >
        {withHandle && (
          <View style={styles.handleIcon}>
            <Ionicons name="menu" size={16} color="#6b7280" />
          </View>
        )}
      </View>
    );
  }
);

ResizableHandle.displayName = "ResizableHandle";

const styles = StyleSheet.create({
  panelGroup: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
  },
  panel: {
    flex: 1,
  },
  handle: {
    width: 1,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  handleIcon: {
    width: 12,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
