/**
 * Demo product data for frontend-web
 * This will be replaced with real API data when backend is ready
 */

export interface DemoProductCategory {
  categoryId: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  image: string;
}

export interface DemoProduct {
  productId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  currency: 'VND';
  categoryId: string;
  images: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens: string[];
  dietaryFlags: ('vegetarian' | 'vegan' | 'halal' | 'spicy')[];
  preparationTime: number; // minutes
  available: boolean;
  stockLevel: number;
  rating: number;
  reviewCount: number;
  stationCodes: string[]; // Available at these stations
}

export const demoCategories: DemoProductCategory[] = [
  {
    categoryId: "cat-1",
    name: "Cơm & Cháo",
    nameEn: "Rice & Porridge",
    description: "Các món cơm và cháo truyền thống Việt Nam",
    icon: "🍚",
    image: "/api/placeholder/category-rice.jpg",
  },
  {
    categoryId: "cat-2",
    name: "Phở & Bún",
    nameEn: "Pho & Noodle Soup",
    description: "Phở và các món bún đặc trưng từng vùng miền",
    icon: "🍜",
    image: "/api/placeholder/category-pho.jpg",
  },
  {
    categoryId: "cat-3",
    name: "Bánh mì & Bánh",
    nameEn: "Banh Mi & Pastries",
    description: "Bánh mì và các loại bánh địa phương",
    icon: "🥖",
    image: "/api/placeholder/category-banh.jpg",
  },
  {
    categoryId: "cat-4",
    name: "Đồ uống",
    nameEn: "Beverages",
    description: "Cà phê, trà và nước uống đặc sản",
    icon: "☕",
    image: "/api/placeholder/category-drinks.jpg",
  },
  {
    categoryId: "cat-5",
    name: "Tráng miệng",
    nameEn: "Desserts",
    description: "Chè và các món tráng miệng truyền thống",
    icon: "🍮",
    image: "/api/placeholder/category-desserts.jpg",
  },
  {
    categoryId: "cat-6",
    name: "Đồ ăn nhẹ",
    nameEn: "Snacks",
    description: "Các món ăn nhẹ và finger food",
    icon: "🥨",
    image: "/api/placeholder/category-snacks.jpg",
  },
];

