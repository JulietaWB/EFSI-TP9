import { Cloud, Sun, CloudRain, CloudFog, CloudLightning, CloudDrizzle, SunSnow, ThermometerSnowflake } from 'lucide-react';

export const getWeatherIcon = (weatherStatus) => {
  const status = weatherStatus ? weatherStatus.toLowerCase() : '';

  if (status.includes('nieve')) {
    return SunSnow; // Changed from Snow to SunSnow
  } else if (status.includes('nubes') || status.includes('nublado')) {
    return Cloud;
  } else if (status.includes('sol' || status.includes('despejado'))) {
    return Sun;
  } else if (status.includes('lluvia') || status.includes('chubascos')) {
    return CloudRain;
  } else if (status.includes('niebla') || status.includes('neblina') || status.includes('bruma')) {
    return CloudFog;
  } else if (status.includes('tormenta')) {
    return CloudLightning;
  } else if (status.includes('llovizna')) {
    return CloudDrizzle;
  } else {
    return Sun; // Default icon
  }
};

export const getTemperatureUnitSymbol = (unit) => {
  return unit === 'metric' ? '°C' : '°F';
};
