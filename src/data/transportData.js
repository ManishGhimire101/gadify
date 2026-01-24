// Nepal-specific transport data with confidence-based tracking
export const transportData = {
  vehicles: [
    {
      id: 'BUS001',
      type: 'Bus',
      route: 'Ratnapark - Bhaktapur',
      vehicleNumber: 'Ba 2 Kha 1234',
      currentLocation: { lat: 27.7094, lng: 85.3206 },
      nextStop: 'Kamaladi',
      eta: '5-8 min',
      confidence: 85,
      status: 'MOVING',
      lastUpdated: '2 min ago',
      dataSources: ['gps', 'crowd', 'network'],
      capacity: 35,
      currentPassengers: 28,
      route_stops: [
        { name: 'Ratnapark', time: '09:00 AM', status: 'completed', landmark: 'Bus Park' },
        { name: 'Kamaladi', time: '09:08 AM', status: 'upcoming', landmark: 'Kamaladi Chowk' },
        { name: 'Tinkune', time: '09:15 AM', status: 'pending', landmark: 'Tinkune Chowk' },
        { name: 'Airport', time: '09:20 AM', status: 'pending', landmark: 'TIA' },
        { name: 'Koteshwor', time: '09:30 AM', status: 'pending', landmark: 'Koteshwor Chowk' },
        { name: 'Bhaktapur', time: '09:45 AM', status: 'pending', landmark: 'Bhaktapur Durbar' }
      ],
      fare: 'रू 30-45',
      crowdLevel: 'Moderate'
    },
    {
      id: 'MICRO001',
      type: 'Micro',
      route: 'Lagankhel - Sundhara',
      vehicleNumber: 'Ba 3 Pa 5678',
      currentLocation: { lat: 27.6661, lng: 85.3242 },
      nextStop: 'Jawalakhel',
      eta: '3-5 min',
      confidence: 72,
      status: 'MOVING',
      lastUpdated: '4 min ago',
      dataSources: ['crowd', 'landmark'],
      capacity: 14,
      currentPassengers: 11,
      route_stops: [
        { name: 'Lagankhel', time: '09:05 AM', status: 'completed', landmark: 'Bus Stand' },
        { name: 'Jawalakhel', time: '09:12 AM', status: 'upcoming', landmark: 'Zoo Area' },
        { name: 'Kupondole', time: '09:18 AM', status: 'pending', landmark: 'Kupondole Height' },
        { name: 'Bagbazar', time: '09:25 AM', status: 'pending', landmark: 'Bagbazar Chowk' },
        { name: 'Sundhara', time: '09:30 AM', status: 'pending', landmark: 'Sundhara' }
      ],
      fare: 'रू 25',
      crowdLevel: 'High'
    },
    {
      id: 'TEMPO001',
      type: 'Tempo',
      route: 'Koteshwor - Kalanki',
      vehicleNumber: 'Ba 1 Cha 9012',
      currentLocation: { lat: 27.6790, lng: 85.3465 },
      nextStop: 'Teku',
      eta: '10-15 min',
      confidence: 58,
      status: 'STOPPED',
      lastUpdated: '8 min ago',
      dataSources: ['crowd'],
      capacity: 10,
      currentPassengers: 8,
      route_stops: [
        { name: 'Koteshwor', time: '09:00 AM', status: 'completed', landmark: 'Mandir' },
        { name: 'Baneshwor', time: '09:10 AM', status: 'completed', landmark: 'Chowk' },
        { name: 'Teku', time: '09:20 AM', status: 'upcoming', landmark: 'Teku Hospital' },
        { name: 'Kalimati', time: '09:30 AM', status: 'pending', landmark: 'Tarkari Bazar' },
        { name: 'Kalanki', time: '09:40 AM', status: 'pending', landmark: 'Kalanki Chowk' }
      ],
      fare: 'रू 20-30',
      crowdLevel: 'Low'
    },
    {
      id: 'MAGIC001',
      type: 'Magic',
      route: 'Balaju - Maharajgunj',
      vehicleNumber: 'Ba 2 Ja 3456',
      currentLocation: { lat: 27.7350, lng: 85.3050 },
      nextStop: 'Sorhakhutte',
      eta: '2-4 min',
      confidence: 90,
      status: 'MOVING',
      lastUpdated: '1 min ago',
      dataSources: ['gps', 'crowd', 'network', 'landmark'],
      capacity: 8,
      currentPassengers: 6,
      route_stops: [
        { name: 'Balaju', time: '09:05 AM', status: 'completed', landmark: 'Balaju Chowk' },
        { name: 'Sorhakhutte', time: '09:12 AM', status: 'upcoming', landmark: 'Chowk' },
        { name: 'Bansbari', time: '09:18 AM', status: 'pending', landmark: 'Chowk' },
        { name: 'Maharajgunj', time: '09:25 AM', status: 'pending', landmark: 'Medical Campus' }
      ],
      fare: 'रू 15-20',
      crowdLevel: 'Moderate'
    },
    {
      id: 'JEEP001',
      type: 'Jeep',
      route: 'Chabahil - Budhanilkantha',
      vehicleNumber: 'Ba 3 Kha 7890',
      currentLocation: { lat: 27.7250, lng: 85.3470 },
      nextStop: 'Gongabu',
      eta: '8-12 min',
      confidence: 65,
      status: 'DELAYED',
      lastUpdated: '12 min ago',
      dataSources: ['crowd'],
      capacity: 12,
      currentPassengers: 10,
      route_stops: [
        { name: 'Chabahil', time: '09:00 AM', status: 'completed', landmark: 'Stupa' },
        { name: 'Gongabu', time: '09:15 AM', status: 'upcoming', landmark: 'Bus Park' },
        { name: 'Tokha', time: '09:30 AM', status: 'pending', landmark: 'Tokha Area' },
        { name: 'Budhanilkantha', time: '09:50 AM', status: 'pending', landmark: 'Temple' }
      ],
      fare: 'रू 35-50',
      crowdLevel: 'High'
    },
    {
      id: 'BUS002',
      type: 'Bus',
      route: 'Kalanki - Balaju',
      vehicleNumber: 'Ba 1 Kha 4567',
      currentLocation: { lat: 27.6936, lng: 85.2811 },
      nextStop: 'Kalimati',
      eta: '4-6 min',
      confidence: 78,
      status: 'MOVING',
      lastUpdated: '3 min ago',
      dataSources: ['gps', 'crowd'],
      capacity: 40,
      currentPassengers: 32,
      route_stops: [
        { name: 'Kalanki', time: '09:10 AM', status: 'completed', landmark: 'Chowk' },
        { name: 'Kalimati', time: '09:18 AM', status: 'upcoming', landmark: 'Fruit Market' },
        { name: 'Sorhakhutte', time: '09:28 AM', status: 'pending', landmark: 'Chowk' },
        { name: 'Balaju', time: '09:35 AM', status: 'pending', landmark: 'Industrial Area' }
      ],
      fare: 'रू 25-35',
      crowdLevel: 'Moderate'
    }
  ],
  landmarks: [
    { name: 'Ratnapark', location: { lat: 27.7094, lng: 85.3133 } },
    { name: 'Kamaladi', location: { lat: 27.7094, lng: 85.3206 } },
    { name: 'Tinkune', location: { lat: 27.6954, lng: 85.3468 } },
    { name: 'Koteshwor', location: { lat: 27.6790, lng: 85.3465 } },
    { name: 'Lagankhel', location: { lat: 27.6661, lng: 85.3242 } },
    { name: 'Sundhara', location: { lat: 27.7058, lng: 85.3148 } }
  ]
};

export const systemStats = {
  activeVehicles: 847,
  trackedRoutes: 125,
  crowdReports: 1240,
  offlineMode: false,
  lastSync: new Date()
};
