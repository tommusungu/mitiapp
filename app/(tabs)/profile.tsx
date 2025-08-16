import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';
import {
  Settings,
  Info,
  LogOut,
  Edit3,
  TreePine,
  Camera,
  Award,
  ChevronRight
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, savedTrees, logout } = useAppStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  const menuItems = [
    {
      icon: Edit3,
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: handleEditProfile,
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      onPress: handleSettings,
    },
    {
      icon: Info,
      title: 'About',
      subtitle: 'Learn more about MitiApp',
      onPress: handleAbout,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.statGradient}>
              <TreePine color="#fff" size={24} />
              <Text style={styles.statNumber}>{savedTrees.length}</Text>
              <Text style={styles.statLabel}>Trees Saved</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.statGradient}>
              <Camera color="#fff" size={24} />
              <Text style={styles.statNumber}>{savedTrees.filter(t => t.confidence).length}</Text>
              <Text style={styles.statLabel}>AI Identified</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statGradient}>
              <Award color="#fff" size={24} />
              <Text style={styles.statNumber}>
                {savedTrees.length >= 10 ? 'Expert' : savedTrees.length >= 5 ? 'Explorer' : 'Beginner'}
              </Text>
              <Text style={styles.statLabel}>Level</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuIcon}>
                <item.icon color="#6366F1" size={24} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <LogOut color="#EF4444" size={24} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.version}>MitiApp v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 12,
  },
  version: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 24,
    marginBottom: 20,
  },
});