import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function Personagens({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);

  useEffect(() => {
    carregarPersonagens();
  }, [pagina]);

  const carregarPersonagens = async () => {
    // Trava de segurança: impede requisições se já estiver carregando ou se acabaram os itens
    if (loading || !temMais) return;

    setLoading(true);

    try {
      const response = await fetch(`https://dragonball-api.com/api/characters?page=${pagina}&limit=10`);
      const data = await response.json();

      const novosItens = data.items || data || [];

      if (novosItens.length === 0) {
        setTemMais(false);
      } else {
        // Filtra personagens para garantir que nenhum ID duplicado seja adicionado à lista
        setPersonagens((prev) => {
          const idsExistentes = new Set(prev.map((p) => p.id));
          const filtrados = novosItens.filter((p) => !idsExistentes.has(p.id));
          return [...prev, ...filtrados];
        });
      }
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarMais = () => {
    if (!loading && temMais) {
      setPagina((prev) => prev + 1);
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesPersonagem', { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.imagem} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.detalhe}>Raça: {item.race}</Text>
        <Text style={styles.detalhe}>Gênero: {item.gender}</Text>
        <Text style={styles.detalhe}>Ki: {item.ki}</Text>
        <Text style={styles.link}>Ver detalhes →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha um personagem</Text>
      <Text style={styles.subtitulo}>Toque em um personagem para ver seus detalhes</Text>

      <FlatList
        data={personagens}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Chave única garantida
        renderItem={renderCard}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.2} // Reduz a sensibilidade do disparo ao rolar
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#FF8C00" style={{ marginVertical: 20 }} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0E6', padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1E56A0', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FF8C00',
  },
  imagem: { width: 90, height: 110, borderRadius: 8, backgroundColor: '#E3F2FD' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#1E56A0', marginBottom: 4 },
  detalhe: { fontSize: 13, color: '#444', marginBottom: 2 },
  link: { fontSize: 13, fontWeight: 'bold', color: '#FF8C00', marginTop: 6 },
});