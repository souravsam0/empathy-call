import * as React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface TextareaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  numberOfLines?: number;
  maxLength?: number;
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({
    value,
    onChangeText,
    placeholder,
    style,
    textStyle,
    numberOfLines = 4,
    maxLength,
    ...props
  }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textarea, textStyle, style]}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        textAlignVertical="top"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const styles = StyleSheet.create({
  textarea: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    fontSize: 14,
    color: "#1f2937",
    minHeight: 100,
  },
});

export { Textarea };
