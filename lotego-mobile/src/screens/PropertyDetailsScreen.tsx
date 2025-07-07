import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { supabase } from '@/services/supabase';
import { Property } from '@/types/database';
import { Ionicons } from '@expo/vector-icons';

type PropertyDetailsRouteProp = RouteProp<RootStackParamList, 'PropertyDetails'>;

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const route = useRoute<PropertyDetailsRouteProp>();
  const { propertyId } = route.params;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do terreno');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleVisit = () => {
    Alert.alert('Agendar Visita', 'Funcionalidade em desenvolvimento');
  };

  if (loading || !property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.propertyImage}
              />
            ))}
          </ScrollView>
          <View style={styles.imagePagination}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={20} color="#666" />
            <Text style={styles.location}>
              {property.address}, {property.city} - {property.state}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.price}>
              R$ {property.price.toLocaleString('pt-BR')}
            </Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="resize-outline" size={24} color="#FF6B35" />
              <Text style={styles.infoLabel}>Área</Text>
              <Text style={styles.infoValue}>{property.lot_size} m²</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#FF6B35" />
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>
                {property.status === 'available' ? 'Disponível' : property.status}
              </Text>
            </View>
          </View>

          {property.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.description}>{property.description}</Text>
            </View>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características</Text>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="call-outline" size={20} color="#FF6B35" />
          <Text style={styles.contactButtonText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleScheduleVisit}
        >
          <Text style={styles.scheduleButtonText}>Agendar Visita</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: width,
    height: 300,
  },
  imagePagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  priceContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 5,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 4,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  contactButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  scheduleButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});