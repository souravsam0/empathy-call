import * as React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({
    value,
    onChangeText,
    placeholder,
    style,
    textStyle,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    multiline,
    numberOfLines,
    ...props
  }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, textStyle, style]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    fontSize: 14,
    color: "#1f2937",
  },
});

export { Input };
