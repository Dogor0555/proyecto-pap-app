import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
    BACKGROUND: '#1E2B4B',   
    TEXT: 'white',           
    HIGHLIGHT: '#95E3E7',    
    SECONDARY: '#E74C7D',
    SUCCESS: '#4CAF50'
};

export default function AccessScreen() {
    const navigation = useNavigation();

    const handleStudentLogin = () => {
        navigation.navigate('Login');
    };

    const handleVisitorAccess = () => {
        navigation.navigate('VisitorDashboard');
    };

    const handleRegister = () => {
        navigation.navigate('Register');
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
                    Primeros Auxilios Psicológicos
                </Text>

                <Text style={styles.description}>
                    Tu bienestar emocional es nuestra prioridad
                </Text>
                
                <View style={styles.buttonsContainer}>
                    {/* Botón para estudiantes */}
                    <TouchableOpacity 
                        style={[styles.button, styles.studentButton]}
                        onPress={handleStudentLogin}
                    >
                        <Text style={styles.buttonText}>Soy Estudiante</Text>
                        <Text style={styles.buttonSubtext}>Iniciar sesión con mi cuenta</Text>
                    </TouchableOpacity>

                    {/* Botón para registro */}
                    <TouchableOpacity 
                        style={[styles.button, styles.registerButton]}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Crear Cuenta</Text>
                        <Text style={styles.buttonSubtext}>Registrarme como estudiante</Text>
                    </TouchableOpacity>

                    {/* Botón para visitantes */}
                    <TouchableOpacity 
                        style={[styles.button, styles.visitorButton]}
                        onPress={handleVisitorAccess}
                    >
                        <Text style={styles.buttonText}>Entrar como Visitante</Text>
                        <Text style={styles.buttonSubtext}>Explorar la app sin registro</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        💙 Tu salud mental es importante
                    </Text>
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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.TEXT,
        textAlign: 'center',
        marginBottom: 5,
        opacity: 0.9,
    },
    description: {
        fontSize: 16,
        color: COLORS.HIGHLIGHT,
        textAlign: 'center',
        marginBottom: 40,
        opacity: 0.8,
    },
    buttonsContainer: {
        width: '100%',
        gap: 12,
    },
    button: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    studentButton: {
        backgroundColor: COLORS.HIGHLIGHT,
    },
    visitorButton: {
        backgroundColor: COLORS.SECONDARY,
    },
    registerButton: {
        backgroundColor: COLORS.SUCCESS,
    },
    buttonText: {
        color: COLORS.BACKGROUND,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonSubtext: {
        color: COLORS.BACKGROUND,
        fontSize: 14,
        opacity: 0.9,
        marginTop: 4,
    },
    infoContainer: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'rgba(149, 227, 231, 0.1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(149, 227, 231, 0.3)',
    },
    infoText: {
        color: COLORS.HIGHLIGHT,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
});