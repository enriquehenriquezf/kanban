import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import LoginScreen from '@/app/Auth';
import SignUpScreen from '@/app/SignUp';
import Board from '@/app/Board';
import TaskUpsert from '@/components/TaskUpsert';


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LogoutScreen = () => {
  const navigation = useNavigation();
  
  Alert.alert('Cerrar sesión', 'Al presionar aceptar se cerrará la sesión', [
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

  return null;
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
    <Drawer.Navigator initialRouteName="Board">
      <Drawer.Group>
        <Drawer.Screen
          name="Board"
          component={Board}
          options={{
            title: 'Mi Tablero',
          }}
        />

        <Drawer.Screen
          name="Logout"
          component={<LogoutScreen />}
          options={{
            title: 'Cerrar Sesión',
            headerShown: false,
          }}
        />
      </Drawer.Group>

      {/* Modal Screen */}
      <Drawer.Group screenOptions={{ presentation: 'modal' }}>
        <Drawer.Screen name="TaskUpsert" component={TaskUpsert} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStackScreen} />
          <Stack.Screen name="Home" component={HomeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


