import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { supabase } from '@/services/supabase';
import { Ionicons } from '@expo/vector-icons';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            setUser(null);
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.message}>Faça login para acessar seu perfil</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="calendar-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Minhas Visitas</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Favoritos</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Configurações</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#FF6B35" />
          <Text style={[styles.menuText, { color: '#FF6B35' }]}>Sair</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  message: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  menu: {
    paddingHorizontal: 20,
  },
  menuItem: {
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
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 15,
  },
});