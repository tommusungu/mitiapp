import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAppStore(state => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
<StatusBar barStyle="light-content" backgroundColor={Colors.primary[600]} />
      
      {/* Background */}
      <LinearGradient
        colors={[Colors.primary[600], Colors.primary[800], Colors.primary[900]]}
        style={styles.background}
      />
      
      {/* Floating shapes for visual interest */}
      <View style={[styles.floatingShape, styles.shape1]} />
      <View style={[styles.floatingShape, styles.shape2]} />
      <View style={[styles.floatingShape, styles.shape3]} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🌳</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your tree discovery journey</Text>
          </View>
        </View>
        
        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Mail color={Colors.neutral[400]} size={20} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.neutral[400]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Lock color={Colors.neutral[400]} size={20} />
                </View>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.neutral[400]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color={Colors.neutral[400]} size={20} />
                  ) : (
                    <Eye color={Colors.neutral[400]} size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.primary[500], Colors.primary[600]]}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Demo Text */}
            {/* <View style={styles.demoContainer}>
              <Text style={styles.demoText}>
                Demo: Use any email and password to login
              </Text>
            </View> */}
            
            {/* Register Link */}
            <View style={styles.registerLinkContainer}>
              <Text style={styles.registerLinkText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register' as any)}>
                <Text style={styles.registerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[600],
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  floatingShape: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  shape1: {
    width: 120,
    height: 120,
    top: 100,
    right: -30,
  },
  shape2: {
    width: 80,
    height: 80,
    top: 200,
    left: -20,
  },
  shape3: {
    width: 60,
    height: 60,
    bottom: 150,
    right: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: Colors.background.primary,
    borderRadius: 24,
    padding: 32,
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    paddingVertical: 16,
  },
  passwordInput: {
    paddingRight: 12,
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary[600],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
  },
  demoContainer: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent[500],
  },
  demoText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerLinkText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  registerLink: {
    fontSize: 16,
    color: Colors.primary[600],
    fontWeight: '600',
  },
});