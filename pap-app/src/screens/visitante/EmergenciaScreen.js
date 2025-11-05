import { useNavigation } from '@react-navigation/native';
import { Alert, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmergenciaScreen() {
    const navigation = useNavigation();

    const contactosEmergencia = [
        {
            id: 1,
            nombre: 'Línea de Crisis Nacional',
            telefono: '123',
            tipo: 'Línea gratuita',
            color: '#F44336'
        },
        {
            id: 2,
            nombre: 'Amigo de Confianza',
            telefono: '+573001234567',
            tipo: 'Contacto personal',
            color: '#2196F3'
        },
        {
            id: 3,
            nombre: 'Psicología USO',
            telefono: '+5712345678',
            tipo: 'Universidad',
            color: '#4CAF50'
        },
        {
            id: 4,
            nombre: 'Urgencias Médicas',
            telefono: '911',
            tipo: 'Emergencias',
            color: '#FF9800'
        }
    ];

    const handleLlamar = (telefono, nombre) => {
        Alert.alert(
            'Llamar',
            `¿Quieres llamar a ${nombre}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Llamar', 
                    onPress: () => Linking.openURL(`tel:${telefono}`)
                }
            ]
        );
    };

    const recursosAdicionales = [
        {
            titulo: 'Respiración 4-7-8',
            descripcion: 'Técnica de relajación inmediata',
            pasos: ['Inhala 4 segundos', 'Mantén 7 segundos', 'Exhala 8 segundos']
        },
        {
            titulo: 'Grounding 5-4-3-2-1',
            descripcion: 'Conéctate con el presente',
            pasos: ['5 cosas que ves', '4 que tocas', '3 que oyes', '2 que hueles', '1 que saboreas']
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Botón de Emergencia</Text>
                <Text style={styles.subtitle}>Ayuda inmediata cuando más la necesitas</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.alertCard}>
                    <Text style={styles.alertIcon}>🚨</Text>
                    <Text style={styles.alertTitle}>¿Estás en crisis?</Text>
                    <Text style={styles.alertText}>
                        No estás solo. Hay personas que pueden ayudarte en este momento.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Contactos de Emergencia</Text>
                <View style={styles.contactosList}>
                    {contactosEmergencia.map((contacto) => (
                        <TouchableOpacity
                            key={contacto.id}
                            style={[styles.contactoCard, { backgroundColor: contacto.color }]}
                            onPress={() => handleLlamar(contacto.telefono, contacto.nombre)}
                        >
                            <Text style={styles.contactoNombre}>{contacto.nombre}</Text>
                            <Text style={styles.contactoTipo}>{contacto.tipo}</Text>
                            <Text style={styles.contactoTelefono}>{contacto.telefono}</Text>
                            <Text style={styles.llamarText}>Toca para llamar →</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Técnicas de Calma Inmediata</Text>
                <View style={styles.tecnicasList}>
                    {recursosAdicionales.map((tecnica, index) => (
                        <View key={index} style={styles.tecnicaCard}>
                            <Text style={styles.tecnicaTitulo}>{tecnica.titulo}</Text>
                            <Text style={styles.tecnicaDescripcion}>{tecnica.descripcion}</Text>
                            <View style={styles.pasosList}>
                                {tecnica.pasos.map((paso, idx) => (
                                    <Text key={idx} style={styles.pasoText}>• {paso}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>💙 Recuerda</Text>
                    <Text style={styles.infoText}>
                        Pedir ayuda es una muestra de fortaleza. No dudes en contactar a los profesionales cuando lo necesites.
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
    alertCard: {
        backgroundColor: '#FFF3CD',
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
        alignItems: 'center',
        marginBottom: 20,
    },
    alertIcon: {
        fontSize: 40,
        marginBottom: 10,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: 5,
    },
    alertText: {
        fontSize: 14,
        color: '#856404',
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
    contactosList: {
        gap: 15,
        marginBottom: 25,
    },
    contactoCard: {
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contactoNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    contactoTipo: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
        marginBottom: 5,
    },
    contactoTelefono: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    llamarText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    tecnicasList: {
        gap: 15,
        marginBottom: 20,
    },
    tecnicaCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#95E3E7',
    },
    tecnicaTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 5,
    },
    tecnicaDescripcion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    pasosList: {
        gap: 3,
    },
    pasoText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
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