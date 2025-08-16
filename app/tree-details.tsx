import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { mockTrees } from '@/data/mockTrees';
import { useAppStore } from '@/stores/useAppStore';
import {
  ArrowLeft,
  MapPin,
  Heart,
  Camera,
  Share
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function TreeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'location'>('overview');
  const { savedTrees } = useAppStore();
  
  // Find tree in mock data or saved trees
  const tree = mockTrees.find(t => t.id === id) || savedTrees.find(t => t.id === id);
  
  if (!tree) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Tree not found</Text>
      </SafeAreaView>
    );
  }

  const handleAIIdentify = () => {
    router.push('/(tabs)/ai-identify');
  };

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'health', label: 'Health' },
    { key: 'location', label: 'Location' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>{tree.description}</Text>
            
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{tree.category}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Age Stage</Text>
                <Text style={styles.infoValue}>{tree.ageStage}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Date Added</Text>
                <Text style={styles.infoValue}>{tree.dateAdded}</Text>
              </View>
              {tree.confidence && (
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>AI Confidence</Text>
                  <Text style={styles.infoValue}>{tree.confidence}%</Text>
                </View>
              )}
            </View>
          </View>
        );
      
      case 'health':
        return (
          <View style={styles.tabContent}>
            <View style={styles.healthCard}>
              <View style={styles.healthHeader}>
                <Heart color={getHealthColor(tree.healthStatus)} size={24} />
                <Text style={styles.healthTitle}>Health Status</Text>
              </View>
              <View style={[styles.healthBadge, { backgroundColor: getHealthColor(tree.healthStatus) }]}>
                <Text style={styles.healthText}>{tree.healthStatus}</Text>
              </View>
            </View>
            
            <Text style={styles.healthDescription}>
              This tree appears to be in {tree.healthStatus} condition based on visual assessment. 
              Regular monitoring and proper care can help maintain its health.
            </Text>
            
            <View style={styles.healthTips}>
              <Text style={styles.tipsTitle}>Care Tips:</Text>
              <Text style={styles.tipItem}>• Ensure adequate water supply</Text>
              <Text style={styles.tipItem}>• Monitor for pests and diseases</Text>
              <Text style={styles.tipItem}>• Prune dead or damaged branches</Text>
              <Text style={styles.tipItem}>• Protect from extreme weather</Text>
            </View>
          </View>
        );
      
      case 'location':
        return (
          <View style={styles.tabContent}>
            {tree.location ? (
              <>
                <View style={styles.locationCard}>
                  <MapPin color="#10B981" size={24} />
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationAddress}>{tree.location.address}</Text>
                    <Text style={styles.locationCoords}>
                      {tree.location.latitude.toFixed(4)}, {tree.location.longitude.toFixed(4)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.mapPlaceholder}>
                  <Text style={styles.mapText}>Map View</Text>
                  <Text style={styles.mapSubtext}>Interactive map would be displayed here</Text>
                </View>
              </>
            ) : (
              <View style={styles.noLocationCard}>
                <MapPin color="#9CA3AF" size={48} />
                <Text style={styles.noLocationTitle}>No Location Data</Text>
                <Text style={styles.noLocationText}>
                  Location information is not available for this tree.
                </Text>
              </View>
            )}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: tree.imageUrl }} style={styles.headerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          
          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton}>
            <Share color="#fff" size={20} />
          </TouchableOpacity>
          
          {/* Tree Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.treeName}>{tree.commonName}</Text>
            <Text style={styles.treeScientific}>{tree.scientificName}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* AI Identify Button */}
        <TouchableOpacity style={styles.aiButton} onPress={handleAIIdentify}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.aiButtonGradient}>
            <Camera color="#fff" size={20} />
            <Text style={styles.aiButtonText}>Identify Similar Tree</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function getHealthColor(health: string) {
  switch (health) {
    case 'excellent': return '#10B981';
    case 'good': return '#3B82F6';
    case 'fair': return '#F59E0B';
    case 'poor': return '#EF4444';
    default: return '#6B7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  shareButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  treeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  treeScientific: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#E5E7EB',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: '600',
  },
  tabContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  healthCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: 12,
  },
  healthBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  healthText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  healthDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  healthTips: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  locationAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: 14,
    color: '#6B7280',
  },
  mapPlaceholder: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  noLocationCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noLocationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noLocationText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  aiButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  aiButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});