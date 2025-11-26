// Service to handle Traccar API interactions
// Falls back to mock data if no server is configured

const STORAGE_KEY = 'traccar_config';

export const getTraccarConfig = () => {
  try {
    const config = localStorage.getItem(STORAGE_KEY);
    return config ? JSON.parse(config) : null;
  } catch (e) {
    return null;
  }
};

export const saveTraccarConfig = (config) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

// Mock data for demonstration
const MOCK_POSITIONS = [
  { deviceId: 1, lat: 42.3601, lon: -71.0589, address: '123 Main St, Boston, MA', speed: 0, lastUpdate: new Date().toISOString() }, // Downtown Boston
  { deviceId: 2, lat: 42.3736, lon: -71.1097, address: '456 Oak Ave, Cambridge, MA', speed: 12, lastUpdate: new Date().toISOString() }, // Cambridge
  { deviceId: 3, lat: 42.3876, lon: -71.0995, address: '789 Pine Rd, Somerville, MA', speed: 0, lastUpdate: new Date().toISOString() }, // Somerville
  { deviceId: 4, lat: 42.3370, lon: -71.2092, address: '321 Elm St, Newton, MA', speed: 45, lastUpdate: new Date().toISOString() }, // Newton
  { deviceId: 5, lat: 42.2529, lon: -71.0023, address: '654 Maple Ave, Quincy, MA', speed: 0, lastUpdate: new Date().toISOString() }, // Quincy
];

const MOCK_DEVICES = [
  { id: 1, name: 'Truck-01 (Ford F550)', status: 'online', category: 'truck' },
  { id: 2, name: 'CNT-20-104 (20-yard)', status: 'online', category: 'container' },
  { id: 3, name: 'CNT-15-089 (15-yard)', status: 'offline', category: 'container' },
  { id: 4, name: 'Truck-02 (Mack)', status: 'online', category: 'truck' },
  { id: 5, name: 'CNT-10-005 (10-yard)', status: 'online', category: 'container' },
];

export const fetchDevices = async () => {
  const config = getTraccarConfig();
  
  if (!config || !config.url) {
    // Return mock data if not configured
    return new Promise(resolve => setTimeout(() => resolve(MOCK_DEVICES), 500));
  }

  try {
    const auth = btoa(`${config.username}:${config.password}`);
    const response = await fetch(`${config.url}/api/devices`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    if (!response.ok) throw new Error('Failed to fetch devices');
    return await response.json();
  } catch (error) {
    console.error("Traccar API Error:", error);
    // Fallback to mock for demo stability even on error
    return MOCK_DEVICES;
  }
};

export const fetchPositions = async () => {
  const config = getTraccarConfig();

  if (!config || !config.url) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_POSITIONS), 500));
  }

  try {
    const auth = btoa(`${config.username}:${config.password}`);
    const response = await fetch(`${config.url}/api/positions`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    if (!response.ok) throw new Error('Failed to fetch positions');
    return await response.json();
  } catch (error) {
    console.error("Traccar API Error:", error);
    return MOCK_POSITIONS;
  }
};