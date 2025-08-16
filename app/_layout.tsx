import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppStore } from "@/stores/useAppStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tree-details" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const { isAuthenticated, hasCompletedOnboarding } = useAppStore();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Redirect logic based on app state
  useEffect(() => {
    import('expo-router').then(({ router }) => {
      if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!isAuthenticated) {
        router.replace('/login');
      } else {
        router.replace('/(tabs)');
      }
    });
  }, [isAuthenticated, hasCompletedOnboarding]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}