import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../conf";

export default function CalendarioScreen() {
  const [citas, setCitas] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  const [marcados, setMarcados] = useState({});
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Convierte "DD/MM/YYYY" a "YYYY-MM-DD"
  const convertirFecha = (fechaOriginal) => {
    const [dia, mes, anio] = fechaOriginal.split("/");
    return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  };

  const cargarCitas = async () => {
    try {
      const json = await AsyncStorage.getItem("paciente");
      const paciente = JSON.parse(json);
      const id = paciente?.ID_Paciente;
      if (!id) return;

      const res = await fetch(`${API_URL}/auth/pagos/${id}`);
      const data = await res.json();

      const hoy = new Date().toISOString().split("T")[0];
      const futuras = [];
      const marcadosTmp = {};

      data.forEach((cita) => {
        if (!cita.Fecha) return;

        const fechaISO = convertirFecha(cita.Fecha);
        cita.Fecha = fechaISO;

        if (fechaISO >= hoy) {
          futuras.push(cita);
          marcadosTmp[fechaISO] = {
            marked: true,
            dotColor: "#0077CC",
          };
        }
      });

      setCitas(futuras);
      setMarcados(marcadosTmp);

      if (fechaSeleccionada) {
        const filtradas = futuras.filter((c) => {
          const fechaCita = new Date(c.Fecha).toISOString().split("T")[0];
          return fechaCita === fechaSeleccionada;
        });
        setCitasDelDia(filtradas);
      }
    } catch (error) {
      console.error("❌ Error al cargar citas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCitas(); // Carga inicial
    const intervalo = setInterval(cargarCitas, 1000); // 🔁 actualiza cada segundo
    return () => clearInterval(intervalo);
  }, [fechaSeleccionada]);

  const seleccionarFecha = (day) => {
    const fecha = day.dateString;
    setFechaSeleccionada(fecha);
    const filtradas = citas.filter((c) => {
      const fechaCita = new Date(c.Fecha).toISOString().split("T")[0];
      return fechaCita === fecha;
    });
    setCitasDelDia(filtradas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Mis Citas Programadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0B8791" />
      ) : (
        <>
          <Calendar
            markedDates={{
              ...marcados,
              ...(fechaSeleccionada && {
                [fechaSeleccionada]: {
                  ...(marcados[fechaSeleccionada] || {}),
                  selected: true,
                  selectedColor: "#0B8791",
                },
              }),
            }}
            onDayPress={seleccionarFecha}
            theme={{
              selectedDayBackgroundColor: "#0B8791",
              todayTextColor: "#0B8791",
              arrowColor: "#0B8791",
              dotColor: "#0077CC",
            }}
          />

          <Text style={styles.subtitle}>
            {fechaSeleccionada
              ? `Citas para el ${fechaSeleccionada}`
              : "Selecciona un día para ver tus citas"}
          </Text>

          {citasDelDia.length === 0 ? (
            <Text style={styles.info}>No hay citas para este día.</Text>
          ) : (
            <FlatList
              data={citasDelDia}
              keyExtractor={(item) => item.ID_Cita.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Ionicons name="calendar-outline" size={24} color="#0B8791" />
                  <Text style={styles.info}>🦷 Servicio: {item.servicio}</Text>
                  <Text style={styles.info}>🕐 Hora: {item.Hora}</Text>
                  <Text style={styles.info}>📄 Estado: {item.estado}</Text>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: "#F4FBFC",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B8791",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#0B8791",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 18,
  },
  info: {
    fontSize: 16,
    marginTop: 6,
    color: "#333",
  },
});
