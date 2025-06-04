import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Habilita animaciones en Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const servicios = [
  {
    icon: "medkit-outline",
    nombre: "Limpieza dental profesional",
    descripcion: "Eliminación de sarro, placa y manchas para mantener encías y dientes saludables.",
  },
  {
    icon: "happy-outline",
    nombre: "Blanqueamiento dental",
    descripcion: "Tratamiento estético que aclara el tono de tus dientes para mejorar tu sonrisa.",
  },
  {
    icon: "construct-outline",
    nombre: "Ortodoncia",
    descripcion: "Corrección de dientes y mandíbula con brackets o alineadores invisibles.",
  },
  {
    icon: "hammer-outline",
    nombre: "Endodoncia",
    descripcion: "Tratamiento del nervio dental infectado para salvar dientes dañados.",
  },
  {
    icon: "body-outline",
    nombre: "Extracción de muelas",
    descripcion: "Remoción segura de muelas del juicio u otras piezas dentales problemáticas.",
  },
  {
    icon: "shield-checkmark-outline",
    nombre: "Resinas y empastes",
    descripcion: "Relleno de caries con materiales estéticos y resistentes al desgaste.",
  },
  {
    icon: "nutrition-outline",
    nombre: "Prótesis dentales",
    descripcion: "Reposición de dientes perdidos con piezas removibles o fijas.",
  },
  {
    icon: "color-palette-outline",
    nombre: "Diseño de sonrisa",
    descripcion: "Transformación estética integral de la sonrisa: color, forma y simetría dental.",
  },
];

export default function ServiciosScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Servicios Odontológicos</Text>

      {servicios.map((servicio, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.9}
        >
          <View style={styles.row}>
            <Ionicons name={servicio.icon} size={24} color="#0B8791" />
            <Text style={styles.cardText}>{servicio.nombre}</Text>
            <Ionicons
              name={expandedIndex === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#999"
              style={{ marginLeft: "auto" }}
            />
          </View>
          {expandedIndex === index && (
            <Text style={styles.descripcion}>{servicio.descripcion}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 60,
    paddingHorizontal: 24,
    backgroundColor: "#F4FBFC",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0B8791",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    marginLeft: 14,
    color: "#333",
    fontWeight: "600",
  },
  descripcion: {
    marginTop: 12,
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },
});
