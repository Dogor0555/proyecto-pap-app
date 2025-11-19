import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View 
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../../firebase/config';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (msg = '¡Acceso correcto!') => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const login = async () => {
        if(isLoading){
            Alert.alert("Espere", "Ya hay una petición en proceso...");
            return;
        }

        if (!email || !password) {
            Alert.alert("Error", "Debe llenar todos los campos");
            return;
        }

        if (!email.includes('@')) {
            Alert.alert("Error", "Por favor ingresa un email válido");
            return;
        }

        setIsLoading(true);
        
        try {
            console.log('🔄 Buscando usuario en Firestore...');
            
            const q = query(collection(db, 'usuarios'), where('email', '==', email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                
                console.log('✅ Usuario encontrado:', userData.nombre);
                
                if (userData.password === password) {
                    console.log('✅ Contraseña correcta');
                    
                    await AsyncStorage.setItem('userToken', 'pap-app-token');
                    await AsyncStorage.setItem('userId', userDoc.id);
                    await AsyncStorage.setItem('userName', userData.nombre);
                    await AsyncStorage.setItem('userEmail', userData.email);
                    await AsyncStorage.setItem('userMatricula', userData.matricula);
                    await AsyncStorage.setItem('userCarrera', userData.carrera || 'No especificada');
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    
                    console.log('✅ Datos guardados en AsyncStorage');
                    
                    setIsLoading(false);
                    
                    Platform.OS !== 'ios' && showToast();
                    
                    Alert.alert(
                        "¡Bienvenido! 👋",
                        `Hola ${userData.nombre}, has iniciado sesión correctamente.`,
                        [
                            {
                                text: "Continuar",
                                onPress: () => navigation.replace("StudentDashboard")
                            }
                        ]
                    );
                    
                } else {
                    console.log('❌ Contraseña incorrecta');
                    setIsLoading(false);
                    Alert.alert("Error", "Contraseña incorrecta");
                }
            } else {
                console.log('❌ Usuario no encontrado');
                setIsLoading(false);
                Alert.alert("Error", "No existe una cuenta con este email");
            }
            
        } catch (error) {
            console.error('❌ Error en login:', error);
            setIsLoading(false);
            
            let errorMessage = "Error al iniciar sesión";
            
            if (error.code === 'permission-denied') {
                errorMessage = "Error de permisos en la base de datos";
            } else if (error.message.includes('network') || error.message.includes('Internet')) {
                errorMessage = "Error de conexión. Verifica tu internet";
            }
            
            Alert.alert("Error", `${errorMessage}: ${error.message}`);
        }
    }

    const goToAccess = () => {
        navigation.navigate("Access");
    }

    const goToRegister = () => {
        navigation.navigate("Register");
    }

    const handleForgotPassword = () => {
        Alert.alert(
            "Recuperar Contraseña",
            "¿Quieres recuperar tu contraseña?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Recuperar", 
                    onPress: () => {
                        Alert.alert(
                            "Recuperación de Contraseña",
                            "Se enviará un enlace de recuperación a tu email.",
                            [
                                { text: "Cancelar", style: "cancel" },
                                { 
                                    text: "Enviar", 
                                    onPress: () => {
                                        Alert.alert("Éxito", "Se ha enviado el enlace de recuperación a tu email.");
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#ffffff" />
                            <Text style={styles.loadingText}>Iniciando sesión...</Text>
                        </View>
                    )}

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.heartIcon}>💙</Text>
                        <Text style={styles.appTitle}>PAP-USO</Text>
                        <Text style={styles.appSubtitle}>Primeros Auxilios Psicológicos</Text>
                    </View>

                    {/* Form Container */}
                    <View style={styles.formContainer}>
                        <Text style={styles.screenTitle}>Iniciar Sesión</Text>
                        <Text style={styles.screenSubtitle}>Estudiante USO</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Institucional</Text>
                            <TextInput
                                placeholder="usuario@uso.edu.co"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!isLoading}
                                returnKeyType="next"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Contraseña</Text>
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={true}
                                editable={!isLoading}
                                returnKeyType="done"
                                onSubmitEditing={login}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.forgotPassword}
                            onPress={handleForgotPassword}
                            disabled={isLoading}
                        >
                            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnAcceder, isLoading && styles.btnDisabled]}
                            onPress={login}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.btnAccederText}>Acceder</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>o</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.btnRegistrar}
                            onPress={goToRegister}
                            disabled={isLoading}
                        >
                            <Text style={styles.btnRegistrarText}>Crear Cuenta Nueva</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={goToAccess}
                            disabled={isLoading}
                        >
                            <Text style={styles.backButtonText}>← Regresar al Inicio</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomSpace} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2B4B',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(30, 43, 75, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 30 : 20,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    heartIcon: {
        fontSize: 40,
        marginBottom: 8,
    },
    appTitle: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    appSubtitle: {
        fontSize: 14,
        color: '#95E3E7',
        fontWeight: '500',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(149, 227, 231, 0.95)',
        borderRadius: 18,
        padding: 22,
        marginHorizontal: 18,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    screenTitle: {
        fontSize: 24,
        color: '#1E2B4B',
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: 'center',
    },
    screenSubtitle: {
        fontSize: 14,
        color: '#1E2B4B',
        marginBottom: 22,
        textAlign: 'center',
        opacity: 0.8,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        color: '#1E2B4B',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 14,
        color: '#1E2B4B',
        fontSize: 15,
        borderWidth: 1,
        borderColor: 'rgba(30, 43, 75, 0.3)',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 18,
        padding: 4,
    },
    forgotPasswordText: {
        color: '#1E2B4B',
        fontSize: 13,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    btnAcceder: {
        backgroundColor: '#1E2B4B',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    },
    btnDisabled: {
        opacity: 0.7,
    },
    btnAccederText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#1E2B4B',
        opacity: 0.3,
    },
    dividerText: {
        color: '#1E2B4B',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 13,
    },
    btnRegistrar: {
        backgroundColor: '#E74C7D',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    },
    btnRegistrarText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    backButton: {
        alignItems: 'center',
        padding: 14,
        borderWidth: 2,
        borderColor: '#1E2B4B',
        borderRadius: 10,
    },
    backButtonText: {
        color: '#1E2B4B',
        fontSize: 14,
        fontWeight: 'bold',
    },
    bottomSpace: {
        height: 20,
    },
});