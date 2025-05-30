import * as React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.label, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
Label.displayName = "Label";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
});

export { Label };
