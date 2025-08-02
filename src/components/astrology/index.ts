/**
 * Corp Astro UI Library - Astrology Components
 * 
 * Export all astrology-specific components
 */

export { ZodiacCard, type ZodiacCardProps } from './ZodiacCard';
export type { ZodiacSign, ZodiacElement } from './ZodiacCard';

export { HoroscopeCard, type HoroscopeCardProps } from './HoroscopeCard';
export type { HoroscopePeriod, HoroscopeCategory, HoroscopeData } from './HoroscopeCard';

export { CompatibilityChart, type CompatibilityChartProps } from './CompatibilityChart';
export type { CompatibilityAspect, CompatibilityScore, CompatibilityData } from './CompatibilityChart';

export { PlanetIndicator, type PlanetIndicatorProps } from './PlanetIndicator';
export type { Planet, PlanetData } from './PlanetIndicator';

export { LunarPhase, type LunarPhaseProps } from './LunarPhase';
export type { MoonPhase, LunarPhaseData } from './LunarPhase';

export { RetrogradeBadge, type RetrogradeBadgeProps } from './RetrogradeBadge';
export type { RetrogradeStatus, RetrogradeData } from './RetrogradeBadge';

export { AstrologyWheel, type AstrologyWheelProps } from './AstrologyWheel';
export type { HouseData, PlanetPosition, AspectData, AstrologyWheelData } from './AstrologyWheel';

export { StarMap, type StarMapProps } from './StarMap';
export type { StarData, ConstellationData, StarMapData } from './StarMap';

// North Indian Chart Components - Module 171-174
export { NorthIndianChart, type NorthIndianChartProps } from './NorthIndianChart';
export type { 
  VedicPlanet, 
  VedicRashi, 
  NorthIndianHouseNumber,
  NorthIndianChartData,
  NorthIndianHouseData,
  NorthIndianAspectData,
} from './NorthIndianChart';

export { NorthIndianChartLegend, type NorthIndianChartLegendProps } from './NorthIndianChartLegend';
export type {
  LegendSection,
  PlanetInfo,
  RashiInfo,
  HouseInfo,
} from './NorthIndianChartLegend';

export { NorthIndianChartDataProcessor, type NorthIndianChartDataProcessorProps } from './NorthIndianChartDataProcessor';
export type {
  RawAstrologicalData,
  PlanetaryDignity,
  AspectData as NorthIndianAspectDataExtended,
  ChartAnalysis,
} from './NorthIndianChartDataProcessor';
export {
  normalizeDegrees,
  getRashiFromDegree,
  getHouseFromDegree,
  calculateAngularDistance,
  calculatePlanetaryDignity,
  calculateAspects,
  generateChartAnalysis,
  RASHI_BOUNDARIES,
  EXALTATION_POSITIONS,
  DEBILITATION_POSITIONS,
  PLANET_RULERSHIP,
  ASPECT_ORBS,
} from './NorthIndianChartDataProcessor';

export { NorthIndianChartNavigator, type NorthIndianChartNavigatorProps } from './NorthIndianChartNavigator';
export type {
  ChartViewMode,
  ChartOverlay,
  NavigationDirection,
  TooltipData,
  ChartTransform,
  NavigationState,
} from './NorthIndianChartNavigator';

// North Indian Chart Example - Module 175
export { NorthIndianChartExample, type NorthIndianChartExampleProps } from './NorthIndianChartExample';
