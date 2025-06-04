import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function AgendarCitaScreen() {
  const [servicio, setServicio] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [comentarios, setComentarios] = useState("");

  const agendarCita = () => {
    if (!servicio || !fecha || !hora) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos.");
      return;
    }
    Alert.alert("Cita agendada", "Tu cita fue registrada con éxito.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 Agendar Nueva Cita</Text>

      <Text style={styles.label}>Tipo de Servicio *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={servicio}
          onValueChange={(value) => setServicio(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un servicio..." value={null} />
          <Picker.Item label="Limpieza dental" value="limpieza" />
          <Picker.Item label="Blanqueamiento dental" value="blanqueamiento" />
          <Picker.Item label="Ortodoncia" value="ortodoncia" />
          <Picker.Item label="Endodoncia" value="endodoncia" />
          <Picker.Item label="Extracción de muelas" value="extraccion" />
        </Picker>
      </View>

      <Text style={styles.label}>Fecha *</Text>
      <TextInput
        placeholder="Ej: 2025-06-04"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Hora *</Text>
      <TextInput
        placeholder="Ej: 10:30 AM"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
      />

      <Text style={styles.label}>Comentarios adicionales</Text>
      <TextInput
        placeholder="Ej: Tengo sensibilidad dental..."
        value={comentarios}
        onChangeText={setComentarios}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={agendarCita}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Confirmar Cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: "#EAF6F6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#056674",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B2DFDB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B2DFDB",
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#028090",
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
});
