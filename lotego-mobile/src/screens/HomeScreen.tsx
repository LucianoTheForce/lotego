import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { supabase } from '@/services/supabase';
import { Property } from '@/types/database';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .limit(10);

      if (error) throw error;
      setFeaturedProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProperty = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
    >
      <Image
        source={{ uri: item.images[0] || 'https://via.placeholder.com/300x200' }}
        style={styles.propertyImage}
      />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.city}, {item.state}</Text>
        <Text style={styles.propertyPrice}>
          R$ {item.price.toLocaleString('pt-BR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo ao LotGo</Text>
          <Text style={styles.subtitle}>Encontre o terreno dos seus sonhos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terrenos em Destaque</Text>
          <FlatList
            data={featuredProperties}
            renderItem={renderProperty}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertyList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por que escolher LotGo?</Text>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Visitas Agendadas</Text>
            <Text style={styles.featureDescription}>
              Agende visitas com corretores especializados
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Mapas Interativos</Text>
            <Text style={styles.featureDescription}>
              Visualize terrenos no mapa e explore a região
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Transparência Total</Text>
            <Text style={styles.featureDescription}>
              Informações claras sobre preços e comissões
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  propertyList: {
    paddingHorizontal: 20,
  },
  propertyCard: {
    width: 280,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  propertyInfo: {
    padding: 15,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 8,
  },
  featureCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});