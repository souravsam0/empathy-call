import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const Badge = React.forwardRef<View, BadgeProps>(
  ({ variant = "default", style, textStyle, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.badge,
          styles[variant],
          style,
        ]}
        {...props}
      >
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {children}
        </Text>
      </View>
    );
  }
);
Badge.displayName = "Badge";

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#3b82f6",
  },
  secondary: {
    backgroundColor: "#6b7280",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  defaultText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#ffffff",
  },
  destructiveText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#374151",
  },
});

export { Badge };
