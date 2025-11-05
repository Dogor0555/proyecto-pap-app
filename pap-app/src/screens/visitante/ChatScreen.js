import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
    const navigation = useNavigation();
    const [mensaje, setMensaje] = useState('');
    const [conversacion, setConversacion] = useState([]);

    const preguntasFrecuentes = [
        {
            pregunta: "¿Cómo manejo el estrés de exámenes?",
            respuesta: "Te recomiendo: planificar tu tiempo, tomar descansos regulares, practicar respiración profunda y mantener una rutina de sueño consistente."
        },
        {
            pregunta: "Me siento muy ansioso/a últimamente",
            respuesta: "La ansiedad es común. Prueba técnicas de grounding, ejercicio físico regular y limita la cafeína. Si persiste, considera hablar con un profesional."
        },
        {
            pregunta: "¿Es normal sentirse abrumado?",
            respuesta: "Completamente normal. Todos nos sentimos abrumados a veces. Divide las tareas en pasos pequeños y celebra los pequeños logros."
        },
        {
            pregunta: "No puedo dormir bien",
            respuesta: "Intenta: establecer una rutina antes de dormir, evitar pantallas 1 hora antes, crear un ambiente tranquilo y practicar relajación."
        }
    ];

    const enviarMensaje = () => {
        if (!mensaje.trim()) {
            Alert.alert('Error', 'Por favor escribe un mensaje');
            return;
        }

        const nuevoMensaje = {
            id: Date.now(),
            texto: mensaje,
            esUsuario: true,
            timestamp: new Date().toLocaleTimeString()
        };

        setConversacion(prev => [...prev, nuevoMensaje]);
        setMensaje('');

        // Simular respuesta automática después de 2 segundos
        setTimeout(() => {
            const respuesta = {
                id: Date.now() + 1,
                texto: "Gracias por tu mensaje. Un psicólogo se pondrá en contacto contigo pronto. Mientras tanto, recuerda que no estás solo/a y hay recursos disponibles para apoyarte.",
                esUsuario: false,
                timestamp: new Date().toLocaleTimeString(),
                esPsicologo: true
            };
            setConversacion(prev => [...prev, respuesta]);
        }, 2000);
    };

    const usarPreguntaFrecuente = (faq) => {
        setMensaje(faq.pregunta);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Chat Anónimo</Text>
                <Text style={styles.subtitle}>Comunícate de forma segura</Text>
            </View>

            <KeyboardAvoidingView 
                style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>🔒 Chat Anónimo y Seguro</Text>
                    <Text style={styles.infoText}>
                        Tu conversación es confidencial. Un psicólogo te responderá pronto.
                    </Text>
                </View>

                <ScrollView style={styles.chatContainer}>
                    {conversacion.length === 0 ? (
                        <View style={styles.welcomeMessage}>
                            <Text style={styles.welcomeTitle}>Bienvenido al Chat</Text>
                            <Text style={styles.welcomeText}>
                                Escribe tu mensaje o selecciona una pregunta frecuente para comenzar.
                            </Text>
                        </View>
                    ) : (
                        conversacion.map((msg) => (
                            <View 
                                key={msg.id} 
                                style={[
                                    styles.mensajeBurbuja,
                                    msg.esUsuario ? styles.mensajeUsuario : styles.mensajeSistema
                                ]}
                            >
                                <Text style={[
                                    styles.mensajeTexto,
                                    msg.esUsuario ? styles.mensajeTextoUsuario : styles.mensajeTextoSistema
                                ]}>
                                    {msg.texto}
                                </Text>
                                {msg.esPsicologo && (
                                    <Text style={styles.psicologoTag}>Psicólogo PAP-USO</Text>
                                )}
                                <Text style={styles.timestamp}>{msg.timestamp}</Text>
                            </View>
                        ))
                    )}
                </ScrollView>

                <View style={styles.preguntasSection}>
                    <Text style={styles.preguntasTitle}>Preguntas Frecuentes</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.preguntasContainer}>
                            {preguntasFrecuentes.map((faq, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.preguntaButton}
                                    onPress={() => usarPreguntaFrecuente(faq)}
                                >
                                    <Text style={styles.preguntaText}>{faq.pregunta}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Escribe tu mensaje aquí..."
                        placeholderTextColor="#999"
                        value={mensaje}
                        onChangeText={setMensaje}
                        multiline
                    />
                    <TouchableOpacity style={styles.enviarButton} onPress={enviarMensaje}>
                        <Text style={styles.enviarButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        padding: 15,
        margin: 20,
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
        lineHeight: 18,
    },
    chatContainer: {
        flex: 1,
        padding: 15,
    },
    welcomeMessage: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    mensajeBurbuja: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    mensajeUsuario: {
        alignSelf: 'flex-end',
        backgroundColor: '#95E3E7',
    },
    mensajeSistema: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f1f1',
    },
    mensajeTexto: {
        fontSize: 14,
        lineHeight: 18,
    },
    mensajeTextoUsuario: {
        color: '#1E2B4B',
    },
    mensajeTextoSistema: {
        color: '#333',
    },
    psicologoTag: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 5,
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
        marginTop: 5,
        textAlign: 'right',
    },
    preguntasSection: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    preguntasTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E2B4B',
        marginBottom: 10,
    },
    preguntasContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    preguntaButton: {
        backgroundColor: '#1E2B4B',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    preguntaText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
        backgroundColor: '#f8f9fa',
    },
    enviarButton: {
        backgroundColor: '#1E2B4B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    enviarButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});