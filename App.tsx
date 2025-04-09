import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoginScreen from '@/app/Auth';
import SignUpScreen from '@/app/SignUp';
import Board from '@/app/Board';
import TaskUpsert from '@/components/TaskUpsert';
import { Colors } from './constants';


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const LogoutScreen = () => {
  const navigation = useNavigation();
  
  Alert.alert('Cerrando sesión', 'Ha cerrado la sesión correctamente.', [
    {
      text: 'Aceptar',
      onPress: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      },
    },
  ]);

  return (<></>);
}

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <BottomTab.Navigator initialRouteName="Board">
        <BottomTab.Screen
          name="Board"
          component={Board}
          options={{
            headerShown: false,
            title: 'Mi Tablero',
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: Colors.primary,
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="view-kanban" color={color} size={24} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            title: 'Cerrar Sesión',
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: Colors.primary,
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialIcons name="logout" color={color} size={24} />
            ),
          }}
        />
      
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Auth" component={AuthStackScreen} />
            <Stack.Screen name="Home" component={HomeStackScreen} />
          </Stack.Group>

          {/* Modal Screen */}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="TaskUpsert" component={TaskUpsert} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


