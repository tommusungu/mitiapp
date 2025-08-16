import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Home, Camera, TreePine, User, Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[600],
        tabBarInactiveTintColor: Colors.neutral[400],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background.primary,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          height: Platform.OS === 'ios' ? 88 : 72,
          shadowColor: Colors.shadow.dark,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ai-identify"
        options={{
          title: 'AI Identify',
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="my-trees"
        options={{
          title: 'My Trees',
          tabBarIcon: ({ color, size }) => <TreePine color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}