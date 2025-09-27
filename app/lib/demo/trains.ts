/**
 * Demo train data for frontend-web
 * This will be replaced with real API data when backend is ready
 */

export interface DemoTrainStop {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  stopDuration: number; // minutes
  platform?: string;
}

export interface DemoTrain {
  trainId: string;
  trainCode: string;
  routeName: string;
  trainType: 'SE' | 'TN' | 'SNT';
  departureStation: {
    code: string;
    name: string;
  };
  arrivalStation: {
    code: string;
    name: string;
  };
  departureTime: string; // ISO datetime
  arrivalTime: string;   // ISO datetime
  duration: string; // HH:mm format
  distance: number; // km
  stops: DemoTrainStop[];
  available: boolean;
  services: string[];
  ticketPrices: {
    hardSeat: number;
    softSeat: number;
    hardBerth: number;
    softBerth: number;
  };
  foodService: {
    available: boolean;
    menuAvailable: boolean;
    orderingStops: string[]; // Station codes where ordering is available
  };
}

export const demoTrains: DemoTrain[] = [
  {
    trainId: "train-1",
    trainCode: "SE1",
    routeName: "Sài Gòn - Hà Nội",
    trainType: "SE",
    departureStation: {
      code: "SGN",
      name: "Ga Sài Gòn",
    },
    arrivalStation: {
      code: "HAN",
      name: "Ga Hà Nội",
    },
    departureTime: "2025-09-28T19:00:00+07:00",
    arrivalTime: "2025-09-30T05:30:00+07:00",
    duration: "34:30",
    distance: 1726,
    stops: [
      {
        stationCode: "SGN",
        stationName: "Ga Sài Gòn",
        arrivalTime: "",
        departureTime: "19:00",
        stopDuration: 0,
        platform: "1",
      },
      {
        stationCode: "NT",
        stationName: "Ga Nha Trang",
        arrivalTime: "06:25",
        departureTime: "06:35",
        stopDuration: 10,
        platform: "2",
      },
      {
        stationCode: "QN",
        stationName: "Ga Quy Nhon",
        arrivalTime: "10:15",
        departureTime: "10:20",
        stopDuration: 5,
        platform: "1",
      },
      {
        stationCode: "DNA",
        stationName: "Ga Đà Nẵng",
        arrivalTime: "14:30",
        departureTime: "14:40",
        stopDuration: 10,
        platform: "3",
      },
      {
        stationCode: "HUE",
        stationName: "Ga Huế",
        arrivalTime: "17:20",
        departureTime: "17:25",
        stopDuration: 5,
        platform: "2",
      },
      {
        stationCode: "HAN",
        stationName: "Ga Hà Nội",
        arrivalTime: "05:30",
        departureTime: "",
        stopDuration: 0,
        platform: "1",
      },
    ],
    available: true,
    services: ["Điều hòa", "WiFi", "Ổ cắm điện", "Dịch vụ ăn uống"],
    ticketPrices: {
      hardSeat: 567000,
      softSeat: 630000,
      hardBerth: 882000,
      softBerth: 1166000,
    },
    foodService: {
      available: true,
      menuAvailable: true,
      orderingStops: ["SGN", "NT", "DNA", "HUE"],
    },
  },
  {
    trainId: "train-2",
    trainCode: "SE2",
    routeName: "Hà Nội - Sài Gòn",
    trainType: "SE",
    departureStation: {
      code: "HAN",
      name: "Ga Hà Nội",
    },
    arrivalStation: {
      code: "SGN",
      name: "Ga Sài Gòn",
    },
    departureTime: "2025-09-28T19:30:00+07:00",
    arrivalTime: "2025-09-30T06:00:00+07:00",
    duration: "34:30",
    distance: 1726,
    stops: [
      {
        stationCode: "HAN",
        stationName: "Ga Hà Nội",
        arrivalTime: "",
        departureTime: "19:30",
        stopDuration: 0,
        platform: "2",
      },
      {
        stationCode: "HUE",
        stationName: "Ga Huế",
        arrivalTime: "06:15",
        departureTime: "06:20",
        stopDuration: 5,
        platform: "1",
      },
      {
        stationCode: "DNA",
        stationName: "Ga Đà Nẵng",
        arrivalTime: "09:05",
        departureTime: "09:15",
        stopDuration: 10,
        platform: "2",
      },
      {
        stationCode: "QN",
        stationName: "Ga Quy Nhon",
        arrivalTime: "13:25",
        departureTime: "13:30",
        stopDuration: 5,
        platform: "1",
      },
      {
        stationCode: "NT",
        stationName: "Ga Nha Trang",
        arrivalTime: "17:10",
        departureTime: "17:20",
        stopDuration: 10,
        platform: "1",
      },
      {
        stationCode: "SGN",
        stationName: "Ga Sài Gòn",
        arrivalTime: "06:00",
        departureTime: "",
        stopDuration: 0,
        platform: "1",
      },
    ],
    available: true,
    services: ["Điều hòa", "WiFi", "Ổ cắm điện", "Dịch vụ ăn uống"],
    ticketPrices: {
      hardSeat: 567000,
      softSeat: 630000,
      hardBerth: 882000,
      softBerth: 1166000,
    },
    foodService: {
      available: true,
      menuAvailable: true,
      orderingStops: ["HAN", "HUE", "DNA", "NT"],
    },
  },
  {
    trainId: "train-3",
    trainCode: "SE3",
    routeName: "Sài Gòn - Đà Nẵng",
    trainType: "SE",
    departureStation: {
      code: "SGN",
      name: "Ga Sài Gòn",
    },
    arrivalStation: {
      code: "DNA",
      name: "Ga Đà Nẵng",
    },
    departureTime: "2025-09-28T13:00:00+07:00",
    arrivalTime: "2025-09-29T08:30:00+07:00",
    duration: "19:30",
    distance: 938,
    stops: [
      {
        stationCode: "SGN",
        stationName: "Ga Sài Gòn",
        arrivalTime: "",
        departureTime: "13:00",
        stopDuration: 0,
        platform: "2",
      },
      {
        stationCode: "NT",
        stationName: "Ga Nha Trang",
        arrivalTime: "00:25",
        departureTime: "00:35",
        stopDuration: 10,
        platform: "1",
      },
      {
        stationCode: "QN",
        stationName: "Ga Quy Nhon",
        arrivalTime: "04:15",
        departureTime: "04:20",
        stopDuration: 5,
        platform: "2",
      },
      {
        stationCode: "DNA",
        stationName: "Ga Đà Nẵng",
        arrivalTime: "08:30",
        departureTime: "",
        stopDuration: 0,
        platform: "1",
      },
    ],
    available: true,
    services: ["Điều hòa", "WiFi", "Ổ cắm điện", "Dịch vụ ăn uống"],
    ticketPrices: {
      hardSeat: 321000,
      softSeat: 357000,
      hardBerth: 499000,
      softBerth: 660000,
    },
    foodService: {
      available: true,
      menuAvailable: true,
      orderingStops: ["SGN", "NT"],
    },
  },
  {
    trainId: "train-4",
    trainCode: "TN1",
    routeName: "Hà Nội - Đà Nẵng",
    trainType: "TN",
    departureStation: {
      code: "HAN",
      name: "Ga Hà Nội",
    },
    arrivalStation: {
      code: "DNA",
      name: "Ga Đà Nẵng",
    },
    departureTime: "2025-09-28T14:30:00+07:00",
    arrivalTime: "2025-09-29T06:15:00+07:00",
    duration: "15:45",
    distance: 688,
    stops: [
      {
        stationCode: "HAN",
        stationName: "Ga Hà Nội",
        arrivalTime: "",
        departureTime: "14:30",
        stopDuration: 0,
        platform: "3",
      },
      {
        stationCode: "HUE",
        stationName: "Ga Huế",
        arrivalTime: "01:15",
        departureTime: "01:20",
        stopDuration: 5,
        platform: "2",
      },
      {
        stationCode: "DNA",
        stationName: "Ga Đà Nẵng",
        arrivalTime: "06:15",
        departureTime: "",
        stopDuration: 0,
        platform: "2",
      },
    ],
    available: true,
    services: ["Điều hòa", "Ổ cắm điện", "Dịch vụ ăn uống"],
    ticketPrices: {
      hardSeat: 245000,
      softSeat: 273000,
      hardBerth: 382000,
      softBerth: 505000,
    },
    foodService: {
      available: true,
      menuAvailable: false, // Limited menu
      orderingStops: ["HAN", "HUE"],
    },
  },
];

