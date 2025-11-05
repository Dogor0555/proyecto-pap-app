import { useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentDashboard() {
    const navigation = useNavigation();

    const features = [
        { 
            title: 'Guías PAP', 
            description: 'Primeros Auxilios Psicológicos',
            screen: 'GuiasPAP',
            icon: '📚'
        },
        { 
            title: 'Diario Emocional', 
            description: 'Registra tu estado de ánimo',
            screen: 'DiarioEmocional',
            icon: '📝'
        },
        { 
            title: 'Botón de Emergencia', 
            description: 'Contacto inmediato',
            screen: 'Emergencia',
            icon: '🚨'
        },
        { 
            title: 'Microcursos', 
            description: 'Recursos de 5-10 min',
            screen: 'Microcursos',
            icon: '🎓'
        },
        { 
            title: 'Chat Anónimo', 
            description: 'Con psicólogos',
            screen: 'Chat',
            icon: '💬'
        },
        { 
            title: 'Notificaciones', 
            description: 'Recordatorios de autocuidado',
            screen: 'Notificaciones',
            icon: '🔔'
        },
    ];

    const handleFeaturePress = (feature) => {
        if (feature.screen === 'Notificaciones') {
            Alert.alert('Notificaciones', 'Configura tus recordatorios de autocuidado');
        } else {
            navigation.navigate(feature.screen);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido Estudiante</Text>
                <Text style={styles.subtitle}>PAP-USO - Tu bienestar es importante</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.welcomeCard}>
                    <Text style={styles.welcomeTitle}>¡Hola Estudiante!</Text>
                    <Text style={styles.welcomeText}>
                        Accede a todas las herramientas de apoyo psicológico y emocional diseñadas para ti.
                    </Text>
                </View>

                <View style={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.featureCard}
                            onPress={() => handleFeaturePress(feature)}
                        >
                            <Text style={styles.featureIcon}>{feature.icon}</Text>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDescription}>{feature.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2B4B',
    },
    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#1E2B4B',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#95E3E7',
        marginTop: 5,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    welcomeCard: {
        backgroundColor: '#95E3E7',
        margin: 20,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: '#1E2B4B',
        textAlign: 'center',
        opacity: 0.8,
    },
    featuresGrid: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        backgroundColor: '#95E3E7',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    featureIcon: {
        fontSize: 30,
        marginBottom: 8,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        textAlign: 'center',
    },
    featureDescription: {
        fontSize: 12,
        color: '#1E2B4B',
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.8,
    },
});