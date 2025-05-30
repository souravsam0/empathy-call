import * as React from "react"
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Modal, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface NavigationMenuProps {
  style?: ViewStyle
  children: React.ReactNode
}

const NavigationMenu = React.forwardRef<View, NavigationMenuProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.root, style]}
        {...props}
      >
        {children}
      </View>
    )
  }
)

NavigationMenu.displayName = "NavigationMenu"

interface NavigationMenuListProps {
  style?: ViewStyle
  children: React.ReactNode
}

const NavigationMenuList = React.forwardRef<View, NavigationMenuListProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
    ref={ref}
        style={[styles.list, style]}
    {...props}
  >
    {children}
      </View>
    )
  }
)

NavigationMenuList.displayName = "NavigationMenuList"

interface NavigationMenuItemProps {
  style?: ViewStyle
  children: React.ReactNode
}

const NavigationMenuItem = React.forwardRef<View, NavigationMenuItemProps>(
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

NavigationMenuItem.displayName = "NavigationMenuItem"

interface NavigationMenuTriggerProps {
  style?: ViewStyle
  textStyle?: TextStyle
  children: React.ReactNode
  onPress?: () => void
}

const NavigationMenuTrigger = React.forwardRef<View, NavigationMenuTriggerProps>(
  ({ style, textStyle, children, onPress, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const rotateAnim = React.useRef(new Animated.Value(0)).current

    const handlePress = () => {
      setIsOpen(!isOpen)
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
      onPress?.()
    }

    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    })

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        style={[styles.trigger, style]}
        {...props}
      >
        <Text style={[styles.triggerText, textStyle]}>
          {children}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={12} color="#1f2937" />
        </Animated.View>
      </TouchableOpacity>
    )
  }
)

NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

interface NavigationMenuContentProps {
  style?: ViewStyle
  children: React.ReactNode
}

const NavigationMenuContent = React.forwardRef<View, NavigationMenuContentProps>(
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

NavigationMenuContent.displayName = "NavigationMenuContent"

interface NavigationMenuLinkProps {
  style?: ViewStyle
  textStyle?: TextStyle
  children: React.ReactNode
  onPress?: () => void
}

const NavigationMenuLink = React.forwardRef<View, NavigationMenuLinkProps>(
  ({ style, textStyle, children, onPress, ...props }, ref) => {
    return (
      <TouchableOpacity
    ref={ref}
        onPress={onPress}
        style={[styles.link, style]}
    {...props}
      >
        <Text style={[styles.linkText, textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
)

NavigationMenuLink.displayName = "NavigationMenuLink"

interface NavigationMenuViewportProps {
  style?: ViewStyle
  children: React.ReactNode
}

const NavigationMenuViewport = React.forwardRef<View, NavigationMenuViewportProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
      ref={ref}
        style={[styles.viewport, style]}
      {...props}
      >
        {children}
      </View>
    )
  }
)

NavigationMenuViewport.displayName = "NavigationMenuViewport"

interface NavigationMenuIndicatorProps {
  style?: ViewStyle
}

const NavigationMenuIndicator = React.forwardRef<View, NavigationMenuIndicatorProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
    ref={ref}
        style={[styles.indicator, style]}
    {...props}
  >
        <View style={styles.indicatorInner} />
      </View>
    )
  }
)

NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

const styles = StyleSheet.create({
  root: {
    position: "relative",
    zIndex: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  item: {
    marginHorizontal: 2,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginRight: 4,
  },
  content: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
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
  link: {
    padding: 12,
  },
  linkText: {
    fontSize: 14,
    color: "#1f2937",
  },
  viewport: {
    position: "absolute",
    left: 0,
    top: "100%",
    width: "100%",
    marginTop: 6,
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
  indicator: {
    position: "absolute",
    top: "100%",
    zIndex: 1,
    height: 6,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  indicatorInner: {
    position: "relative",
    top: "60%",
    width: 8,
    height: 8,
    transform: [{ rotate: "45deg" }],
    backgroundColor: "#e5e7eb",
    borderTopLeftRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
