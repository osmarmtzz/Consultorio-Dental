import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_URL } from "../conf";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState(null);
  const [generoOpen, setGeneroOpen] = useState(false);
  const [generoItems, setGeneroItems] = useState([
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "Prefiero no decir", value: "Prefiero no decir" },
    { label: "Otro", value: "Otro" },
  ]);

  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const formatFecha = (fecha) => {
    if (!fecha) return "Selecciona la fecha";
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const handleRegister = async () => {
    if (
      !nombre ||
      !apellidos ||
      !genero ||
      !fechaNacimiento ||
      !telefono ||
      !direccion ||
      !email ||
      !password
    ) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          genero,
          fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
          telefono,
          direccion,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Registro exitoso", "Ya puedes iniciar sesión.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.error || "Ocurrió un problema.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background_Login.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Ionicons name="medkit" size={64} color="#0077C2" />
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Consultorio Dental</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} style={[styles.form, { zIndex: 10 }]}>
          <Text style={styles.label}>Nombre(s)</Text>
          <TextInput
            placeholder="Juan"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Apellido(s)</Text>
          <TextInput
            placeholder="Pérez"
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
          />

          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setMostrarFecha(true)}
          >
            <Text style={{ color: fechaNacimiento ? "#333" : "#aaa" }}>
              {formatFecha(fechaNacimiento)}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={mostrarFecha}
            mode="date"
            onConfirm={(date) => {
              setFechaNacimiento(date);
              setMostrarFecha(false);
            }}
            onCancel={() => setMostrarFecha(false)}
            maximumDate={new Date()}
          />

          <Text style={styles.label}>Género</Text>
          <View style={{ zIndex: generoOpen ? 1000 : 1 }}>
            <DropDownPicker
              open={generoOpen}
              value={genero}
              items={generoItems}
              setOpen={setGeneroOpen}
              setValue={setGenero}
              setItems={setGeneroItems}
              placeholder="Selecciona tu género"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            placeholder="1234567890"
            style={styles.input}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />

          <Text style={styles.label}>Dirección</Text>
          <TextInput
            placeholder="Calle 123"
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="ejemplo@correo.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.labelRow}>
            <Text style={styles.label}>Contraseña</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#0077C2"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Requisitos de contraseña</Text>
              <Text style={styles.modalText}>• Mínimo 8 caracteres</Text>
              <Text style={styles.modalText}>• Al menos 1 mayúscula</Text>
              <Text style={styles.modalText}>
                • Al menos 1 carácter especial (!, @, #, etc.)
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Entendido</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0077C2",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
    marginTop: 15,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderColor: "#B0C4DE",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  dropdown: {
    borderColor: "#B0C4DE",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#B0C4DE",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0077C2",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#0077C2",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0077C2",
  },
  modalText: {
    fontSize: 14,
    marginVertical: 2,
    color: "#444",
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#0077C2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
