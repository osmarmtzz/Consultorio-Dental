import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilScreen from "./screens/nav/PerfilScreen";
import ServiciosScreen from "./screens/nav/ServiciosScreen";
import CitasScreen from "./screens/nav/CitasScreen";
import CalendarioScreen from "./screens/nav/CalendarioScreen";
import PagosScreen from "./screens/nav/PagosScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AgendarCitaScreen from "./screens/nav/AgendarCitaScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Atras() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Perfil":
              iconName = "person-circle-outline";
              break;
            case "Servicios":
              iconName = "medkit-outline";
              break;
            case "Citas":
              iconName = "calendar-outline";
              break;
            case "Pagos":
              iconName = "cash-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0B8791",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Citas" component={CitasScreen} />
      <Tab.Screen name="Servicios" component={ServiciosScreen} />
      <Tab.Screen name="Pagos" component={PagosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        {/* Autenticación */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Agendar"
          component={AgendarCitaScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="Calendario"
          component={CalendarioScreen}
          options={{ headerShown: true, title: "Calendario de Citas" }}
        />

        {/* Navegación principal con tabs */}
        <Stack.Screen name="Atras" component={Atras} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
