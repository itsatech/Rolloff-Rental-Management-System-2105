import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import { fetchDevices, fetchPositions, getTraccarConfig } from '../../services/traccarService';

const { FiTruck, FiPackage, FiMapPin, FiRefreshCw, FiSettings, FiNavigation } = FiIcons;

// Fix for default Leaflet icons in build environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom component to fit bounds
const MapBoundsUpdater = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions.map(p => [p.lat, p.lon]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
};

const Tracking = () => {
  const [devices, setDevices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [devs, pos] = await Promise.all([fetchDevices(), fetchPositions()]);
      setDevices(devs);
      setPositions(pos);
    } catch (error) {
      console.error("Error loading tracking data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const config = getTraccarConfig();
    setIsConfigured(!!(config && config.url));
    loadData();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getDeviceDetails = (deviceId) => {
    return devices.find(d => d.id === deviceId) || { name: 'Unknown Device', category: 'unknown' };
  };

  const getIcon = (category) => {
    // Determine icon based on category (simplified)
    const isTruck = category === 'truck';
    
    // Create a custom DivIcon using Tailwind classes
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${isTruck ? '#3b82f6' : '#10b981'};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      ">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          ${isTruck 
            ? '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>' 
            : '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'
          }
        </svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GPS Tracking</h1>
          <p className="text-gray-600 mt-1 flex items-center">
            {isConfigured ? (
              <span className="flex items-center text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Connected to Traccar Server
              </span>
            ) : (
              <span className="flex items-center text-orange-600 text-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Simulation Mode (Configure Server in Settings)
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={loadData} disabled={loading}>
            <SafeIcon icon={FiRefreshCw} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Device List Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-80 flex-shrink-0 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Active Assets ({positions.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {positions.map(pos => {
              const device = getDeviceDetails(pos.deviceId);
              return (
                <div 
                  key={pos.deviceId}
                  onClick={() => setSelectedDevice(pos.deviceId)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedDevice === pos.deviceId 
                      ? 'bg-primary-50 border-primary-200' 
                      : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-gray-900">{device.name}</span>
                    <Badge variant={device.category === 'truck' ? 'info' : 'success'} size="xs">
                      {device.category}
                    </Badge>
                  </div>
                  <div className="flex items-start text-xs text-gray-500">
                    <SafeIcon icon={FiMapPin} className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{pos.address || `${pos.lat.toFixed(4)}, ${pos.lon.toFixed(4)}`}</span>
                  </div>
                  {pos.speed > 0 && (
                    <div className="mt-1 flex items-center text-xs text-primary-600 font-medium">
                      <SafeIcon icon={FiNavigation} className="h-3 w-3 mr-1" />
                      Moving at {pos.speed} km/h
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0"
        >
          <MapContainer 
            center={[42.3601, -71.0589]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBoundsUpdater positions={positions} />
            
            {positions.map(pos => {
              const device = getDeviceDetails(pos.deviceId);
              return (
                <Marker 
                  key={pos.deviceId} 
                  position={[pos.lat, pos.lon]}
                  icon={getIcon(device.category)}
                  eventHandlers={{
                    click: () => setSelectedDevice(pos.deviceId)
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-gray-900 mb-1">{device.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{pos.address}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Speed: {pos.speed} km/h</span>
                        <Badge variant={device.status === 'online' ? 'success' : 'default'} size="xs">
                          {device.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Last updated: {new Date(pos.lastUpdate).toLocaleTimeString()}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Tracking;