// Helper functions
export const getTrainByCode = (trainCode: string): DemoTrain | undefined => {
  return demoTrains.find(train => train.trainCode === trainCode);
};

export const getTrainsByRoute = (fromStation: string, toStation: string): DemoTrain[] => {
  return demoTrains.filter(train =>
    train.departureStation.code === fromStation &&
    train.arrivalStation.code === toStation
  );
};

export const getTrainsFromStation = (stationCode: string): DemoTrain[] => {
  return demoTrains.filter(train =>
    train.departureStation.code === stationCode ||
    train.stops.some(stop => stop.stationCode === stationCode)
  );
};

export const getTrainsByType = (trainType: 'SE' | 'TN' | 'SNT'): DemoTrain[] => {
  return demoTrains.filter(train => train.trainType === trainType);
};

export const getAvailableTrains = (): DemoTrain[] => {
  return demoTrains.filter(train => train.available);
};

export const getTrainsWithFoodService = (): DemoTrain[] => {
  return demoTrains.filter(train => train.foodService.available);
};

export const formatDuration = (duration: string): string => {
  const [hours, minutes] = duration.split(':');
  return `${hours}g ${minutes}p`;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const getStopInfo = (train: DemoTrain, stationCode: string): DemoTrainStop | undefined => {
  return train.stops.find(stop => stop.stationCode === stationCode);
};