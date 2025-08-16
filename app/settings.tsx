import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Globe,
  Shield,
  Download,
  Trash2,
  ChevronRight
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          title: 'Push Notifications',
          subtitle: 'Receive updates about your trees',
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
      ],
    },
    {
      title: 'Privacy & Location',
      items: [
        {
          icon: Globe,
          title: 'Location Services',
          subtitle: 'Allow location access for better results',
          type: 'switch',
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          icon: Shield,
          title: 'Privacy Policy',
          subtitle: 'View our privacy policy',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: Download,
          title: 'Auto Download Images',
          subtitle: 'Automatically save tree images offline',
          type: 'switch',
          value: autoDownload,
          onToggle: setAutoDownload,
        },
        {
          icon: Trash2,
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    if (item.type === 'switch') {
      return (
        <View key={index} style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <item.icon color="#6366F1" size={24} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor={item.value ? '#fff' : '#fff'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
        <View style={styles.settingIcon}>
          <item.icon color="#6366F1" size={24} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        <ChevronRight color="#9CA3AF" size={20} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MitiApp Version 1.0.0</Text>
          <Text style={styles.versionSubtext}>Built with ❤️ for tree lovers</Text>
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
  settingGroup: {
    marginTop: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  groupContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});