import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAppStore } from '@/stores/useAppStore';
import { Camera, Image as ImageIcon, Sparkles, Save, RotateCcw } from 'lucide-react-native';

export default function AIIdentifyScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { lastAIResult, setAIResult, addTree } = useAppStore();

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to use this feature.');
        return false;
      }
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with dummy data
    setTimeout(() => {
      const dummyResults = [
        {
          species: 'African Mahogany (Khaya senegalensis)',
          confidence: 94,
          age: 'Mature (15-20 years)',
          health: 'Excellent',
          imageUrl: imageUri,
        },
        {
          species: 'Baobab Tree (Adansonia digitata)',
          confidence: 87,
          age: 'Ancient (200+ years)',
          health: 'Good',
          imageUrl: imageUri,
        },
        {
          species: 'Acacia Tree (Acacia tortilis)',
          confidence: 91,
          age: 'Mature (10-15 years)',
          health: 'Good',
          imageUrl: imageUri,
        },
      ];
      
      const randomResult = dummyResults[Math.floor(Math.random() * dummyResults.length)];
      setAIResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const saveToMyTrees = () => {
    if (!lastAIResult) return;

    const newTree = {
      id: Date.now().toString(),
      commonName: lastAIResult.species.split('(')[0].trim(),
      scientificName: lastAIResult.species.match(/\((.*?)\)/)?.[1] || '',
      description: `AI-identified tree with ${lastAIResult.confidence}% confidence. Estimated age: ${lastAIResult.age}`,
      category: 'AI Identified',
      ageStage: 'mature' as const,
      healthStatus: lastAIResult.health.toLowerCase() as 'excellent' | 'good' | 'fair' | 'poor',
      imageUrl: lastAIResult.imageUrl,
      dateAdded: new Date().toISOString().split('T')[0],
      confidence: lastAIResult.confidence,
    };

    addTree(newTree);
    Alert.alert('Success', 'Tree saved to your collection!');
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAIResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.header}>
        <Text style={styles.headerTitle}>AI Tree Identification</Text>
        <Text style={styles.headerSubtitle}>Take or upload a photo to identify trees</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedImage ? (
          // Upload Section
          <View style={styles.uploadSection}>
            <View style={styles.uploadContainer}>
              <Sparkles color="#3B82F6" size={48} />
              <Text style={styles.uploadTitle}>Identify Any Tree</Text>
              <Text style={styles.uploadSubtitle}>
                Our AI can identify tree species, estimate age, and assess health
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                  <LinearGradient colors={['#10B981', '#059669']} style={styles.buttonGradient}>
                    <Camera color="#fff" size={24} />
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                  <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.buttonGradient}>
                    <ImageIcon color="#fff" size={24} />
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          // Analysis Section
          <View style={styles.analysisSection}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
                <RotateCcw color="#fff" size={20} />
              </TouchableOpacity>
            </View>
            
            {isAnalyzing ? (
              <View style={styles.loadingContainer}>
                <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.loadingCard}>
                  <Sparkles color="#fff" size={32} />
                  <Text style={styles.loadingTitle}>Analyzing Image...</Text>
                  <Text style={styles.loadingSubtitle}>
                    Our AI is identifying the tree species, age, and health
                  </Text>
                </LinearGradient>
              </View>
            ) : lastAIResult ? (
              <View style={styles.resultsContainer}>
                <View style={styles.resultCard}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultTitle}>Identification Results</Text>
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.confidenceText}>{lastAIResult.confidence}% confident</Text>
                    </View>
                  </View>
                  
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Species</Text>
                    <Text style={styles.resultValue}>{lastAIResult.species}</Text>
                  </View>
                  
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Estimated Age</Text>
                    <Text style={styles.resultValue}>{lastAIResult.age}</Text>
                  </View>
                  
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>Health Status</Text>
                    <View style={[styles.healthBadge, { backgroundColor: getHealthColor(lastAIResult.health) }]}>
                      <Text style={styles.healthText}>{lastAIResult.health}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.saveButton} onPress={saveToMyTrees}>
                    <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
                      <Save color="#fff" size={20} />
                      <Text style={styles.saveButtonText}>Save to My Trees</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getHealthColor(health: string) {
  switch (health.toLowerCase()) {
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  content: {
    flex: 1,
  },
  uploadSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  uploadContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  analysisSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  resetButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    marginBottom: 20,
  },
  loadingCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 22,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  confidenceBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  resultItem: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  healthBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  healthText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});