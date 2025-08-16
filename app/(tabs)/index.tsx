import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';
import { mockTrees, treeCategories } from '@/data/mockTrees';
import { Search, MapPin, Leaf, Heart, Star, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/colors';



export default function HomeScreen() {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory, user } = useAppStore();

  const filteredTrees = useMemo(() => {
    return mockTrees.filter(tree => {
      const matchesSearch = tree.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tree.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tree.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const renderTreeCard = ({ item }: { item: typeof mockTrees[0] }) => (
    <TouchableOpacity
      style={styles.treeCard}
      onPress={() => router.push({ pathname: '/tree-details', params: { id: item.id } })}
    >
      <View style={styles.treeImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.treeImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={styles.imageOverlay}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart color={Colors.text.inverse} size={18} fill="rgba(255,255,255,0.3)" />
        </TouchableOpacity>
        <View style={[styles.healthBadge, { backgroundColor: getHealthColor(item.healthStatus) }]}>
          <Text style={styles.healthText}>{item.healthStatus}</Text>
        </View>
      </View>
      <View style={styles.treeInfo}>
        <View style={styles.treeHeader}>
          <View style={styles.treeNameContainer}>
            <Text style={styles.treeName}>{item.commonName}</Text>
            <View style={styles.ratingContainer}>
              <Star color={Colors.secondary[500]} size={14} fill={Colors.secondary[500]} />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
        </View>
        <Text style={styles.treeScientific}>{item.scientificName}</Text>
        <Text style={styles.treeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.treeMetadata}>
          <View style={styles.metadataItem}>
            <MapPin color={Colors.primary[500]} size={14} />
            <Text style={styles.metadataText}>{item.location?.address}</Text>
          </View>
          <View style={styles.metadataItem}>
            <TrendingUp color={Colors.accent[500]} size={14} />
            <Text style={styles.metadataText}>Popular</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item && styles.activeCategoryChip
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.activeCategoryText
      ]}>
        {item === 'all' ? 'All Trees' : item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient 
        colors={[Colors.primary[600], Colors.primary[700], Colors.primary[800]]} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello, {user?.name || 'Explorer'}! 👋</Text>
            <Text style={styles.headerSubtitle}>Discover trees around you</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.locationContainer}>
              <MapPin color={Colors.text.inverse} size={16} />
              <Text style={styles.locationText}>Nairobi, Kenya</Text>
            </View>
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>🌤️ 24°C</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#9CA3AF" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search trees..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={treeCategories}
            renderItem={renderCategoryChip}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient 
              colors={[Colors.primary[500], Colors.primary[600]]} 
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIconContainer}>
                <Leaf color={Colors.text.inverse} size={24} />
              </View>
              <Text style={styles.statNumber}>{mockTrees.length}</Text>
              <Text style={styles.statLabel}>Species Available</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient 
              colors={[Colors.accent[500], Colors.accent[600]]} 
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIconContainer}>
                <Text style={styles.statEmoji}>🌍</Text>
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Regions Covered</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient 
              colors={[Colors.secondary[500], Colors.secondary[600]]} 
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIconContainer}>
                <Star color={Colors.text.inverse} size={24} />
              </View>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Average Rating</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Trees List */}
        <View style={styles.treesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Trees' : `${selectedCategory} Trees`} 
            ({filteredTrees.length})
          </Text>
          
          {filteredTrees.map((tree) => (
            <View key={tree.id}>
              {renderTreeCard({ item: tree })}
            </View>
          ))}
        </View>
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
    backgroundColor: Colors.background.secondary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  locationText: {
    color: Colors.text.inverse,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  weatherContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  weatherText: {
    color: Colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text.primary,
  },
  categoriesContainer: {
    paddingTop: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
    shadowColor: Colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCategoryChip: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  activeCategoryText: {
    color: Colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statEmoji: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  treesSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  treeCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  treeImageContainer: {
    position: 'relative',
  },
  treeImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  healthText: {
    fontSize: 12,
    color: Colors.text.inverse,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  treeInfo: {
    padding: 20,
  },
  treeHeader: {
    marginBottom: 8,
  },
  treeNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  treeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary[700],
    marginLeft: 4,
  },
  treeScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  treeDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  treeMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  metadataText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 6,
    fontWeight: '500',
  },
});