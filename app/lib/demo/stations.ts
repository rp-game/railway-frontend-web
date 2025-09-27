/**
 * Demo station data for frontend-web
 * This will be replaced with real API data when backend is ready
 */

export interface DemoStation {
  stationId: string;
  stationCode: string;
  name: string;
  nameEn: string;
  city: string;
  province: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hasKitchen: boolean;
  operatingHours: {
    open: string;
    close: string;
  };
  image: string;
  description: string;
  specialties: string[];
}

export const demoStations: DemoStation[] = [
  {
    stationId: "station-1",
    stationCode: "SGN",
    name: "Ga Sài Gòn",
    nameEn: "Saigon Station",
    city: "Hồ Chí Minh",
    province: "TP. Hồ Chí Minh",
    coordinates: {
      latitude: 10.7769,
      longitude: 106.6951,
    },
    hasKitchen: true,
    operatingHours: {
      open: "05:00",
      close: "23:00",
    },
    image: "/api/placeholder/station-sgn.jpg",
    description: "Ga đầu tàu chính của tuyến Bắc Nam tại TP.HCM",
    specialties: ["Bánh mì Sài Gòn", "Cơm tấm", "Chè ba màu", "Cà phê phin"],
  },
  {
    stationId: "station-2",
    stationCode: "HAN",
    name: "Ga Hà Nội",
    nameEn: "Hanoi Station",
    city: "Hà Nội",
    province: "Hà Nội",
    coordinates: {
      latitude: 21.0245,
      longitude: 105.8412,
    },
    hasKitchen: true,
    operatingHours: {
      open: "05:00",
      close: "23:00",
    },
    image: "/api/placeholder/station-han.jpg",
    description: "Ga trung tâm Hà Nội, điểm đến của tuyến Bắc Nam",
    specialties: ["Phở bò Hà Nội", "Bún chả", "Bánh cuốn", "Trà sen"],
  },
  {
    stationId: "station-3",
    stationCode: "DNA",
    name: "Ga Đà Nẵng",
    nameEn: "Da Nang Station",
    city: "Đà Nẵng",
    province: "Đà Nẵng",
    coordinates: {
      latitude: 16.0678,
      longitude: 108.2208,
    },
    hasKitchen: true,
    operatingHours: {
      open: "05:30",
      close: "22:30",
    },
    image: "/api/placeholder/station-dna.jpg",
    description: "Ga trung tâm miền Trung, nổi tiếng với hải sản tươi ngon",
    specialties: ["Mì Quảng", "Bánh xèo", "Nem lụi", "Chè bưởi"],
  },
  {
    stationId: "station-4",
    stationCode: "NT",
    name: "Ga Nha Trang",
    nameEn: "Nha Trang Station",
    city: "Nha Trang",
    province: "Khánh Hòa",
    coordinates: {
      latitude: 12.2388,
      longitude: 109.1967,
    },
    hasKitchen: true,
    operatingHours: {
      open: "06:00",
      close: "22:00",
    },
    image: "/api/placeholder/station-nt.jpg",
    description: "Ga ven biển với các món hải sản đặc trưng",
    specialties: ["Bún cá", "Nem nướng", "Bánh căn", "Nước mía"],
  },
  {
    stationId: "station-5",
    stationCode: "HUE",
    name: "Ga Huế",
    nameEn: "Hue Station",
    city: "Huế",
    province: "Thừa Thiên Huế",
    coordinates: {
      latitude: 16.4637,
      longitude: 107.5909,
    },
    hasKitchen: true,
    operatingHours: {
      open: "05:30",
      close: "22:30",
    },
    image: "/api/placeholder/station-hue.jpg",
    description: "Ga cố đô với ẩm thực hoàng gia truyền thống",
    specialties: ["Bún bò Huế", "Bánh khoái", "Chè Huế", "Tôm chua"],
  },
  {
    stationId: "station-6",
    stationCode: "QN",
    name: "Ga Quy Nhon",
    nameEn: "Quy Nhon Station",
    city: "Quy Nhon",
    province: "Bình Định",
    coordinates: {
      latitude: 13.7563,
      longitude: 109.2297,
    },
    hasKitchen: false,
    operatingHours: {
      open: "06:00",
      close: "21:30",
    },
    image: "/api/placeholder/station-qn.jpg",
    description: "Ga ven biển với các món ăn dân dã",
    specialties: ["Bánh ít lá gai", "Nem chợ Huyện", "Bánh căn", "Chè đậu đỏ"],
  },
];

export const getStationByCode = (code: string): DemoStation | undefined => {
  return demoStations.find(station => station.stationCode === code);
};

export const getStationsWithKitchen = (): DemoStation[] => {
  return demoStations.filter(station => station.hasKitchen);
};

export const searchStations = (query: string): DemoStation[] => {
  const searchTerm = query.toLowerCase();
  return demoStations.filter(
    station =>
      station.name.toLowerCase().includes(searchTerm) ||
      station.nameEn.toLowerCase().includes(searchTerm) ||
      station.city.toLowerCase().includes(searchTerm) ||
      station.stationCode.toLowerCase().includes(searchTerm)
  );
};