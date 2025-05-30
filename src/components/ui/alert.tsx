import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertProps {
  variant?: "default" | "destructive";
  style?: ViewStyle;
  children: React.ReactNode;
}

const Alert = React.forwardRef<View, AlertProps>(
  ({ variant = "default", style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.alert,
          styles[variant],
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
Alert.displayName = "Alert";

interface AlertTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const AlertTitle = React.forwardRef<Text, AlertTitleProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.title, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const AlertDescription = React.forwardRef<Text, AlertDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.description, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
AlertDescription.displayName = "AlertDescription";

interface AlertIconProps {
  name: keyof typeof Ionicons.glyphMap;
  style?: TextStyle;
}

const AlertIcon = ({ name, style }: AlertIconProps) => {
  return (
    <Ionicons
      name={name}
      size={16}
      style={[styles.icon, style]}
    />
  );
};
AlertIcon.displayName = "AlertIcon";

const styles = StyleSheet.create({
  alert: {
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  default: {
    backgroundColor: "#f0f9ff",
    borderColor: "#bae6fd",
  },
  destructive: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0c4a6e",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#0369a1",
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
    color: "#0c4a6e",
  },
});

export { Alert, AlertTitle, AlertDescription, AlertIcon };
