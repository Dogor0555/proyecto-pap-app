import { useNavigation } from '@react-navigation/native';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MicrocursosScreen() {
    const navigation = useNavigation();

    const microcursos = [
        {
            id: 1,
            titulo: 'Manejo del Estrés',
            duracion: '5 min',
            temas: ['Identificar fuentes', 'Técnicas rápidas', 'Prevención'],
            icon: '🌊',
            color: '#95E3E7'
        },
        {
            id: 2,
            titulo: 'Ansiedad Académica',
            duracion: '8 min',
            temas: ['Síntomas', 'Estrategias', 'Plan de acción'],
            icon: '🎯',
            color: '#E74C7D'
        },
        {
            id: 3,
            titulo: 'Autocuidado Diario',
            duracion: '6 min',
            temas: ['Rutinas', 'Alimentación', 'Descanso'],
            icon: '💆',
            color: '#4CAF50'
        },
        {
            id: 4,
            titulo: 'Relaciones Saludables',
            duracion: '7 min',
            temas: ['Límites', 'Comunicación', 'Apoyo'],
            icon: '🤝',
            color: '#FF9800'
        },
        {
            id: 5,
            titulo: 'Mindfulness Básico',
            duracion: '5 min',
            temas: ['Respiración', 'Atención plena', 'Práctica'],
            icon: '🧘',
            color: '#9C27B0'
        },
        {
            id: 6,
            titulo: 'Manejo del Tiempo',
            duracion: '6 min',
            temas: ['Priorización', 'Planificación', 'Descansos'],
            icon: '⏰',
            color: '#607D8B'
        }
    ];

    const handleCursoPress = (curso) => {
        Alert.alert(
            curso.titulo,
            `Duración: ${curso.duracion}\n\nTemas:\n${curso.temas.map(tema => `• ${tema}`).join('\n')}`,
            [
                { text: 'Cerrar', style: 'cancel' },
                { text: 'Comenzar', style: 'default' }
            ]
        );
    };

    const tipsAutocuidado = [
        'Toma 5 minutos para respirar profundamente',
        'Hidrátate durante el día',
        'Haz pausas activas cada 2 horas',
        'Practica la gratitud diaria',
        'Establece límites saludables'
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Microcursos</Text>
                <Text style={styles.subtitle}>Aprende en 5-10 minutos</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.introCard}>
                    <Text style={styles.introTitle}>Aprendizaje Rápido</Text>
                    <Text style={styles.introText}>
                        Cápsulas de conocimiento diseñadas para tu bienestar emocional y mental.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Cursos Disponibles</Text>
                <View style={styles.cursosGrid}>
                    {microcursos.map((curso) => (
                        <TouchableOpacity
                            key={curso.id}
                            style={[styles.cursoCard, { backgroundColor: curso.color }]}
                            onPress={() => handleCursoPress(curso)}
                        >
                            <Text style={styles.cursoIcon}>{curso.icon}</Text>
                            <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
                            <Text style={styles.cursoDuracion}>{curso.duracion}</Text>
                            <Text style={styles.cursoTemas}>
                                {curso.temas.slice(0, 2).join(' • ')}
                            </Text>
                            <Text style={styles.cursoAction}>Toca para comenzar →</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Tips de Autocuidado</Text>
                <View style={styles.tipsCard}>
                    {tipsAutocuidado.map((tip, index) => (
                        <View key={index} style={styles.tipItem}>
                            <Text style={styles.tipNumber}>{index + 1}</Text>
                            <Text style={styles.tipText}>{tip}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.recomendacionCard}>
                    <Text style={styles.recomendacionTitle}>💡 Recomendación</Text>
                    <Text style={styles.recomendacionText}>
                        Dedica 10 minutos al día a tu bienestar mental. Pequeñas acciones consistentes generan grandes cambios.
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
    introCard: {
        backgroundColor: '#95E3E7',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
    },
    introTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 10,
    },
    introText: {
        fontSize: 14,
        color: '#1E2B4B',
        textAlign: 'center',
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 15,
        marginTop: 10,
    },
    cursosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
        marginBottom: 25,
    },
    cursoCard: {
        width: '48%',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cursoIcon: {
        fontSize: 30,
        marginBottom: 8,
        textAlign: 'center',
    },
    cursoTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
    },
    cursoDuracion: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        opacity: 0.9,
    },
    cursoTemas: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        opacity: 0.8,
    },
    cursoAction: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tipsCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    tipNumber: {
        backgroundColor: '#1E2B4B',
        color: 'white',
        width: 20,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 10,
        lineHeight: 20,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    recomendacionCard: {
        backgroundColor: '#E3F2FD',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    recomendacionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 5,
    },
    recomendacionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});