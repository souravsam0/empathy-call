import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs = ({ defaultValue, value, onValueChange, children }: TabsProps) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <View style={styles.tabs}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            selectedValue,
            onValueChange: handleValueChange,
          });
        }
        return child;
      })}
    </View>
  );
};

interface TabsListProps {
  style?: ViewStyle;
  children: React.ReactNode;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const TabsList = React.forwardRef<View, TabsListProps>(
  ({ style, children, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.tabsList, style]}
      {...props}
    >
      {children}
    </View>
  )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps {
  value: string;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<View, TabsTriggerProps>(
  ({ value, selectedValue, onValueChange, style, textStyle, children, ...props }, ref) => {
    const isSelected = value === selectedValue;

    return (
      <TouchableOpacity
        ref={ref}
        onPress={() => onValueChange?.(value)}
        style={[
          styles.tabsTrigger,
          isSelected && styles.tabsTriggerActive,
          style,
        ]}
        {...props}
      >
        <Text
          style={[
            styles.tabsTriggerText,
            isSelected && styles.tabsTriggerTextActive,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  value: string;
  selectedValue?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ value, selectedValue, style, children, ...props }, ref) => {
    if (value !== selectedValue) return null;

    return (
      <View
        ref={ref}
        style={[styles.tabsContent, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
TabsContent.displayName = "TabsContent";

const styles = StyleSheet.create({
  tabs: {
    width: '100%',
  },
  tabsList: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  tabsTrigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabsTriggerActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabsTriggerTextActive: {
    color: '#111827',
  },
  tabsContent: {
    marginTop: 8,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
