import { Tree } from '@/stores/useAppStore';

export const mockTrees: Tree[] = [
  {
    id: '1',
    commonName: 'African Mahogany',
    scientificName: 'Khaya senegalensis',
    description: 'A large deciduous tree native to Africa, prized for its beautiful timber and fast growth rate.',
    category: 'Hardwood',
    ageStage: 'mature',
    healthStatus: 'excellent',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    location: {
      latitude: -1.2921,
      longitude: 36.8219,
      address: 'Nairobi, Kenya'
    },
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    commonName: 'Baobab Tree',
    scientificName: 'Adansonia digitata',
    description: 'Iconic African tree known for its massive trunk and longevity, often called the "Tree of Life".',
    category: 'Indigenous',
    ageStage: 'old',
    healthStatus: 'good',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    location: {
      latitude: -3.3731,
      longitude: 36.2821,
      address: 'Kilimanjaro, Tanzania'
    },
    dateAdded: '2024-01-20'
  },
  {
    id: '3',
    commonName: 'Acacia Tree',
    scientificName: 'Acacia tortilis',
    description: 'Drought-resistant tree common in African savannas, important for wildlife and local communities.',
    category: 'Indigenous',
    ageStage: 'mature',
    healthStatus: 'good',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
    location: {
      latitude: -2.1540,
      longitude: 34.6857,
      address: 'Maasai Mara, Kenya'
    },
    dateAdded: '2024-02-01'
  },
  {
    id: '4',
    commonName: 'Eucalyptus',
    scientificName: 'Eucalyptus grandis',
    description: 'Fast-growing tree introduced to Africa, commonly used for timber and paper production.',
    category: 'Exotic',
    ageStage: 'young',
    healthStatus: 'excellent',
    imageUrl: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=400&h=300&fit=crop',
    location: {
      latitude: -0.0236,
      longitude: 37.9062,
      address: 'Mount Kenya, Kenya'
    },
    dateAdded: '2024-02-10'
  },
  {
    id: '5',
    commonName: 'Moringa Tree',
    scientificName: 'Moringa oleifera',
    description: 'Nutrient-rich tree known as the "Miracle Tree", valued for its medicinal and nutritional properties.',
    category: 'Medicinal',
    ageStage: 'young',
    healthStatus: 'excellent',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    location: {
      latitude: 0.0236,
      longitude: 37.9062,
      address: 'Meru, Kenya'
    },
    dateAdded: '2024-02-15'
  },
  {
    id: '6',
    commonName: 'Jacaranda',
    scientificName: 'Jacaranda mimosifolia',
    description: 'Beautiful ornamental tree with purple flowers, popular in urban landscaping across Africa.',
    category: 'Ornamental',
    ageStage: 'mature',
    healthStatus: 'good',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
    location: {
      latitude: -1.2921,
      longitude: 36.8219,
      address: 'Nairobi, Kenya'
    },
    dateAdded: '2024-02-20'
  }
];

export const treeCategories = [
  'all',
  'Indigenous',
  'Exotic',
  'Hardwood',
  'Medicinal',
  'Ornamental',
  'Fruit'
];