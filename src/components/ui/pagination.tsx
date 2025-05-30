import * as React from "react"
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface PaginationProps {
  style?: ViewStyle
  children: React.ReactNode
}

const Pagination = React.forwardRef<View, PaginationProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.pagination, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
Pagination.displayName = "Pagination"

interface PaginationContentProps {
  style?: ViewStyle
  children: React.ReactNode
}

const PaginationContent = React.forwardRef<View, PaginationContentProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.content, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
PaginationContent.displayName = "PaginationContent"

interface PaginationItemProps {
  style?: ViewStyle
  children: React.ReactNode
}

const PaginationItem = React.forwardRef<View, PaginationItemProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.item, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)
PaginationItem.displayName = "PaginationItem"

interface PaginationLinkProps {
  style?: ViewStyle
  textStyle?: TextStyle
  isActive?: boolean
  onPress?: () => void
  children: React.ReactNode
}

const PaginationLink = React.forwardRef<View, PaginationLinkProps>(
  ({ style, textStyle, isActive, onPress, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          styles.link,
          isActive ? styles.linkActive : styles.linkInactive,
          style,
        ]}
        {...props}
      >
        <Text style={[styles.linkText, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)
PaginationLink.displayName = "PaginationLink"

interface PaginationPreviousProps {
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
}

const PaginationPrevious = React.forwardRef<View, PaginationPreviousProps>(
  ({ style, textStyle, onPress, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.previous, style]}
        {...props}
      >
        <Ionicons name="chevron-back" size={16} color="#1f2937" />
        <Text style={[styles.previousText, textStyle]}>
          Previous
        </Text>
      </TouchableOpacity>
    )
  }
)
PaginationPrevious.displayName = "PaginationPrevious"

interface PaginationNextProps {
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
}

const PaginationNext = React.forwardRef<View, PaginationNextProps>(
  ({ style, textStyle, onPress, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.next, style]}
        {...props}
      >
        <Text style={[styles.nextText, textStyle]}>
          Next
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#1f2937" />
      </TouchableOpacity>
    )
  }
)
PaginationNext.displayName = "PaginationNext"

interface PaginationEllipsisProps {
  style?: ViewStyle
}

const PaginationEllipsis = React.forwardRef<View, PaginationEllipsisProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.ellipsis, style]}
        {...props}
      >
        <Ionicons name="ellipsis-horizontal" size={16} color="#1f2937" />
      </View>
    )
  }
)
PaginationEllipsis.displayName = "PaginationEllipsis"

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  item: {
    marginHorizontal: 2,
  },
  link: {
    height: 36,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  linkActive: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  linkInactive: {
    backgroundColor: "transparent",
  },
  linkText: {
    fontSize: 14,
    color: "#1f2937",
  },
  previous: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 10,
  },
  previousText: {
    fontSize: 14,
    color: "#1f2937",
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 10,
  },
  nextText: {
    fontSize: 14,
    color: "#1f2937",
  },
  ellipsis: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
})

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
