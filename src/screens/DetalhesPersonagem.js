import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

export default function DetalhesPersonagem({ route }) {
  // Captura o ID passado pela navegação
  const { id } = route.params || {};

  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (id) {
      buscarDetalhes();
    } else {
      setErro('ID do personagem não encontrado.');
      setLoading(false);
    }
  }, [id]);

  const buscarDetalhes = async () => {
    try {
      const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
      if (!response.ok) throw new Error('Não foi possível carregar os detalhes.');
      
      const data = await response.json();
      setPersonagem(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  if (erro || !personagem) {
    return (
      <View style={styles.center}>
        <Text style={styles.erroText}>{erro || 'Personagem não encontrado.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: personagem.image }} style={styles.imagem} resizeMode="contain" />
        <Text style={styles.nome}>{personagem.name}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Raça: <Text style={styles.valor}>{personagem.race}</Text></Text>
          <Text style={styles.label}>Gênero: <Text style={styles.valor}>{personagem.gender}</Text></Text>
          <Text style={styles.label}>Ki Base: <Text style={styles.valor}>{personagem.ki}</Text></Text>
          <Text style={styles.label}>Max Ki: <Text style={styles.valor}>{personagem.maxKi}</Text></Text>
          <Text style={styles.label}>Afiliação: <Text style={styles.valor}>{personagem.affiliation}</Text></Text>
        </View>

        <Text style={styles.descricaoTitulo}>Descrição:</Text>
        <Text style={styles.descricao}>{personagem.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0E6', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF0E6' },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 20 },
  imagem: { width: 180, height: 220, marginBottom: 16 },
  nome: { fontSize: 24, fontWeight: 'bold', color: '#1E56A0', marginBottom: 12 },
  infoBox: { width: '100%', backgroundColor: '#F0F4F8', padding: 12, borderRadius: 8, marginBottom: 16 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  valor: { fontWeight: 'normal', color: '#555' },
  descricaoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1E56A0', alignSelf: 'flex-start', marginBottom: 6 },
  descricao: { fontSize: 14, color: '#444', lineHeight: 20 },
  erroText: { color: 'red', fontSize: 16 }
});