import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface TooltipContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip = ({ children }: TooltipProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const TooltipTrigger = ({ children, style }: TooltipTriggerProps) => {
  const { onOpenChange } = React.useContext(TooltipContext);

  return (
    <TouchableOpacity
      onPress={() => onOpenChange(true)}
      onLongPress={() => onOpenChange(true)}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

interface TooltipContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const TooltipContent = React.forwardRef<View, TooltipContentProps>(
  ({ children, style, textStyle }, ref) => {
    const { open, onOpenChange } = React.useContext(TooltipContext);

    if (!open) return null;

    return (
      <View
        ref={ref}
        style={[styles.content, style]}
      >
        <Text style={[styles.text, textStyle]}>
          {children}
        </Text>
      </View>
    );
  }
);

TooltipContent.displayName = "TooltipContent";

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 50,
  },
  text: {
    fontSize: 14,
    color: '#1f2937',
  },
});

export { Tooltip, TooltipTrigger, TooltipContent };
