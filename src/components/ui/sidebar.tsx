import * as React from "react"
import { View, StyleSheet, ViewStyle, Dimensions, Animated } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SIDEBAR_WIDTH = 256 // 16rem
const SIDEBAR_WIDTH_MOBILE = 288 // 18rem
const SIDEBAR_WIDTH_ICON = 48 // 3rem

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProviderProps {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  style?: ViewStyle
  children: React.ReactNode
  }

const SidebarProvider = React.forwardRef<View, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(
      Dimensions.get("window").width < 768
    )
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Handle screen size changes
    React.useEffect(() => {
      const subscription = Dimensions.addEventListener("change", ({ window }) => {
        setIsMobile(window.width < 768)
      })
      return () => subscription.remove()
    }, [])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <View
            ref={ref}
          style={[styles.sidebarWrapper, style]}
            {...props}
          >
            {children}
        </View>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

interface SidebarProps {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  style?: ViewStyle
  children: React.ReactNode
  }

const Sidebar = React.forwardRef<View, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
    const insets = useSafeAreaInsets()
    const animatedWidth = React.useRef(new Animated.Value(SIDEBAR_WIDTH)).current

    React.useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [state])

    if (collapsible === "none") {
      return (
        <View
          style={[
            styles.sidebar,
            { width: SIDEBAR_WIDTH },
            style,
          ]}
          ref={ref}
          {...props}
        >
          {children}
        </View>
      )
    }

    if (isMobile) {
      return (
        <View
          style={[
            styles.mobileSidebar,
            {
              width: SIDEBAR_WIDTH_MOBILE,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
            style,
          ]}
          {...props}
        >
          {children}
        </View>
      )
    }

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.sidebar,
          {
            width: animatedWidth,
            [side]: 0,
          },
          variant === "floating" && styles.floatingSidebar,
          variant === "inset" && styles.insetSidebar,
          style,
        ]}
        {...props}
      >
        <View style={styles.sidebarContent}>{children}</View>
      </Animated.View>
    )
  }
)
Sidebar.displayName = "Sidebar"

const styles = StyleSheet.create({
  sidebarWrapper: {
    flex: 1,
    minHeight: "100%",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  floatingSidebar: {
    margin: 8,
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
  insetSidebar: {
    margin: 8,
    borderRadius: 8,
  },
  sidebarContent: {
    flex: 1,
    flexDirection: "column",
  },
})

export { SidebarProvider, Sidebar, useSidebar }
