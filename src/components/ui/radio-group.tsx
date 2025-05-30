import * as React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  value: undefined,
  onValueChange: () => {},
});

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

const RadioGroup = React.forwardRef<View, RadioGroupProps>(
  ({ value, onValueChange, style, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <View
          ref={ref}
          style={[styles.group, style]}
          {...props}
        >
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const RadioGroupItem = React.forwardRef<View, RadioGroupItemProps>(
  ({ value, disabled = false, style, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext);
    const isSelected = value === selectedValue;

    return (
      <TouchableOpacity
        ref={ref}
        onPress={() => !disabled && onValueChange?.(value)}
        disabled={disabled}
        style={[
          styles.item,
          isSelected && styles.itemSelected,
          disabled && styles.itemDisabled,
          style,
        ]}
        {...props}
      >
        {isSelected && (
          <View style={styles.indicator}>
            <Ionicons name="radio-button-on" size={16} color="#3b82f6" />
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

const styles = StyleSheet.create({
  group: {
    gap: 8,
  },
  item: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  itemSelected: {
    backgroundColor: "transparent",
  },
  itemDisabled: {
    opacity: 0.5,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
  },
});

export { RadioGroup, RadioGroupItem };
