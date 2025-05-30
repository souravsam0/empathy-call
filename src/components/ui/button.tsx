import * as React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from "react-native"

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ 
    variant = 'default', 
    size = 'default', 
    onPress, 
    disabled = false,
    loading = false,
    children, 
    style,
    textStyle,
    ...props 
  }, ref) => {
    const buttonStyles = [
      styles.base,
      styles[variant],
      styles[`${size}Button`],
      disabled && styles.disabled,
      style,
    ]

    const textStyles = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}TextSize`],
      disabled && styles.disabledText,
      textStyle,
    ]

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        style={buttonStyles}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#3b82f6' : 'white'} />
        ) : (
          <Text style={textStyles}>{children}</Text>
        )}
      </TouchableOpacity>
    )
  }
)

Button.displayName = "Button"

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  // Variants
  default: {
    backgroundColor: '#3b82f6',
  },
  defaultText: {
    color: 'white',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  destructiveText: {
    color: 'white',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  outlineText: {
    color: '#3b82f6',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  secondaryText: {
    color: '#1f2937',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: '#3b82f6',
  },
  link: {
    backgroundColor: 'transparent',
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  // Sizes
  defaultButton: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  defaultTextSize: {
    fontSize: 14,
  },
  smButton: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  smTextSize: {
    fontSize: 13,
  },
  lgButton: {
    height: 44,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 6,
  },
  lgTextSize: {
    fontSize: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    padding: 0,
  },
  iconTextSize: {
    fontSize: 14,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
})

export { Button }
