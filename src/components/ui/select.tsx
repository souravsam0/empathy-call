import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        selectedValue,
        onValueChange: handleValueChange,
      }}
  >
    {children}
    </SelectContext.Provider>
  );
};

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue?: string;
  onValueChange: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
}

interface SelectTriggerProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  placeholder?: string;
  children?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<View, SelectTriggerProps>(
  ({ style, textStyle, placeholder, children, ...props }, ref) => {
    const { open, setOpen, selectedValue } = useSelect();

    return (
      <TouchableOpacity
    ref={ref}
        style={[styles.trigger, style]}
        onPress={() => setOpen(!open)}
    {...props}
  >
        <Text style={[styles.triggerText, textStyle]}>
          {selectedValue || placeholder || "Select an option"}
        </Text>
        <Text style={styles.triggerIcon}>▼</Text>
      </TouchableOpacity>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const SelectContent = React.forwardRef<View, SelectContentProps>(
  ({ style, children, ...props }, ref) => {
    const { open, setOpen } = useSelect();
    const insets = useSafeAreaInsets();

    if (!open) return null;

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View
    ref={ref}
            style={[
              styles.content,
              {
                marginTop: insets.top,
                marginBottom: insets.bottom,
              },
              style,
            ]}
    {...props}
  >
            <ScrollView style={styles.scrollView}>{children}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);
SelectContent.displayName = "SelectContent";

interface SelectItemProps {
  value: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const SelectItem = React.forwardRef<View, SelectItemProps>(
  ({ value, style, textStyle, children, ...props }, ref) => {
    const { selectedValue, onValueChange } = useSelect();
    const isSelected = value === selectedValue;

    return (
      <TouchableOpacity
      ref={ref}
        style={[
          styles.item,
          isSelected && styles.itemSelected,
          style,
        ]}
        onPress={() => onValueChange(value)}
      {...props}
      >
        <Text
          style={[
            styles.itemText,
            isSelected && styles.itemTextSelected,
            textStyle,
          ]}
      >
        {children}
        </Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  }
);
SelectItem.displayName = "SelectItem";

interface SelectLabelProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const SelectLabel = React.forwardRef<Text, SelectLabelProps>(
  ({ style, children, ...props }, ref) => (
    <Text ref={ref} style={[styles.label, style]} {...props}>
      {children}
    </Text>
  )
);
SelectLabel.displayName = "SelectLabel";

interface SelectSeparatorProps {
  style?: ViewStyle;
}

const SelectSeparator = React.forwardRef<View, SelectSeparatorProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.separator, style]} {...props} />
  )
);
SelectSeparator.displayName = "SelectSeparator";

const styles = StyleSheet.create({
  trigger: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  triggerText: {
    fontSize: 14,
    color: "#111827",
  },
  triggerIcon: {
    fontSize: 12,
    color: "#6b7280",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    margin: 16,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    maxHeight: 300,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemSelected: {
    backgroundColor: "#f3f4f6",
  },
  itemText: {
    fontSize: 14,
    color: "#111827",
  },
  itemTextSelected: {
    color: "#111827",
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 14,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
};
