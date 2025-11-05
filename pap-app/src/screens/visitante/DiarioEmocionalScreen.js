import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiarioEmocionalScreen() {
    const navigation = useNavigation();
    const [emocion, setEmocion] = useState('');
    const [notas, setNotas] = useState('');

    const emociones = [
        { emoji: '😊', nombre: 'Feliz', color: '#4CAF50' },
        { emoji: '😢', nombre: 'Triste', color: '#2196F3' },
        { emoji: '😡', nombre: 'Enojado', color: '#F44336' },
        { emoji: '😰', nombre: 'Ansioso', color: '#FF9800' },
        { emoji: '😴', nombre: 'Cansado', color: '#9C27B0' },
        { emoji: '😐', nombre: 'Neutral', color: '#607D8B' },
    ];

    const handleEmocionSelect = (nombre) => {
        setEmocion(nombre);
    };

    const guardarRegistro = () => {
        if (!emocion) {
            Alert.alert('Error', 'Por favor selecciona una emoción');
            return;
        }

        Alert.alert(
            'Registro Guardado',
            `Emoción: ${emocion}\nNotas: ${notas || 'Sin notas'}`,
            [{ text: 'OK', onPress: () => {
                setEmocion('');
                setNotas('');
            }}]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Diario Emocional</Text>
                <Text style={styles.subtitle}>Registra cómo te sientes hoy</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>¿Cómo te sientes hoy?</Text>
                    <View style={styles.emocionesGrid}>
                        {emociones.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.emocionButton,
                                    { backgroundColor: item.color },
                                    emocion === item.nombre && styles.emocionSelected
                                ]}
                                onPress={() => handleEmocionSelect(item.nombre)}
                            >
                                <Text style={styles.emocionEmoji}>{item.emoji}</Text>
                                <Text style={styles.emocionText}>{item.nombre}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notas adicionales</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="¿Qué te hace sentir así? ¿Algo específico que quieras recordar?"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        value={notas}
                        onChangeText={setNotas}
                    />
                </View>

                <TouchableOpacity style={styles.guardarButton} onPress={guardarRegistro}>
                    <Text style={styles.guardarButtonText}>Guardar Registro</Text>
                </TouchableOpacity>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>📈 Tu Evolución</Text>
                    <Text style={styles.infoText}>
                        Llevar un registro diario te ayuda a identificar patrones y entender mejor tus emociones.
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
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 15,
    },
    emocionesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    emocionButton: {
        width: '48%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    emocionSelected: {
        transform: [{ scale: 1.05 }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    emocionEmoji: {
        fontSize: 30,
        marginBottom: 5,
    },
    emocionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        textAlignVertical: 'top',
        minHeight: 100,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
    },
    guardarButton: {
        backgroundColor: '#1E2B4B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    guardarButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#95E3E7',
        marginTop: 20,
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