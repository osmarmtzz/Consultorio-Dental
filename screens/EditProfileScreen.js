import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../conf";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";

export default function EditProfileScreen({ navigation }) {
  const [idPaciente, setIdPaciente] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nacimiento, setNacimiento] = useState(new Date());
  const [mostrarFecha, setMostrarFecha] = useState(false);

  const [genero, setGenero] = useState("");
  const [generoOpen, setGeneroOpen] = useState(false);
  const [generoItems, setGeneroItems] = useState([
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "Prefiero no decir", value: "Prefiero no decir" },
    { label: "Otro", value: "Otro" },
  ]);

  useEffect(() => {
    const cargarDatos = async () => {
      const json = await AsyncStorage.getItem("paciente");
      const data = JSON.parse(json);
      setIdPaciente(data.ID_Paciente);
      setNombre(data.Nombre);
      setCorreo(data.Correo);
      setTelefono(data.Telefono);
      setNacimiento(new Date(data.Fecha_nacimiento));
      setGenero(data.Genero);
    };
    cargarDatos();
  }, []);

  const guardarCambios = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/editProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID_Paciente: idPaciente,
          Nombre: nombre,
          Correo: correo,
          Telefono: telefono,
          Fecha_nacimiento: nacimiento.toISOString().split("T")[0],
          Genero: genero,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem(
          "paciente",
          JSON.stringify(data.pacienteActualizado)
        );
        Alert.alert("Perfil actualizado", "Tus datos han sido guardados.");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.error || "No se pudo actualizar.");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
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
          maxLength={10}
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setMostrarFecha(true)}
        >
          <Text style={{ color: "#333" }}>
            {nacimiento.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={mostrarFecha}
          mode="date"
          onConfirm={(date) => {
            setNacimiento(date);
            setMostrarFecha(false);
          }}
          onCancel={() => setMostrarFecha(false)}
          maximumDate={new Date()}
        />

        <Text style={styles.label}>Género</Text>
        <DropDownPicker
          open={generoOpen}
          value={genero}
          items={generoItems}
          setOpen={setGeneroOpen}
          setValue={setGenero}
          setItems={setGeneroItems}
          placeholder="Selecciona una opción"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFC",
    padding: 24,
    flex: 1,
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
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#B2DFDB",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    zIndex: 1000,
  },
  dropdownContainer: {
    borderColor: "#B2DFDB",
    zIndex: 1000,
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
