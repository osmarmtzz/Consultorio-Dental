import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../conf"; // asegúrate de que esta ruta sea correcta

const servicios = [
  "Limpieza dental profesional",
  "Blanqueamiento dental",
  "Ortodoncia",
  "Endodoncia",
  "Extracción de muelas",
  "Resinas y empastes",
  "Prótesis dentales",
  "Diseño de sonrisa",
];

export default function AgendarCitaScreen({ navigation }) {
  const [servicio, setServicio] = useState("ninguno");
  const [mostrarServicios, setMostrarServicios] = useState(false);

  const [fecha, setFecha] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [hora, setHora] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [comentarios, setComentarios] = useState("");
  const [idPaciente, setIdPaciente] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem("paciente");
        const paciente = JSON.parse(json);
        setIdPaciente(paciente?.ID_Paciente);
      } catch {}
    })();
  }, []);

  const formatDate = (d) => {
    if (!d) return "Selecciona fecha";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (t) => {
    if (!t) return "Selecciona hora";
    const h = String(t.getHours()).padStart(2, "0");
    const m = String(t.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const agendarCita = async () => {
    if (servicio === "ninguno" || !fecha || !hora) {
      Alert.alert("Campos requeridos", "Completa los campos marcados con *");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/agendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: fecha.toISOString().split("T")[0],
          hora: `${hora.getHours()}:${hora.getMinutes()}`,
          motivo: servicio,
          observaciones: comentarios,
          idPaciente,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("✅ Cita agendada", "Serás redirigido a tus citas.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Atras", { screen: "Citas" }),
          },
        ]);
      } else {
        Alert.alert("Error", data.error || "Ocurrió un problema");
      }
    } catch {
      Alert.alert("Error de red", "No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📅 Agendar Cita</Text>

        <Text style={styles.label}>Servicio *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setMostrarServicios(true)}
        >
          <Text style={{ color: servicio !== "ninguno" ? "#333" : "#aaa" }}>
            {servicio !== "ninguno" ? servicio : "Selecciona servicio"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Fecha *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: fecha ? "#333" : "#aaa" }}>
            {formatDate(fecha)}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Hora *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={{ color: hora ? "#333" : "#aaa" }}>
            {formatTime(hora)}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Comentarios</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe tus comentarios..."
          placeholderTextColor="#aaa"
          multiline
          value={comentarios}
          onChangeText={setComentarios}
        />

        <TouchableOpacity style={styles.button} onPress={agendarCita}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Confirmar Cita</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de servicios */}
      <Modal
        visible={mostrarServicios}
        transparent
        animationType="slide"
        onRequestClose={() => setMostrarServicios(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elige servicio</Text>
            {servicios.map((s, i) => (
              <Pressable
                key={i}
                style={styles.modalOption}
                onPress={() => {
                  setServicio(s);
                  setMostrarServicios(false);
                }}
              >
                <Text style={styles.modalOptionText}>{s}</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.modalClose}
              onPress={() => setMostrarServicios(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(d) => {
          setFecha(d);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        maximumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(t) => {
          setHora(t);
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#EAF6F6",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#056674",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#B2DFDB",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#028090",
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#056674",
    textAlign: "center",
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  modalClose: {
    marginTop: 8,
    alignItems: "center",
    padding: 12,
  },
  modalCloseText: {
    color: "#056674",
    fontSize: 16,
    fontWeight: "600",
  },
});
