import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { supabase } from '@/services/supabase';
import { Property } from '@/types/database';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function SearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .or(`city.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`)
        .limit(20);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProperty = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
    >
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultLocation}>
          <Ionicons name="location-outline" size={14} color="#666" />
          {' '}{item.address}, {item.city}
        </Text>
        <Text style={styles.resultPrice}>R$ {item.price.toLocaleString('pt-BR')}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Buscar Terrenos</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por cidade, endereço..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={results}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            !loading && searchQuery.length > 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#CCC" />
                <Text style={styles.emptyText}>Nenhum terreno encontrado</Text>
                <Text style={styles.emptySubtext}>Tente buscar por outra cidade</Text>
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
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
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#1A1A1A',
  },
  searchButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsList: {
    paddingHorizontal: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  resultLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});