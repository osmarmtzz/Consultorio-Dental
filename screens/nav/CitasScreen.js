import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CitasScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/Background_Citas.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Gestión de Citas</Text>
        <Text style={styles.subtitle}>Elige una opción para continuar</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate("Calendario")}
          >
            <Ionicons name="calendar-outline" size={26} color="#fff" />
            <Text style={styles.buttonText}>Ver Calendario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("Agendar")}
          >
            <Ionicons name="add-circle-outline" size={26} color="#fff" />
            <Text style={styles.buttonText}>Agendar Nueva Cita</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    color: "#0B8791",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: "#444",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    maxWidth: 340,
    gap: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: "#0B8791",
  },
  secondaryButton: {
    backgroundColor: "#0A6F79",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 12,
  },
});
