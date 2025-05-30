import * as React from "react"
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface ToggleGroupContextValue {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
})

interface ToggleGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  style?: ViewStyle
  children: React.ReactNode
}

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  ({ value, onValueChange, variant = "default", size = "default", style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.toggleGroup, style]}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </View>
  )
)

ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps {
  value: string
  selectedValue?: string
  onValueChange?: (value: string) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  style?: ViewStyle
  textStyle?: TextStyle
  children: React.ReactNode
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, selectedValue, onValueChange, variant, size, style, textStyle, children, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected = value === selectedValue

    const handlePress = () => {
      if (onValueChange) {
        onValueChange(value)
      }
    }

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        style={[
          styles.base,
          styles[context.variant || variant || "default"],
          styles[context.size || size || "default"],
          isSelected && styles.selected,
          style,
        ]}
        {...props}
      >
        <Text
          style={[
            styles.text,
            isSelected && styles.selectedText,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

ToggleGroupItem.displayName = "ToggleGroupItem"

const styles = StyleSheet.create({
  toggleGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  default: {
    backgroundColor: "transparent",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "transparent",
  },
  defaultSize: {
    height: 40,
    paddingHorizontal: 12,
  },
  sm: {
    height: 36,
    paddingHorizontal: 10,
  },
  lg: {
    height: 44,
    paddingHorizontal: 20,
  },
  selected: {
    backgroundColor: "#f1f5f9",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  selectedText: {
    color: "#0f172a",
  },
})

export { ToggleGroup, ToggleGroupItem }
