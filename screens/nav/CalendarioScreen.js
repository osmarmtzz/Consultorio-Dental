import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function CalendarioScreen() {
  return (
    <View style={styles.container}>
      <Text>Servicios disponibles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
