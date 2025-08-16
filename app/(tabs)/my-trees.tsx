import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';
import { TreePine, Calendar, MapPin, Trash2, Grid, List } from 'lucide-react-native';

export default function MyTreesScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { savedTrees, removeTree } = useAppStore();

  const handleDeleteTree = (treeId: string, treeName: string) => {
    Alert.alert(
      'Delete Tree',
      `Are you sure you want to remove "${treeName}" from your collection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeTree(treeId),
        },
      ]
    );
  };

  const renderGridItem = ({ item }: { item: typeof savedTrees[0] }) => (
    <TouchableOpacity
      style={styles.gridCard}
      onPress={() => router.push(`/tree-details?id=${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
      <View style={styles.gridInfo}>
        <Text style={styles.gridName} numberOfLines={1}>{item.commonName}</Text>
        <Text style={styles.gridScientific} numberOfLines={1}>{item.scientificName}</Text>
        <View style={styles.gridMetadata}>
          <View style={styles.gridDate}>
            <Calendar color="#6B7280" size={12} />
            <Text style={styles.gridDateText}>{item.dateAdded}</Text>
          </View>
          {item.confidence && (
            <Text style={styles.confidenceText}>{item.confidence}%</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTree(item.id, item.commonName)}
      >
        <Trash2 color="#EF4444" size={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }: { item: typeof savedTrees[0] }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => router.push(`/tree-details?id=${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.listImage} />
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{item.commonName}</Text>
        <Text style={styles.listScientific}>{item.scientificName}</Text>
        <Text style={styles.listDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.listMetadata}>
          <View style={styles.metadataItem}>
            <Calendar color="#6B7280" size={14} />
            <Text style={styles.metadataText}>{item.dateAdded}</Text>
          </View>
          {item.location && (
            <View style={styles.metadataItem}>
              <MapPin color="#6B7280" size={14} />
              <Text style={styles.metadataText}>{item.location.address}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.listDeleteButton}
        onPress={() => handleDeleteTree(item.id, item.commonName)}
      >
        <Trash2 color="#EF4444" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <TreePine color="#9CA3AF" size={64} />
      <Text style={styles.emptyTitle}>No Trees Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start identifying trees with AI or browse the tree catalog to build your collection
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push('/(tabs)/ai-identify')}
      >
        <LinearGradient colors={['#10B981', '#059669']} style={styles.emptyButtonGradient}>
          <Text style={styles.emptyButtonText}>Identify Your First Tree</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>My Trees</Text>
            <Text style={styles.headerSubtitle}>
              {savedTrees.length} tree{savedTrees.length !== 1 ? 's' : ''} in your collection
            </Text>
          </View>
          
          {savedTrees.length > 0 && (
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[styles.toggleButton, viewMode === 'grid' && styles.activeToggle]}
                onPress={() => setViewMode('grid')}
              >
                <Grid color={viewMode === 'grid' ? '#10B981' : '#9CA3AF'} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, viewMode === 'list' && styles.activeToggle]}
                onPress={() => setViewMode('list')}
              >
                <List color={viewMode === 'list' ? '#10B981' : '#9CA3AF'} size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>

      {savedTrees.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={savedTrees}
          renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode} // Force re-render when view mode changes
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  // Grid styles
  gridCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  gridInfo: {
    padding: 12,
  },
  gridName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  gridScientific: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  gridMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridDateText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 4,
  },
  confidenceText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 6,
  },
  // List styles
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  listImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    resizeMode: 'cover',
  },
  listInfo: {
    flex: 1,
    padding: 12,
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  listScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 8,
  },
  listMetadata: {
    flexDirection: 'row',
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  listDeleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 6,
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});