export const demoProducts: DemoProduct[] = [
  // Cơm & Cháo
  {
    productId: "prod-1",
    name: "Cơm tấm sườn nướng",
    nameEn: "Grilled Pork Chop Rice",
    description: "Cơm tấm truyền thống với sườn nướng thơm ngon, chả trứng và bì",
    descriptionEn: "Traditional broken rice with grilled pork chop, egg roll and pork skin",
    price: 75000,
    currency: "VND",
    categoryId: "cat-1",
    images: ["/api/placeholder/com-tam-1.jpg", "/api/placeholder/com-tam-2.jpg"],
    nutrition: {
      calories: 650,
      protein: 35,
      carbs: 75,
      fat: 20,
    },
    allergens: ["Gluten", "Soy"],
    dietaryFlags: [],
    preparationTime: 15,
    available: true,
    stockLevel: 25,
    rating: 4.5,
    reviewCount: 128,
    stationCodes: ["SGN", "DNA", "NT"],
  },
  {
    productId: "prod-2",
    name: "Cháo gà",
    nameEn: "Chicken Porridge",
    description: "Cháo gà nấu từ gà ta, mềm mịn và bổ dưỡng",
    descriptionEn: "Soft chicken porridge made from free-range chicken",
    price: 45000,
    currency: "VND",
    categoryId: "cat-1",
    images: ["/api/placeholder/chao-ga-1.jpg"],
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 45,
      fat: 8,
    },
    allergens: [],
    dietaryFlags: [],
    preparationTime: 10,
    available: true,
    stockLevel: 30,
    rating: 4.2,
    reviewCount: 89,
    stationCodes: ["HAN", "HUE", "DNA"],
  },

  // Phở & Bún
  {
    productId: "prod-3",
    name: "Phở bò tái",
    nameEn: "Rare Beef Pho",
    description: "Phở bò Hà Nội với thịt bò tái, nước dùng trong vắt thơm ngon",
    descriptionEn: "Hanoi beef pho with rare beef slices and clear fragrant broth",
    price: 65000,
    currency: "VND",
    categoryId: "cat-2",
    images: ["/api/placeholder/pho-bo-1.jpg", "/api/placeholder/pho-bo-2.jpg"],
    nutrition: {
      calories: 450,
      protein: 30,
      carbs: 55,
      fat: 12,
    },
    allergens: ["Gluten"],
    dietaryFlags: [],
    preparationTime: 12,
    available: true,
    stockLevel: 40,
    rating: 4.7,
    reviewCount: 256,
    stationCodes: ["HAN", "HUE"],
  },
  {
    productId: "prod-4",
    name: "Bún bò Huế",
    nameEn: "Hue Spicy Beef Noodle Soup",
    description: "Bún bò cay đặc trưng Huế với thịt bò và chả cua",
    descriptionEn: "Spicy Hue-style beef noodle soup with beef and crab cake",
    price: 55000,
    currency: "VND",
    categoryId: "cat-2",
    images: ["/api/placeholder/bun-bo-hue-1.jpg"],
    allergens: ["Shellfish"],
    dietaryFlags: ["spicy"],
    preparationTime: 15,
    available: true,
    stockLevel: 20,
    rating: 4.6,
    reviewCount: 167,
    stationCodes: ["HUE", "DNA"],
  },

  // Bánh mì & Bánh
  {
    productId: "prod-5",
    name: "Bánh mì thịt nướng",
    nameEn: "Grilled Pork Banh Mi",
    description: "Bánh mì giòn rụm với thịt nướng, pate và rau thơm",
    descriptionEn: "Crispy baguette with grilled pork, pate and fresh herbs",
    price: 25000,
    currency: "VND",
    categoryId: "cat-3",
    images: ["/api/placeholder/banh-mi-1.jpg"],
    allergens: ["Gluten"],
    dietaryFlags: [],
    preparationTime: 8,
    available: true,
    stockLevel: 50,
    rating: 4.3,
    reviewCount: 203,
    stationCodes: ["SGN", "DNA", "NT", "QN"],
  },
  {
    productId: "prod-6",
    name: "Bánh mì chay",
    nameEn: "Vegetarian Banh Mi",
    description: "Bánh mì chay với đậu hũ, rau củ và tương ớt",
    descriptionEn: "Vegetarian banh mi with tofu, vegetables and chili sauce",
    price: 20000,
    currency: "VND",
    categoryId: "cat-3",
    images: ["/api/placeholder/banh-mi-chay-1.jpg"],
    allergens: ["Gluten", "Soy"],
    dietaryFlags: ["vegetarian"],
    preparationTime: 6,
    available: true,
    stockLevel: 35,
    rating: 4.1,
    reviewCount: 94,
    stationCodes: ["SGN", "HAN", "DNA"],
  },

  // Đồ uống
  {
    productId: "prod-7",
    name: "Cà phê phin đen",
    nameEn: "Vietnamese Drip Coffee",
    description: "Cà phê phin truyền thống, đậm đà hương vị Việt Nam",
    descriptionEn: "Traditional Vietnamese drip coffee, strong and aromatic",
    price: 18000,
    currency: "VND",
    categoryId: "cat-4",
    images: ["/api/placeholder/ca-phe-den-1.jpg"],
    allergens: [],
    dietaryFlags: ["vegan"],
    preparationTime: 5,
    available: true,
    stockLevel: 100,
    rating: 4.4,
    reviewCount: 312,
    stationCodes: ["SGN", "HAN", "DNA", "NT", "HUE", "QN"],
  },
  {
    productId: "prod-8",
    name: "Trà đá chanh",
    nameEn: "Iced Lemon Tea",
    description: "Trà đá mát lạnh với chanh tươi, giải khát tuyệt vời",
    descriptionEn: "Refreshing iced tea with fresh lemon",
    price: 12000,
    currency: "VND",
    categoryId: "cat-4",
    images: ["/api/placeholder/tra-chanh-1.jpg"],
    allergens: [],
    dietaryFlags: ["vegan"],
    preparationTime: 3,
    available: true,
    stockLevel: 80,
    rating: 4.0,
    reviewCount: 156,
    stationCodes: ["SGN", "DNA", "NT", "QN"],
  },

  // Tráng miệng
  {
    productId: "prod-9",
    name: "Chè ba màu",
    nameEn: "Three-Color Sweet Soup",
    description: "Chè ba màu truyền thống với đậu xanh, đậu đỏ và nước cốt dừa",
    descriptionEn: "Traditional three-color sweet soup with mung bean, red bean and coconut milk",
    price: 22000,
    currency: "VND",
    categoryId: "cat-5",
    images: ["/api/placeholder/che-ba-mau-1.jpg"],
    allergens: [],
    dietaryFlags: ["vegetarian"],
    preparationTime: 5,
    available: true,
    stockLevel: 45,
    rating: 4.2,
    reviewCount: 98,
    stationCodes: ["SGN", "DNA", "NT"],
  },
  {
    productId: "prod-10",
    name: "Bánh flan",
    nameEn: "Vietnamese Creme Caramel",
    description: "Bánh flan mềm mịn với caramel đắng nhẹ",
    descriptionEn: "Smooth Vietnamese creme caramel with light bitter caramel",
    price: 15000,
    currency: "VND",
    categoryId: "cat-5",
    images: ["/api/placeholder/banh-flan-1.jpg"],
    allergens: ["Eggs", "Dairy"],
    dietaryFlags: ["vegetarian"],
    preparationTime: 3,
    available: true,
    stockLevel: 60,
    rating: 4.3,
    reviewCount: 134,
    stationCodes: ["SGN", "HAN", "DNA", "HUE"],
  },
];

// Helper functions
export const getProductsByCategory = (categoryId: string): DemoProduct[] => {
  return demoProducts.filter(product => product.categoryId === categoryId);
};

export const getProductsByStation = (stationCode: string): DemoProduct[] => {
  return demoProducts.filter(product =>
    product.stationCodes.includes(stationCode)
  );
};

export const getAvailableProducts = (): DemoProduct[] => {
  return demoProducts.filter(product => product.available && product.stockLevel > 0);
};

export const searchProducts = (query: string): DemoProduct[] => {
  const searchTerm = query.toLowerCase();
  return demoProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.nameEn.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByDietaryFlag = (flag: string): DemoProduct[] => {
  return demoProducts.filter(product =>
    product.dietaryFlags.includes(flag as any)
  );
};

export const getPopularProducts = (limit: number = 6): DemoProduct[] => {
  return [...demoProducts]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit);
};