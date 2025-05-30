import * as React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ checked, onCheckedChange, disabled, style, ...props }, ref) => {
    return (
      <TouchableOpacity
        onPress={() => !disabled && onCheckedChange?.(!checked)}
        disabled={disabled}
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {checked && (
          <Ionicons
            name="checkmark"
            size={16}
            color={disabled ? "#9ca3af" : "#ffffff"}
          />
        )}
      </TouchableOpacity>
    );
  }
);
Checkbox.displayName = "Checkbox";

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
  },
});

export { Checkbox };
