import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Dragon Ball
            </Text>

            <Text style={styles.subtitulo}>
                Aplicativo mobile para consulta de personagens
                da série Dragon Ball através de uma API pública.
            </Text>

            <View style={styles.botao}>

                <Button
                    title="Ver Personagens"
                    onPress={() => navigation.navigate("Personagens")}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#FFF3E0"
    },

    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#1565C0"
    },

    subtitulo: {
        fontSize: 17,
        textAlign: "center",
        lineHeight: 25,
        marginBottom: 30,
        color: "#444444"
    },

    botao: {
        marginHorizontal: 20
    }

});