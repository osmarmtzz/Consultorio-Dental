import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen({ navigation }) {
  const paciente = {
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    telefono: "+52 449 123 4567",
    nacimiento: "1990-03-12",
    genero: "Masculino",
    foto: require("../../assets/Background_Login.png"),
  };

  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Salir",
        style: "destructive",
        onPress: () => {
          // Aquí puedes limpiar tokens, AsyncStorage, etc.
          navigation.replace("Login"); // ✅ lleva al login limpiamente
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={paciente.foto} style={styles.avatar} />

      <Text style={styles.nombre}>{paciente.nombre}</Text>
      <Text style={styles.label}>{paciente.correo}</Text>
      <Text style={styles.label}>{paciente.telefono}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Fecha de nacimiento</Text>
        <Text style={styles.infoValue}>{paciente.nacimiento}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Género</Text>
        <Text style={styles.infoValue}>{paciente.genero}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F9F9",
    alignItems: "center",
    padding: 24,
    flexGrow: 1,
    paddingTop: 100,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B8791",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    color: "#888",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  button: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#0B8791",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
