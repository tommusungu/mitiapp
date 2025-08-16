import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';
import { ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Identify Trees with AI',
    subtitle: 'Take a photo and let our AI identify tree species instantly',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Save Your Discoveries',
    subtitle: 'Build your personal collection of trees and track their growth',
    image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Learn About Species',
    subtitle: 'Discover detailed information about tree species and their benefits',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Contribute to Conservation',
    subtitle: 'Help document and protect trees in your community',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeOnboarding = useAppStore(state => state.completeOnboarding);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    completeOnboarding();
    router.replace('/login');
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <Image source={{ uri: currentSlide.image }} style={styles.backgroundImage} />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
        </View>
        
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot
              ]}
            />
          ))}
        </View>
        
        {/* Next/Get Started Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.nextButtonGradient}
          >
            {currentIndex === onboardingData.length - 1 ? (
              <Text style={styles.nextButtonText}>Get Started</Text>
            ) : (
              <>
                <Text style={styles.nextButtonText}>Next</Text>
                <ChevronRight color="#fff" size={20} />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#10B981',
    width: 24,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});