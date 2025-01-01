import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../SettingContext';
import Slider from '@react-native-community/slider';

export default function SettingPage() {
  const { colors, fontSize, isDarkMode, toggleDarkMode, changeFontSize } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.item_mode}>
        <Text style={{ color: colors.text, fontSize }}>Dark Mode</Text>
        <Switch
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <View style={styles.item_mode}>
        <Text style={{ color: colors.text, fontSize:fontSize }}>Font size</Text>
        <Text style={{ color: colors.text, fontSize:fontSize }}>{fontSize}</Text>
      </View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={16}
        maximumValue={40}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => changeFontSize(value)}
        value={fontSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_mode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    width: "90%",
    marginBottom: 20,
  },
});