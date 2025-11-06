import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import AccessScreen from '../screens/auth/AccessScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import StudentDashboard from '../screens/student/StudentDashboard';
import ChatScreen from '../screens/visitante/ChatScreen';
import DiarioEmocionalScreen from '../screens/visitante/DiarioEmocionalScreen';
import EmergenciaScreen from '../screens/visitante/EmergenciaScreen';
import GuiasPAPScreen from '../screens/visitante/GuiasPAPScreen';
import MicrocursosScreen from '../screens/visitante/MicrocursosScreen';
import VisitorDashboard from '../screens/visitante/VisitorDashboard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ 
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
                initialRouteName="Access"
            >
                {/* Pantallas de Autenticación */}
                <Stack.Screen name='Access' component={AccessScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                
                {/* Dashboards Principales */}
                <Stack.Screen name='VisitorDashboard' component={VisitorDashboard} />
                <Stack.Screen name='StudentDashboard' component={StudentDashboard} />
                
                {/* Módulos de la App */}
                <Stack.Screen name='GuiasPAP' component={GuiasPAPScreen} />
                <Stack.Screen name='DiarioEmocional' component={DiarioEmocionalScreen} />
                <Stack.Screen name='Emergencia' component={EmergenciaScreen} />
                <Stack.Screen name='Microcursos' component={MicrocursosScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}