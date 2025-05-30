import * as React from "react";
import { Switch as RNSwitch, StyleSheet, ViewStyle } from "react-native";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Switch = React.forwardRef<React.ElementRef<typeof RNSwitch>, SwitchProps>(
  ({ checked, onCheckedChange, disabled, style, ...props }, ref) => {
    return (
      <RNSwitch
        ref={ref}
        value={checked}
        onValueChange={onCheckedChange}
        disabled={disabled}
        style={[styles.switch, style]}
        trackColor={{ false: "#e5e7eb", true: "#3b82f6" }}
        thumbColor={checked ? "#ffffff" : "#ffffff"}
        ios_backgroundColor="#e5e7eb"
        {...props}
      />
    );
  }
);

Switch.displayName = "Switch";

const styles = StyleSheet.create({
  switch: {
    transform: [{ scale: 1 }],
  },
});

export { Switch };
