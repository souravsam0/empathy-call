import * as React from "react";
import { ScrollView, View, StyleSheet, ViewStyle, ScrollViewProps } from "react-native";

interface ScrollAreaProps extends ScrollViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const ScrollArea = React.forwardRef<ScrollView, ScrollAreaProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <ScrollView
        ref={ref}
        style={[styles.scrollArea, style]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
      >
        <View style={styles.viewport}>
          {children}
        </View>
      </ScrollView>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  viewport: {
    flex: 1,
  },
});

export { ScrollArea };
