import * as React from "react";
import { View, StyleSheet, ViewStyle, Animated } from "react-native";

interface ProgressProps {
  value?: number;
  style?: ViewStyle;
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value = 0, style, ...props }, ref) => {
    const width = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(width, {
        toValue: value,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [value]);

    return (
      <View
        ref={ref}
        style={[styles.root, style]}
        {...props}
      >
        <Animated.View
          style={[
            styles.indicator,
            {
              width: width.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

const styles = StyleSheet.create({
  root: {
    height: 16,
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
});

export { Progress };
