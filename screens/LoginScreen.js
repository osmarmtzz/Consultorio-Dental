import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { API_URL } from "../conf"; // Asegúrate de tener esto

export default function LoginScreen({ navigation }) {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Bienvenido", "Inicio de sesión exitoso");
        navigation.replace("Atras", { screen: "Citas" });
      } else {
        Alert.alert("Error", data.error || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background_Login.png")}
      style={styles.background}
      blurRadius={3}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.title}>Consultorio Dental</Text>
          <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={300} style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="ejemplo@correo.com"
            style={styles.input}
            keyboardType="email-address"
            ref={emailInputRef}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="••••••••••••"
            style={styles.input}
            secureTextEntry
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A73E8",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#1A73E8",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#1A73E8",
    marginTop: 15,
    textAlign: "center",
  },
});
