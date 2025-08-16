import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  TreePine,
  Heart,
  Globe,
  Mail,
  ExternalLink
} from 'lucide-react-native';

export default function AboutScreen() {
  const handleContactUs = () => {
    Linking.openURL('mailto:support@mitiapp.com');
  };

  const handleWebsite = () => {
    Linking.openURL('https://mitiapp.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About MitiApp</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo & Title */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <TreePine color="#10B981" size={48} />
          </View>
          <Text style={styles.appName}>MitiApp</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        {/* Mission Statement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            MitiApp is dedicated to promoting environmental awareness and tree conservation 
            through cutting-edge AI technology. We believe that by making tree identification 
            accessible to everyone, we can foster a deeper connection between people and nature.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🤖</Text>
              <Text style={styles.featureText}>AI-powered tree identification</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>📚</Text>
              <Text style={styles.featureText}>Comprehensive tree database</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💾</Text>
              <Text style={styles.featureText}>Personal tree collection</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🌍</Text>
              <Text style={styles.featureText}>Conservation awareness</Text>
            </View>
          </View>
        </View>

        {/* Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built with Love</Text>
          <View style={styles.teamCard}>
            <Heart color="#EF4444" size={24} />
            <Text style={styles.teamText}>
              Created by a passionate team of developers, botanists, and environmental 
              enthusiasts who care deeply about our planet&apos;s future.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <TouchableOpacity style={styles.contactItem} onPress={handleContactUs}>
            <Mail color="#6366F1" size={24} />
            <Text style={styles.contactText}>support@mitiapp.com</Text>
            <ExternalLink color="#9CA3AF" size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
            <Globe color="#6366F1" size={24} />
            <Text style={styles.contactText}>www.mitiapp.com</Text>
            <ExternalLink color="#9CA3AF" size={16} />
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View style={styles.legalSection}>
          <Text style={styles.legalText}>
            © 2024 MitiApp. All rights reserved.
          </Text>
          <Text style={styles.legalText}>
            Made with 🌱 for a greener future
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  missionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginLeft: 16,
    flex: 1,
  },
  contactItem: {
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
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
    flex: 1,
  },
  legalSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  legalText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
});