import { create } from 'zustand';

export interface Tree {
  id: string;
  commonName: string;
  scientificName: string;
  description: string;
  category: string;
  ageStage: 'seedling' | 'young' | 'mature' | 'old';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  imageUrl: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dateAdded: string;
  confidence?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  
  // Trees
  savedTrees: Tree[];
  searchQuery: string;
  selectedCategory: string;
  
  // AI Results
  lastAIResult: {
    species: string;
    confidence: number;
    age: string;
    health: string;
    imageUrl: string;
  } | null;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  
  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addTree: (tree: Tree) => void;
  removeTree: (treeId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setAIResult: (result: AppState['lastAIResult']) => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  savedTrees: [],
  searchQuery: '',
  selectedCategory: 'all',
  lastAIResult: null,
  hasCompletedOnboarding: false,
  
  // Actions
  login: (email: string, password: string) => {
    // Dummy login - accept any email/password
    if (email && password) {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      set({ isAuthenticated: true, user });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  
  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...userData } });
    }
  },
  
  addTree: (tree: Tree) => {
    set(state => ({
      savedTrees: [...state.savedTrees, tree]
    }));
  },
  
  removeTree: (treeId: string) => {
    set(state => ({
      savedTrees: state.savedTrees.filter(tree => tree.id !== treeId)
    }));
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },
  
  setAIResult: (result: AppState['lastAIResult']) => {
    set({ lastAIResult: result });
  },
  
  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
  }
}));