import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection } from 'firebase/firestore';
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
import { db } from '../../../firebase/config'; // ✅ RUTA CORREGIDA

export default function RegisterScreen({ navigation }) {
    const [form, setForm] = useState({
        nombre: '', 
        email: '', 
        password: '',
        matricula: '',
        carrera: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (msg = '¡Registro exitoso!') => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const handleRegister = async () => {
        if (isLoading) {
            Alert.alert("Espere", "Ya hay una petición en proceso...");
            return;
        }

        if (!form.nombre || !form.email || !form.password || !form.matricula) {
            Alert.alert("Error", "Debe llenar todos los campos obligatorios");
            return;
        }

        if (!form.email.includes('@')) {
            Alert.alert("Error", "Por favor ingresa un email válido");
            return;
        }

        if (form.password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setIsLoading(true);
        
        try {
            console.log('🔄 ===== INICIANDO REGISTRO =====');
            console.log('📝 Datos del formulario:', form);
            
            // 1. Guardar en Firestore (CON CONTRASEÑA)
            const userData = {
                nombre: form.nombre,
                email: form.email,
                password: form.password,
                matricula: form.matricula,
                carrera: form.carrera || 'No especificada',
                tipo: 'estudiante',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            };

            console.log('💾 Datos a guardar en Firestore:', userData);

            const docRef = await addDoc(collection(db, 'usuarios'), userData);
            
            console.log('✅ Usuario guardado en Firestore - ID:', docRef.id);
            console.log('🔑 Contraseña guardada:', form.password);
            console.log('📏 Longitud contraseña:', form.password.length);
            
            // 2. Guardar en AsyncStorage
            await AsyncStorage.setItem('userToken', 'pap-app-token');
            await AsyncStorage.setItem('userId', docRef.id);
            await AsyncStorage.setItem('userName', form.nombre);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('userEmail', form.email);
            await AsyncStorage.setItem('userMatricula', form.matricula);
            await AsyncStorage.setItem('userPassword', form.password);
            
            console.log('✅ Datos guardados en AsyncStorage');
            
            setIsLoading(false);
            
            // 3. Navegar al Dashboard
            Platform.OS !== 'ios' && showToast();
            
            Alert.alert(
                "¡Registro Exitoso! 🎉",
                `Bienvenido ${form.nombre}, tu cuenta ha sido creada correctamente.`,
                [
                    {
                        text: "Continuar al Dashboard",
                        onPress: () => navigation.replace("StudentDashboard")
                    },
                    {
                        text: "Ir al Login",
                        onPress: () => navigation.replace("Login")
                    }
                ]
            );
            
        } catch (error) {
            console.error('❌ Error en registro:', error);
            setIsLoading(false);
            
            let errorMessage = "Error al registrar usuario";
            
            if (error.code === 'permission-denied') {
                errorMessage = "Error de permisos en la base de datos";
            } else if (error.message.includes('network')) {
                errorMessage = "Error de conexión. Verifica tu internet";
            }
            
            Alert.alert('Error', errorMessage + ': ' + error.message);
        }
    };

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const goToAccess = () => {
        navigation.navigate("Access");
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
                            <Text style={styles.loadingText}>Creando cuenta...</Text>
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
                        <Text style={styles.screenTitle}>Crear Cuenta</Text>
                        <Text style={styles.screenSubtitle}>Estudiante USO</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Nombre Completo *</Text>
                            <TextInput
                                placeholder="Marco Antonio Rodríguez"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={(text) => setForm({...form, nombre: text})}
                                value={form.nombre}
                                autoCapitalize="words"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Institucional *</Text>
                            <TextInput
                                placeholder="usuario@uso.edu.co"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={(text) => setForm({...form, email: text})}
                                value={form.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Matrícula *</Text>
                            <TextInput
                                placeholder="20230001"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={(text) => setForm({...form, matricula: text})}
                                value={form.matricula}
                                keyboardType="numeric"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Carrera</Text>
                            <TextInput
                                placeholder="Ingeniería en Sistemas"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={(text) => setForm({...form, carrera: text})}
                                value={form.carrera}
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Contraseña *</Text>
                            <TextInput
                                placeholder="Mínimo 6 caracteres"
                                placeholderTextColor="#888"
                                style={styles.input}
                                onChangeText={(text) => setForm({...form, password: text})}
                                value={form.password}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        <Text style={styles.requiredText}>* Campos obligatorios</Text>

                        <TouchableOpacity
                            style={[styles.btn, isLoading && styles.btnDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.btnText}>Crear Cuenta</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={goToLogin}
                            style={styles.linkButton}
                            disabled={isLoading}
                        >
                            <Text style={styles.linkText}>
                                ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia Sesión</Text>
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={goToAccess}
                            style={styles.backButton}
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
        paddingBottom: 20,
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
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    heartIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    appTitle: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    appSubtitle: {
        fontSize: 16,
        color: '#95E3E7',
        fontWeight: '500',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(149, 227, 231, 0.95)',
        borderRadius: 20,
        padding: 24,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    screenTitle: {
        fontSize: 28,
        color: '#1E2B4B',
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    screenSubtitle: {
        fontSize: 16,
        color: '#1E2B4B',
        marginBottom: 20,
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
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        padding: 16,
        color: '#1E2B4B',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(30, 43, 75, 0.3)',
    },
    requiredText: {
        fontSize: 12,
        color: '#E74C7D',
        fontStyle: 'italic',
        marginTop: -8,
        marginBottom: 20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#1E2B4B',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    btnDisabled: {
        opacity: 0.7,
    },
    btnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 12,
    },
    linkText: {
        color: '#1E2B4B',
        fontSize: 15,
    },
    linkBold: {
        color: '#1E2B4B',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    backButton: {
        marginTop: 12,
        alignItems: 'center',
        padding: 12,
        borderWidth: 2,
        borderColor: '#1E2B4B',
        borderRadius: 12,
    },
    backButtonText: {
        color: '#1E2B4B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomSpace: {
        height: 30,
    },
});