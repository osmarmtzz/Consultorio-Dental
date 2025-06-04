import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PagosScreen() {
  const citas = [
    {
      id: 1,
      paciente: "Juan Pérez",
      doctor: "Dra. María López",
      servicio: "Limpieza dental profesional",
      fecha: "2025-06-10",
      hora: "10:30 AM",
      costo: "$500 MXN",
      estado: "Pendiente de pago",
    },
    {
      id: 2,
      paciente: "Ana Rodríguez",
      doctor: "Dr. Carlos Méndez",
      servicio: "Blanqueamiento dental",
      fecha: "2025-06-08",
      hora: "04:00 PM",
      costo: "$1200 MXN",
      estado: "Pagado",
    },
  ];

  const realizarPago = (servicio) => {
    alert(`Redirigiendo a pago para: ${servicio}`);
    // Aquí va la lógica real de pago
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumen de Citas y Pagos</Text>

      {citas.map((cita) => (
        <View key={cita.id} style={styles.card}>
          <Ionicons name="calendar-outline" size={26} color="#0B8791" />
          <Text style={styles.info}>Paciente: {cita.paciente}</Text>
          <Text style={styles.info}>Doctor(a): {cita.doctor}</Text>
          <Text style={styles.info}>Servicio: {cita.servicio}</Text>
          <Text style={styles.info}>Fecha: {cita.fecha}</Text>
          <Text style={styles.info}>Hora: {cita.hora}</Text>
          <Text style={styles.info}>Costo: {cita.costo}</Text>
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
              onPress={() => realizarPago(cita.servicio)}
            >
              <Ionicons name="card-outline" size={20} color="#fff" />
              <Text style={styles.pagarTexto}>Pagar Ahora</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
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
