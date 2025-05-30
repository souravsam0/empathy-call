import * as React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ToggleProps>(
  ({ pressed, onPressedChange, style, textStyle, children, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed);

    const handlePress = () => {
      const newValue = !isPressed;
      setIsPressed(newValue);
      onPressedChange?.(newValue);
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.toggle,
          isPressed && styles.pressed,
          style,
        ]}
        onPress={handlePress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

Toggle.displayName = "Toggle";

const styles = StyleSheet.create({
  toggle: {
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
  },
});

export { Toggle };
