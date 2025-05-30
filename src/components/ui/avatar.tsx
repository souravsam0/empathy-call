import * as React from "react";
import { View, Text, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface AvatarProps {
  src?: string;
  alt?: string;
  style?: ViewStyle;
  size?: number;
}

const Avatar = React.forwardRef<View, AvatarProps>(
  ({ src, alt, style, size = 40, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    if (src && !error) {
      return (
        <Image
          source={{ uri: src }}
          style={[
            styles.avatar as ImageStyle,
            { width: size, height: size, borderRadius: size / 2 } as ImageStyle,
            style as ImageStyle,
          ]}
          onError={() => setError(true)}
          {...props}
        />
      );
    }

    return (
      <View
        ref={ref}
        style={[
          styles.avatar,
          styles.fallback,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
        {...props}
      >
        <Text style={[styles.fallbackText, { fontSize: size * 0.4 }]}>
          {alt?.charAt(0).toUpperCase() || "?"}
        </Text>
      </View>
    );
  }
);
Avatar.displayName = "Avatar";

interface AvatarImageProps {
  src: string;
  alt?: string;
  style?: ImageStyle;
}

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ src, alt, style, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        source={{ uri: src }}
        style={[styles.avatar as ImageStyle, style]}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ style, textStyle, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.avatar, styles.fallback, style]}
        {...props}
      >
        <Text style={[styles.fallbackText, textStyle]}>
          {children}
        </Text>
      </View>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  fallback: {
    backgroundColor: "#e5e7eb",
  },
  fallbackText: {
    color: "#6b7280",
    fontWeight: "500",
  },
});

export { Avatar, AvatarImage, AvatarFallback };
