import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../../firebase/config';

export default function RegisterScreen({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matricula, setMatricula] = useState('');
    const [carrera, setCarrera] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {
        if (isLoading) {
            alert("Espere, ya hay una petición en proceso...")
            return
        }

        // Validaciones
        if (!nombre || !email || !password || !confirmPassword || !matricula) {
            alert("Debe llenar todos los campos obligatorios")
            return
        }

        if (!email.includes('@')) {
            alert("Por favor ingresa un email válido")
            return
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres")
            return
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden")
            return
        }

        setIsLoading(true);
        try {
            // Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualizar perfil con el nombre
            await updateProfile(user, {
                displayName: nombre
            });

            // Guardar información adicional en Firestore
            await setDoc(doc(db, 'usuarios', user.uid), {
                nombre: nombre,
                email: email,
                matricula: matricula,
                carrera: carrera || 'No especificada',
                tipo: 'estudiante',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            });

            setIsLoading(false);
            
            Alert.alert(
                "¡Registro Exitoso!",
                `Bienvenido ${nombre}, tu cuenta ha sido creada correctamente.`,
                [
                    {
                        text: "Continuar",
                        onPress: () => navigation.replace("StudentDashboard")
                    }
                ]
            );

        } catch (error) {
            console.error('Error de registro:', error);
            setIsLoading(false);
            
            let errorMessage = "Error al crear la cuenta";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Este email ya está registrado";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del email es inválido";
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña es muy débil";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de conexión. Verifica tu internet";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Demasiados intentos. Intenta más tarde";
                    break;
                default:
                    errorMessage = "Error al crear la cuenta. Intenta nuevamente";
            }
            Alert.alert("Error", errorMessage);
        }
    }

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const goToAccess = () => {
        navigation.navigate("Access");
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Creando cuenta...</Text>
                </View>
            )}

            <KeyboardAvoidingView 
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.viewTitles}>
                        <Text style={styles.titleText}>Crear Cuenta</Text>
                        <Text style={styles.subtitleText}>Estudiante USO</Text>
                    </View>

                    <View style={styles.formCard}>
                        
                        <Text style={styles.sectionTitle}>Información Personal</Text>
                        
                        <Text style={styles.inputLabel}>Nombre Completo *</Text>
                        <TextInput
                            placeholder="Marco Antonio Rodríguez"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setNombre}
                            value={nombre}
                            autoCapitalize="words"
                            editable={!isLoading}
                        />

                        <Text style={styles.inputLabel}>Email *</Text>
                        <TextInput
                            placeholder="usuario@uso.edu.co"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            editable={!isLoading}
                        />

                        <Text style={styles.sectionTitle}>Información Académica</Text>

                        <Text style={styles.inputLabel}>Matrícula *</Text>
                        <TextInput
                            placeholder="20230001"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setMatricula}
                            value={matricula}
                            keyboardType="numeric"
                            editable={!isLoading}
                        />

                        <Text style={styles.inputLabel}>Carrera</Text>
                        <TextInput
                            placeholder="Ingeniería en Sistemas"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setCarrera}
                            value={carrera}
                            editable={!isLoading}
                        />

                        <Text style={styles.sectionTitle}>Seguridad</Text>

                        <Text style={styles.inputLabel}>Contraseña *</Text>
                        <TextInput
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            editable={!isLoading}
                        />

                        <Text style={styles.inputLabel}>Confirmar Contraseña *</Text>
                        <TextInput
                            placeholder="Repite tu contraseña"
                            placeholderTextColor="rgba(0, 0, 0, 0.4)"
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={true}
                            editable={!isLoading}
                        />

                        <Text style={styles.requiredText}>* Campos obligatorios</Text>

                        <TouchableOpacity
                            style={[
                                styles.btnRegistrar,
                                isLoading && styles.btnDisabled
                            ]}
                            onPress={register}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.btnRegistrarText}>Crear Cuenta</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.linkButton}
                            onPress={goToLogin}
                            disabled={isLoading}
                        >
                            <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión aquí</Text></Text>
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
                        <Text style={styles.btnRegistrarText}>← Regresar al Inicio</Text>
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
        paddingVertical: 20,
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
        paddingVertical: 20,
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
        padding: 25,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#1E2B4B',
        paddingBottom: 5,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginTop: 15,
        marginBottom: 5,
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
    },
    requiredText: {
        fontSize: 12,
        color: '#E74C7D',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'right',
    },
    btnRegistrar: {
        backgroundColor: '#1E2B4B',
        marginTop: 30,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnRegistrarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    linkText: {
        color: '#1E2B4B',
        fontSize: 14,
        textAlign: 'center',
    },
    linkBold: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    btnRegresar: {
        backgroundColor: 'transparent',
        marginTop: 20,
        marginBottom: 20,
        width: '70%',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#95E3E7',
    },
});