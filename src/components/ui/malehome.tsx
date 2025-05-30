import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Slider from "@react-native-community/slider";

interface MaleHomeProps {
  value?: number;
  onValueChange?: (value: number) => void;
  style?: ViewStyle;
}

const MaleHomeRoot: React.FC<MaleHomeProps> = ({ value, onValueChange, style }) => {
  return (
    <View style={[styles.root, style]}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
      />
    </View>
  );
};

const MaleHomeTrack: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.track, style]} />
);

const MaleHomeRange: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.range, style]} />
);

const MaleHomeThumb: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.thumb, style]} />
);

const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  track: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
  range: {
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
  },
});

export { MaleHomeRoot, MaleHomeTrack, MaleHomeRange, MaleHomeThumb }; 