import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
  const [nombre, setNombre] = useState("Juan Pérez");
  const [correo, setCorreo] = useState("juanperez@example.com");
  const [telefono, setTelefono] = useState("+52 449 123 4567");
  const [nacimiento, setNacimiento] = useState("1990-03-12");
  const [genero, setGenero] = useState("Masculino");

  const guardarCambios = () => {
    // Aquí podrías enviar los datos al servidor
    Alert.alert("Perfil actualizado", "Tus datos han sido guardados.");
    navigation.goBack(); // Regresa a la pantalla de perfil
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        value={nacimiento}
        onChangeText={setNacimiento}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Género</Text>
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
      />

      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFC",
    padding: 24,
    flexGrow: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0B8791",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderColor: "#B2DFDB",
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#028090",
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
