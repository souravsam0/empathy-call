// src/components/ui/card.tsx
import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"

interface CardProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Card = React.forwardRef<View, CardProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.card, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
Card.displayName = "Card"

interface CardHeaderProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.header, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardHeader.displayName = "CardHeader"

interface CardTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const CardTitle = React.forwardRef<Text, CardTitleProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.title, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.description, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
CardDescription.displayName = "CardDescription"

interface CardContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const CardContent = React.forwardRef<View, CardContentProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.content, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardContent.displayName = "CardContent"

interface CardFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const CardFooter = React.forwardRef<View, CardFooterProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.footer, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardFooter.displayName = "CardFooter"

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }