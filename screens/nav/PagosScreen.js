import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // 👈
import { API_URL } from "../../conf";

export default function PagosScreen() {
  const [citas, setCitas] = useState([]);

  const cargarDatos = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("paciente");
      const paciente = JSON.parse(json);
      const id = paciente?.ID_Paciente;

      if (!id) return;

      const res = await fetch(`${API_URL}/auth/pagos/${id}`);
      const data = await res.json();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar citas:", error);
      Alert.alert("Error", "No se pudieron cargar los pagos");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos(); // 👈 Se ejecuta cuando se entra a esta pantalla
    }, [cargarDatos])
  );

  const realizarPago = (cita) => {
    Alert.alert(
      "Confirmar pago",
      `¿Deseas registrar el pago de $500 MXN para: ${cita.servicio}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Pagar",
          onPress: async () => {
            try {
              await fetch(`${API_URL}/auth/registrar-pago`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  idPaciente: cita.ID_Paciente,
                  fechaPago: cita.Fecha,
                  concepto: cita.servicio,
                  monto: 500,
                }),
              });

              Alert.alert("✅ Pago realizado");
              cargarDatos(); // 👈 Recarga después de pagar
            } catch (e) {
              Alert.alert("Error", "No se pudo registrar el pago");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumen de Citas y Pagos</Text>

      {citas.length === 0 ? (
        <Text style={{ marginTop: 30, color: "#888" }}>
          No tienes citas registradas aún.
        </Text>
      ) : (
        citas.map((cita) => (
          <View key={cita.ID_Cita} style={styles.card}>
            <Ionicons name="calendar-outline" size={26} color="#0B8791" />
            <Text style={styles.info}>Paciente: {cita.paciente}</Text>
            <Text style={styles.info}>Servicio: {cita.servicio}</Text>
            <Text style={styles.info}>Fecha: {cita.Fecha}</Text>
            <Text style={styles.info}>Hora: {cita.Hora}</Text>
            <Text style={styles.info}>Monto: $500.00 MXN</Text>
            <Text
              style={[
                styles.info,
                { color: cita.estado === "Pagado" ? "#2E7D32" : "#E65100" },
              ]}
            >
              Estado: {cita.estado}
            </Text>

            {cita.estado === "Pendiente de pago" && (
              <TouchableOpacity
                style={styles.pagarBtn}
                onPress={() => realizarPago(cita)}
              >
                <Ionicons name="card-outline" size={20} color="#fff" />
                <Text style={styles.pagarTexto}>Pagar Ahora</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F4FBFC",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B8791",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginTop: 6,
    color: "#333",
  },
  pagarBtn: {
    marginTop: 18,
    backgroundColor: "#0B8791",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
