import * as React from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";

interface SkeletonProps {
  style?: ViewStyle;
  width?: number | "auto" | `${number}%`;
  height?: number | "auto" | `${number}%`;
}

function Skeleton({ style, width, height, ...props }: SkeletonProps) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          opacity,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
});

export { Skeleton };
