import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { auth } from '../../../firebase/config.js';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (msg = '¡Acceso correcto!') => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const login = async () => {
        if(isLoading){
            alert("Espere, ya hay una petición en proceso...")
            return
        }

        if (!email || !password) {
            alert("Debe llenar todos los campos")
            return
        }

        // Validación básica de email
        if (!email.includes('@')) {
            alert("Por favor ingresa un email válido")
            return
        }

        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario logueado:', userCredential.user);
            
            setIsLoading(false);
            Platform.OS !== 'ios' && showToast();
            navigation.replace("StudentDashboard");
        } catch (error) {
            console.error('Error de login:', error);
            setIsLoading(false);
            
            let errorMessage = "Error de inicio de sesión";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "El formato del email es inválido";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No existe una cuenta con este email";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Contraseña incorrecta";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Demasiados intentos fallidos. Intente más tarde";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de conexión. Verifica tu internet";
                    break;
                default:
                    errorMessage = "Error al iniciar sesión. Intenta nuevamente";
            }
            Alert.alert("Error", errorMessage);
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
                        // Aquí puedes implementar la recuperación de contraseña
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
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Iniciando sesión...</Text>
                </View>
            )}

            <KeyboardAvoidingView 
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.viewTitles}>
                        <Text style={styles.titleText}>Iniciar Sesión</Text>
                        <Text style={styles.subtitleText}>Estudiante USO</Text>
                    </View>

                    <View style={styles.formCard}>
                        
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            placeholder="usuario@uso.edu.co"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            editable={!isLoading}
                        />
                        
                        <Text style={styles.inputLabel}>Contraseña</Text>
                        <TextInput
                            placeholder="********"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            autoComplete="password"
                            editable={!isLoading}
                        />

                        <TouchableOpacity 
                            style={styles.forgotPassword}
                            onPress={handleForgotPassword}
                            disabled={isLoading}
                        >
                            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btnAcceder,
                                isLoading && styles.btnDisabled
                            ]}
                            onPress={login}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
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
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.btnRegresar,
                            isLoading && styles.btnDisabled
                        ]}
                        onPress={goToAccess}
                        disabled={isLoading}
                    >
                        <Text style={styles.btnRegresarText}>← Regresar</Text>
                    </TouchableOpacity>
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
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(30, 43, 75, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    viewTitles: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#1E2B4B',
        paddingHorizontal: 20,
    },
    titleText: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 18,
        color: '#95E3E7',
        marginTop: 5,
        textAlign: 'center',
    },
    formCard: {
        backgroundColor: '#95E3E7',
        marginHorizontal: 20,
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginTop: 20,
        marginBottom: 5,
        alignSelf: 'flex-start',
        width: '100%',
    },
    input: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1.5,
        borderBottomColor: '#1E2B4B',
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        borderRadius: 0,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
        padding: 5,
    },
    forgotPasswordText: {
        color: '#1E2B4B',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    btnAcceder: {
        backgroundColor: '#1E2B4B',
        marginTop: 30,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnAccederText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
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
    },
    btnRegistrar: {
        backgroundColor: '#E74C7D',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    btnRegistrarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnRegresar: {
        backgroundColor: 'transparent',
        marginTop: 20,
        marginBottom: 40,
        width: '70%',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#95E3E7',
    },
    btnRegresarText: {
        color: '#95E3E7',
        fontSize: 16,
        fontWeight: 'bold',
    },
});