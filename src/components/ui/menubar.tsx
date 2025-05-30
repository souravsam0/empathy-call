import * as React from "react"
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface MenubarContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MenubarContext = React.createContext<MenubarContextValue>({
  open: false,
  onOpenChange: () => {},
})

interface MenubarProps {
  style?: ViewStyle
  children: React.ReactNode
}

const Menubar = React.forwardRef<View, MenubarProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
    ref={ref}
        style={[styles.menubar, style]}
    {...props}
      >
        {children}
      </View>
    )
  }
)

Menubar.displayName = "Menubar"

interface MenubarTriggerProps {
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

const MenubarTrigger = React.forwardRef<View, MenubarTriggerProps>(
  ({ children, style, textStyle, ...props }, ref) => {
    const { onOpenChange } = React.useContext(MenubarContext)

    return (
      <TouchableOpacity
    ref={ref}
        onPress={() => onOpenChange(true)}
        style={[styles.trigger, style]}
    {...props}
      >
        <Text style={[styles.triggerText, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

MenubarTrigger.displayName = "MenubarTrigger"

interface MenubarContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

const MenubarContent = React.forwardRef<View, MenubarContentProps>(
  ({ children, style, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(MenubarContext)

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => onOpenChange(false)}
        >
          <View
    ref={ref}
            style={[styles.content, style]}
    {...props}
  >
    {children}
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
)

MenubarContent.displayName = "MenubarContent"

interface MenubarItemProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  inset?: boolean
}

const MenubarItem = React.forwardRef<View, MenubarItemProps>(
  ({ children, onPress, style, textStyle, inset, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.item, inset && styles.itemInset, style]}
        {...props}
      >
        <Text style={[styles.itemText, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

MenubarItem.displayName = "MenubarItem"

interface MenubarCheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const MenubarCheckboxItem = React.forwardRef<View, MenubarCheckboxItemProps>(
  ({ children, checked, onPress, style, textStyle, ...props }, ref) => {
    return (
      <TouchableOpacity
    ref={ref}
        onPress={onPress}
        style={[styles.item, styles.checkboxItem, style]}
    {...props}
  >
        <View style={styles.checkboxIndicator}>
          {checked && (
            <Ionicons name="checkmark" size={16} color="#3b82f6" />
          )}
        </View>
        <Text style={[styles.itemText, textStyle]}>
    {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

interface MenubarRadioItemProps {
  children: React.ReactNode
  checked?: boolean
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const MenubarRadioItem = React.forwardRef<View, MenubarRadioItemProps>(
  ({ children, checked, onPress, style, textStyle, ...props }, ref) => {
    return (
      <TouchableOpacity
    ref={ref}
        onPress={onPress}
        style={[styles.item, styles.radioItem, style]}
    {...props}
  >
        <View style={styles.radioIndicator}>
          {checked && (
            <View style={styles.radioIndicatorInner} />
          )}
        </View>
        <Text style={[styles.itemText, textStyle]}>
    {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

MenubarRadioItem.displayName = "MenubarRadioItem"

interface MenubarLabelProps {
  children: React.ReactNode
  style?: TextStyle
    inset?: boolean
  }

const MenubarLabel = React.forwardRef<Text, MenubarLabelProps>(
  ({ children, style, inset, ...props }, ref) => {
    return (
      <Text
    ref={ref}
        style={[styles.label, inset && styles.labelInset, style]}
    {...props}
      >
        {children}
      </Text>
    )
  }
)

MenubarLabel.displayName = "MenubarLabel"

interface MenubarSeparatorProps {
  style?: ViewStyle
}

const MenubarSeparator = React.forwardRef<View, MenubarSeparatorProps>(
  ({ style, ...props }, ref) => {
  return (
      <View
        ref={ref}
        style={[styles.separator, style]}
      {...props}
    />
  )
}
)

MenubarSeparator.displayName = "MenubarSeparator"

interface MenubarShortcutProps {
  children: React.ReactNode
  style?: TextStyle
}

const MenubarShortcut = React.forwardRef<Text, MenubarShortcutProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.shortcut, style]}
        {...props}
      >
        {children}
      </Text>
    )
  }
)

MenubarShortcut.displayName = "MenubarShortcut"

const styles = StyleSheet.create({
  menubar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    padding: 4,
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 4,
    minWidth: 192,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemText: {
    fontSize: 14,
    color: "#1f2937",
  },
  checkboxItem: {
    paddingLeft: 32,
  },
  checkboxIndicator: {
    position: "absolute",
    left: 8,
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  radioItem: {
    paddingLeft: 32,
  },
  radioIndicator: {
    position: "absolute",
    left: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioIndicatorInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6b7280",
  },
})

export {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
}
