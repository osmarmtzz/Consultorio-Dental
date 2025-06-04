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
          <TouchableOpacity style={styles.button}>
            <Ionicons name="calendar-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Ver Calendario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondary]}
            onPress={() => navigation.navigate("Agendar")}
          >
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
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
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: "#0B8791",
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    maxWidth: 340,
    gap: 20,
  },
  button: {
    backgroundColor: "#0B8791",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  secondary: {
    backgroundColor: "#08707B",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
