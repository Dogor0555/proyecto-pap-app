import { useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GuiasPAPScreen() {
    const navigation = useNavigation();

    const guias = [
        {
            id: 1,
            titulo: 'Ataque de Ansiedad',
            pasos: [
                'Busca un lugar tranquilo',
                'Practica respiración profunda',
                'Enfócate en el presente',
                'Usa técnicas de grounding'
            ],
            color: '#95E3E7'
        },
        {
            id: 2,
            titulo: 'Duelo y Pérdida',
            pasos: [
                'Permítete sentir',
                'Busca apoyo social',
                'Establece rutinas',
                'Practica autocuidado'
            ],
            color: '#E74C7D'
        },
        {
            id: 3,
            titulo: 'Estrés Académico',
            pasos: [
                'Organiza tu tiempo',
                'Divide tareas grandes',
                'Toma descansos',
                'Practica ejercicio'
            ],
            color: '#1E2B4B'
        },
        {
            id: 4,
            titulo: 'Crisis Emocional',
            pasos: [
                'Identifica emociones',
                'Busca apoyo inmediato',
                'Usa técnicas de calma',
                'Contacta ayuda profesional'
            ],
            color: '#FFA726'
        }
    ];

    const handleGuiaPress = (guia) => {
        Alert.alert(
            guia.titulo,
            `Pasos:\n\n${guia.pasos.map((paso, index) => `${index + 1}. ${paso}`).join('\n')}`,
            [{ text: 'Entendido', style: 'default' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Guías PAP</Text>
                <Text style={styles.subtitle}>Primeros Auxilios Psicológicos</Text>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.description}>
                    Guías prácticas para manejar situaciones emocionales difíciles
                </Text>

                <View style={styles.guiasList}>
                    {guias.map((guia) => (
                        <TouchableOpacity 
                            key={guia.id}
                            style={[styles.guiaCard, { backgroundColor: guia.color }]}
                            onPress={() => handleGuiaPress(guia)}
                        >
                            <Text style={styles.guiaTitle}>{guia.titulo}</Text>
                            <Text style={styles.guiaSubtitle}>Toca para ver los pasos</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>💡 Recuerda</Text>
                    <Text style={styles.infoText}>
                        Estas guías son de primeros auxilios. Si necesitas ayuda profesional, no dudes en contactar a los servicios de psicología.
                    </Text>
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
        backgroundColor: '#1E2B4B',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backButtonText: {
        color: '#95E3E7',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#95E3E7',
        textAlign: 'center',
        marginTop: 5,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    guiasList: {
        gap: 15,
        marginBottom: 20,
    },
    guiaCard: {
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    guiaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    guiaSubtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
    },
    infoCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#95E3E7',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});