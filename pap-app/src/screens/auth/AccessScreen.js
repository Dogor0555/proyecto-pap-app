import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../../firebase/config.js';

const COLORS = {
    BACKGROUND: '#1E2B4B',   
    TEXT: 'white',           
    HIGHLIGHT: '#95E3E7',    
    SECONDARY: '#E74C7D',
};

// Configurar Google Sign-In
GoogleSignin.configure({
    webClientId: '888603960531-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com', // Reemplaza con tu Client ID
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
});

export default function AccessScreen() {
    const navigation = useNavigation();

    const handleStudentLogin = () => {
        navigation.navigate('Login');
    };

    const handleVisitorAccess = () => {
        navigation.navigate('VisitorDashboard');
    };

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            
            // Crear credencial de Google
            const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
            
            // Sign in con Firebase
            const userCredential = await signInWithCredential(auth, googleCredential);
            
            console.log('Usuario logueado con Google:', userCredential.user);
            Alert.alert('¡Éxito!', `Bienvenido ${userInfo.user.name}`);
            navigation.replace('StudentDashboard');
            
        } catch (error) {
            console.error('Error Google Sign-In:', error);
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelado', 'Inicio de sesión cancelado');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('En progreso', 'Ya hay un inicio de sesión en progreso');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Error', 'Google Play Services no disponible');
            } else {
                Alert.alert('Error', 'Error al iniciar sesión con Google');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
                <Text style={styles.titleText}>
                    Bienvenido a 
                </Text>
                
                <Text style={styles.appNameText}>
                    PAP-USO
                </Text>

                <Text style={styles.subtitle}>
                    ¿Cómo quieres acceder?
                </Text>
                
                <View style={styles.buttonsContainer}>
                    {/* Botón para estudiantes */}
                    <TouchableOpacity 
                        style={[styles.button, styles.studentButton]}
                        onPress={handleStudentLogin}
                    >
                        <Text style={styles.buttonText}>Soy Estudiante</Text>
                        <Text style={styles.buttonSubtext}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    {/* Botón para visitantes */}
                    <TouchableOpacity 
                        style={[styles.button, styles.visitorButton]}
                        onPress={handleVisitorAccess}
                    >
                        <Text style={styles.buttonText}>Entrar como Visitante</Text>
                        <Text style={styles.buttonSubtext}>Explorar la app</Text>
                    </TouchableOpacity>

                    {/* Botón Google */}
                    <TouchableOpacity 
                        style={[styles.button, styles.googleButton]}
                        onPress={handleGoogleLogin}
                    >
                        <View style={styles.googleButtonContent}>
                            <Text style={styles.googleIcon}>G</Text>
                            <Text style={styles.googleButtonText}>Continuar con Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        paddingTop: Platform.OS === 'android' ? 25 : 0, 
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titleText: {
        fontSize: 30,
        color: COLORS.TEXT,
        textAlign: 'center',
        marginBottom: 5,
    },
    appNameText: {
        fontSize: 50,
        fontWeight: '900', 
        color: COLORS.HIGHLIGHT, 
        textAlign: 'center',
        marginBottom: 50,
    },
    subtitle: {
        fontSize: 20,
        color: COLORS.TEXT,
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonsContainer: {
        width: '100%',
        gap: 15,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    studentButton: {
        backgroundColor: COLORS.HIGHLIGHT,
    },
    visitorButton: {
        backgroundColor: COLORS.SECONDARY,
    },
    googleButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        backgroundColor: '#4285F4',
        color: 'white',
        width: 24,
        height: 24,
        borderRadius: 12,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    buttonText: {
        color: COLORS.BACKGROUND,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonSubtext: {
        color: COLORS.BACKGROUND,
        fontSize: 14,
        opacity: 0.8,
        marginTop: 2,
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    }
});